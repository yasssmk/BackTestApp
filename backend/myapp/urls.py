from django.contrib import admin
from rest_framework import routers
from django.urls import path, include
from .views import Register, api_home, UserView,Logout
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("login", TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("register", Register.as_view()),
    path("user", UserView.as_view()),
    path("logout", Logout.as_view()),
    path("", api_home)
]
