from rest_framework import serializers
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.password_validation import validate_password
from users.email import send_verification_email  
from rest_framework_simplejwt.exceptions import AuthenticationFailed

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password', 'role']
        read_only_fields = ('role',)

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data.get('username', validated_data['email']),
            email=validated_data.get('email', ''),
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            role=validated_data.get('role', 'patient')
        )
        user.is_active = False  # Deactivate user until email is verified
        user.save()

        request = self.context.get('request')  # Needed to build absolute URL
        if request:
            send_verification_email(user, request)  # ✅ Sends email verification link

        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['role'] = user.role
        return token

    def validate(self, attrs):
        # Use email as the login username
        attrs['username'] = attrs.get('email')
        data = super().validate(attrs)

        if not self.user.is_active:
            raise AuthenticationFailed("Please verify your email before logging in.", code="email_not_verified")

        return data

