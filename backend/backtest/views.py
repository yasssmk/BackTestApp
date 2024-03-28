from django.shortcuts import render
from rest_framework.views import APIView
from .backtest_logique.backtesting import BackTest
from .serializers import StocksSerializer
from .models import Stock
from django.db.models import Q
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
# class Test(APIView):
#     def test(symbol):
#         result = BackTest.calculate_money_invested()

class Recomendation(APIView):
    def post(self, request):

        search_query = request.data.get('search_query', '')

        matching_stocks = Stock.objects.filter(
            Q(Symbol__icontains=search_query.upper()) | Q(Company_Name__icontains=search_query.capitalize())
        )

        if matching_stocks:
            serializer = StocksSerializer (matching_stocks, many=True)

            return Response(serializer.data,status=status.HTTP_200_OK)
        else:
            return Response("",status=status.HTTP_303_SEE_OTHER)