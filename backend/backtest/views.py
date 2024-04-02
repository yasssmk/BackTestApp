from django.shortcuts import render
from rest_framework.views import APIView
from .backtest_logique.backtesting import BackTest, calculate_and_print_statistics
from .backtest_logique.data import StockData
from .serializers import StocksSerializer
from .models import Stock
from django.db.models import Q
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
class Test(APIView):
    def post(self, request):
        # symbol = request.data.get('Symbol')
        # test = BackTest(symbol)
        # df_test = test.back_test()
        # df_return = test.calculate_money_invested()
        # test_stat = calculate_and_print_statistics(df_return)

        # return Response([df_test, df_return, test_stat], status=status.HTTP_200_OK)
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        # stock.calculate_money_invested()

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
        # return Response(status=status.HTTP_401_UNAUTHORIZED)