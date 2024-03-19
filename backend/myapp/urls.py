from django.contrib import admin
from rest_framework import routers
from django.urls import path, include
from .views import Register, api_home, Login,Test

urlpatterns = [
    path("register", Register.as_view()),
    path("login", Login.as_view()),
    path("test", Test.as_view()),
    path("", api_home)
]
