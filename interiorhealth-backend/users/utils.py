import jwt
from datetime import datetime, timedelta
from django.conf import settings

def generate_email_verification_token(user):
    payload = {
        'user_id': user.id,
        'email': user.email,
        'exp': datetime.utcnow() + timedelta(hours=24),
        'type': 'email-verification'
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')

def decode_email_verification_token(token):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        if payload.get('type') != 'email-verification':
            raise jwt.InvalidTokenError("Invalid token type.")
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None
