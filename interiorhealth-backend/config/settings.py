from decouple import config
from pathlib import Path
from datetime import timedelta
import dj_database_url
from dotenv import load_dotenv
from corsheaders.defaults import default_headers
import os

BASE_DIR = Path(__file__).resolve().parent.parent

# Security
SECRET_KEY = config('SECRET_KEY')
DEBUG = config('DEBUG', cast=bool)
ALLOWED_HOSTS = ['*']  # In production, update this to your actual domain

# Installed apps
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # 3rd-party apps
    "rest_framework",
    "rest_framework_simplejwt",
    "rest_framework_simplejwt.token_blacklist",
    "corsheaders",
    "drf_spectacular",

    # Your apps
    "users",
    "drugs",
    "patients",
    "orders",
    "payments",
]

# Custom user model
AUTH_USER_MODEL = 'users.User'

# Middleware
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",  # ✅ First
    "django.middleware.common.CommonMiddleware",  # ✅ Second
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [os.path.join(BASE_DIR, "templates")],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('POSTGRES_DB'),
        'USER': config('POSTGRES_USER'),
        'PASSWORD': config('POSTGRES_PASSWORD'),
        'HOST': config('POSTGRES_HOST', default='db'),
        'PORT': config('POSTGRES_PORT', default='5432'),
    }
}

# REST framework
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}

# JWT settings
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=30),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
    "AUTH_HEADER_TYPES": ("Bearer",),
    "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
}

AUTHENTICATION_BACKENDS = [
    'users.backends.EmailBackend',
    'django.contrib.auth.backends.ModelBackend',
]

# ✅ CORRECT CORS CONFIG FOR NEXT.JS + CODESPACES
CORS_ALLOWED_ORIGINS = [
    "https://psychic-journey-x55p7j9qq75vh645x-3000.app.github.dev",  # Frontend (Next.js)
    "https://psychic-journey-x55p7j9qq75vh645x-8000.app.github.dev",  # Backend (optional)
]
CORS_ALLOW_CREDENTIALS = True

CORS_ALLOW_HEADERS = list(default_headers) + [
    'authorization',
    'content-type',
    'access-control-allow-origin',
]

CORS_EXPOSE_HEADERS = [
    'Content-Type',
    'X-CSRFToken',
    'Authorization',
]

CORS_ALLOW_METHODS = [
    "DELETE",
    "GET",
    "OPTIONS",
    "PATCH",
    "POST",
    "PUT",
]

# 🔐 CSRF trusted origin for frontend (esp. if doing forms later)
CSRF_TRUSTED_ORIGINS = [
    "https://psychic-journey-x55p7j9qq75vh645x-3000.app.github.dev",
]

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# i18n
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# Static files
STATIC_URL = "static/"
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

#Flutterwave config
FLW_CLIENT_ID = config("FLW_CLIENT_ID")
FLW_CLIENT_SECRET = config("FLW_CLIENT_SECRET")
FLW_ENCRYPTION_KEY = config("FLW_ENCRYPTION_KEY")
FLW_BASE_URL = config("FLW_BASE_URL")

# Email
FRONTEND_BASE_URL = config('FRONTEND_BASE_URL', default='http://localhost:3000')
DEFAULT_FROM_EMAIL = config('DEFAULT_FROM_EMAIL', default='noreply@interiorhealth.com')

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = config('EMAIL_HOST')
EMAIL_PORT = config('EMAIL_PORT', cast=int, default=587)
EMAIL_HOST_USER = config('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD')
EMAIL_USE_TLS = True

# API docs
SPECTACULAR_SETTINGS = {
    'TITLE': 'Interior Health API',
    'DESCRIPTION': 'API documentation for the Interior Health system.',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': False,
}

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'login_file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': os.path.join(BASE_DIR, 'login_debug.log'),
            'formatter': 'verbose',
        },
    },
    'loggers': {
        'login': {
            'handlers': ['login_file'],
            'level': 'DEBUG',
            'propagate': False,
        },
        'django.request': {
            'handlers': ['login_file'],
            'level': 'DEBUG',
            'propagate': True,
        },
    },
}

load_dotenv()

DATABASES = {
    'default': dj_database_url.parse(os.getenv("DATABASE_URL"))
}
