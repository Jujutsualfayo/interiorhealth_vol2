from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.exceptions import AuthenticationFailed

from .models import User
from users.email import send_verification_email


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

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'first_name', 'last_name', 'role', 'is_verified']
        read_only_fields = ['id', 'email', 'role', 'is_verified']

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        user = authenticate(
            request=self.context.get("request"),
            email=email,
            password=password
        )

        if not user:
            raise AuthenticationFailed("Invalid credentials or email not verified.", code="authentication_failed")

        if not user.is_active:
            raise AuthenticationFailed("Please verify your email before logging in.", code="email_not_verified")

        refresh = self.get_token(user)

        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "email": user.email,
            "role": user.role,
        }
    
