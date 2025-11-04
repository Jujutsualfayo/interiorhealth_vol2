from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status

def custom_exception_handler(exc, context):
    # Call REST framework's default exception handler first
    response = exception_handler(exc, context)

    if response is not None:
        # If DRF provided a structured error (field errors), preserve it so clients
        # can inspect field-level errors. Only normalize when a 'detail' message
        # exists (non-field error). Always include status_code alongside.
        if isinstance(response.data, dict) and 'detail' not in response.data:
            # Attach status_code but keep field errors intact
            response.data['status_code'] = response.status_code
            return response

        # Fallback: normalize non-field errors to a simple structure
        response.data = {
            'error': response.data.get('detail', 'An error occurred.'),
            'status_code': response.status_code
        }
        return response

    # Handle non-DRF exceptions (e.g., Django, Python errors)
    return Response({
        'error': str(exc),
        'status_code': status.HTTP_500_INTERNAL_SERVER_ERROR
    }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
