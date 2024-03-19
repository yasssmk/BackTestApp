from django.contrib import admin
from rest_framework import routers
from django.urls import path, include
from .views import Register, api_home, Login,UserView, Logout
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("register", Register.as_view()),
    path("login", Login.as_view()),
    path("user", UserView.as_view()),
    path("logout", Logout.as_view()),
    path("", api_home)
]
