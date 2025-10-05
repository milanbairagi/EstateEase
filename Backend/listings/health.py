from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class HealthCheckView(APIView):
    
    permission_classes = []  # Allow anyone

    def get(self, request):
        return Response({"status": "ok"}, status=status.HTTP_200_OK)