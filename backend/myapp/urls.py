from django.contrib import admin
from rest_framework import routers
from django.urls import path, include
from .views import Register, api_home, UserView,Logout, GoogleLogin
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("login", TokenObtainPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("register", Register.as_view(), name="register"),
    path("user", UserView.as_view(), name="userview"),
    path("logout", Logout.as_view(), name='logout'),
    path("", api_home),
    path('google-login/', GoogleLogin.as_view(), name='google_login')
]
