from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import UserSerializer, MyTokenObtainPairSerializer
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from .models import CustomUser, CustomUserManager
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import AccessToken


# Create your views here.

def api_home(request, *args, **kwargs):
    return Response({"message": "Hello Yacine"}, status=status.HTTP_200_OK)


class Register(APIView):
    def post(self, request):
        serializer = UserSerializer(data = request.data)
        if serializer.is_valid():
            email = request.data.get('email')
            password = request.data.get('password')

            if CustomUser.objects.filter(email=email).exists():
                return Response({'error': 'User already exists'}, status=status.HTTP_400_BAD_REQUEST)
        
            user = CustomUser.objects.create_user(email=email, password=password)
            serialized_user = UserSerializer(user)
            return Response(serialized_user.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        token = AccessToken.for_user(user)
        response_data ={
            'id': user.id,
            'email': user.email,
            'token': str(token)
        }
        return Response(response_data, status=status.HTTP_200_OK)


        
class Logout(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get('refresh_token')
            if not refresh_token:
                return Response({"error": "Refresh token is required."}, status=status.HTTP_400_BAD_REQUEST)
            
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response({"success": "User logged out successfully."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)