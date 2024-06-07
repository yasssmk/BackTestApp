from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.response import Response
from .models import CustomUser
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import AccessToken
from drf_yasg.utils import swagger_auto_schema
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.models import SocialApp
import requests

# Create your views here.

def api_home(request, *args, **kwargs):
    return Response({"message": "Hello Yacine"}, status=status.HTTP_200_OK)


class Register(APIView):

    @swagger_auto_schema(tags=['Auth'])
    def post(self, request):

        email = request.data.get('email')
        password = request.data.get('password')
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')

        if CustomUser.objects.filter(email=email).exists():
            return Response({'error': 'User already exists'}, status=status.HTTP_409_CONFLICT)
        
        serializer = UserSerializer(data = request.data)
        print(request.data)

        if serializer.is_valid():
            user = CustomUser.objects.create_user(email=email, password=password, last_name=last_name, first_name=first_name)
            serialized_user = UserSerializer(user)
            return Response(serialized_user.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(tags=['Auth'])
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

    @swagger_auto_schema(tags=['Auth'])
    def post(self, request):
        try:
            refresh_token = request.data.get('refresh_token')

            if not refresh_token:
                return Response({"error": "Refresh token is required."}, status=status.HTTP_400_BAD_REQUEST)
            
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response({"success": "User logged out successfully."}, status=status.HTTP_200_OK)
        except Exception as e:
            print(request.data)
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        


class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter

    def post(self, request, *args, **kwargs):

        code = request.data.get('code')
        
        if not code:
            return Response({'detail': 'Code is missing'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Retrieve the Google social app
            app = SocialApp.objects.get(provider="google")

            # Exchange the authorization code for an access token
            token_url = "https://oauth2.googleapis.com/token"
            token_data = {
                "code": code,
                "client_id": app.client_id,
                "client_secret": app.secret,
                "redirect_uri": "http://localhost:3000",  
                "grant_type": "authorization_code",
            }
            token_response = requests.post(token_url, data=token_data)
            token_response_data = token_response.json()
            access_token = token_response_data.get('access_token')
            print(token_response_data)

            if not access_token:
                return Response({'detail': 'Failed to obtain access token from Google'}, status=status.HTTP_400_BAD_REQUEST)

            # Retrieve user info from Google
            user_info_url = "https://www.googleapis.com/oauth2/v2/userinfo"
            user_info_response = requests.get(user_info_url, headers={"Authorization": f"Bearer {access_token}"})
            user_info = user_info_response.json()
            print(user_info)

            # Extract user details
            email = user_info['email']
            first_name = user_info['given_name']
            last_name = user_info['family_name']
            password=user_info['id']+user_info['email']



            if not email:
                return Response({'detail': 'Failed to obtain user info from Google'}, status=status.HTTP_400_BAD_REQUEST)

            # Create or get the user from your database
            user_data = {
                            'email': email,
                            'password': password,
                            'first_name': first_name,
                            'last_name': last_name,
                            
                        }

            if not CustomUser.objects.filter(email=email).exists():
                serializer = UserSerializer(data=user_data)
                if serializer.is_valid():
                    user = CustomUser.objects.create_user(email=email, password=password, last_name=last_name, first_name=first_name)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                user = CustomUser.objects.get(email=email)

            # Generate JWT token using MyTokenObtainPairSerializer
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_200_OK)

        except SocialApp.DoesNotExist:
            return Response({'detail': 'Google SocialApp configuration is missing.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)