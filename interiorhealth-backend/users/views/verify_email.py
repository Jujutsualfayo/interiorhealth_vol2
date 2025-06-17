from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from users.utils import decode_email_verification_token
import jwt  

User = get_user_model()

class VerifyEmailView(APIView):
    def get(self, request):
        token = request.GET.get('token')

        if not token:
            return Response({'detail': 'Token is missing.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            payload = decode_email_verification_token(token)
        except jwt.ExpiredSignatureError:
            return Response({'detail': 'Token has expired.'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.DecodeError:
            return Response({'detail': 'Invalid token.'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': f'Unexpected error: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        if not payload:
            return Response({'detail': 'Invalid or expired token.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(id=payload['user_id'], email=payload['email'])
        except User.DoesNotExist:
            return Response({'detail': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

        if user.is_active:
            return Response({'detail': 'Account already verified.'}, status=status.HTTP_400_BAD_REQUEST)

        user.is_active = True
        user.save()

        return Response({'detail': 'Email verified successfully.'}, status=status.HTTP_200_OK)
