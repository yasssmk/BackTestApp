from django.shortcuts import render
from rest_framework import APIView
from .serializers import UserSerializer
from rest_framework.response import Response

# Create your views here.
class Register(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
