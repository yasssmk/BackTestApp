from django.shortcuts import render
from rest_framework.views import APIView
from .backtest_logique.backtesting import BackTest, calculate_and_print_statistics
from .backtest_logique.data import StockData
from .serializers import StocksSerializer
from .models import Stock
from django.db.models import Q
from rest_framework.response import Response
from rest_framework import status
from django.core.cache import cache


class Test(APIView):
    def post(self, request):
        symbol = request.data.get('Symbol')

        cached_data = cache.get(symbol)
        
        if cached_data:
            return Response(cached_data, status=status.HTTP_200_OK)
        
        test = BackTest(symbol)
        stock_info = test.get_stock_info()
        df_test = test.back_test()
        df_return = test.calculate_money_invested()
        test_stat = calculate_and_print_statistics(df_return)

        cache.set(symbol, {
            "Stock info": stock_info, 
            "Investissement data": df_test,
            "Cash data": df_return, 
            "Stats": test_stat
            }, 60 * 60 * 48) #48H

        response = Response({
            "Stock info": stock_info, 
            "Investissement data":df_test,
            "Cash data": df_return, 
            "Stats": test_stat}
            , status=status.HTTP_200_OK)
        
        response["Cache-Control"] = "public, max-age=172800"
        return response 
        # return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        # stock.calculate_money_invested()

class Recomendation(APIView):
    def get(self, request):

        cached_data = cache.get('stock_list')
        if cached_data:
            return Response(cached_data, status=status.HTTP_200_OK)

        stocks = Stock.objects.all()
        serializer = StocksSerializer(stocks, many=True)
        data = serializer.data

        cache.set('stock_list', data, 60 * 60 * 24 * 7) #7 days

        response =  Response(data, status=status.HTTP_200_OK)
        response["Cache-Control"] = "public, max-age=604800"
        return response 

    #     search_query = request.data.get('search_query', '')

    #     matching_stocks = Stock.objects.filter(
    #         Q(Symbol__istartswith=search_query.upper()) | Q(Company_Name__istartswith=search_query.capitalize())
    #     )

    #     if matching_stocks:
    #         serializer = StocksSerializer (matching_stocks, many=True)

    #         return Response(serializer.data,status=status.HTTP_200_OK)
    #     else:
    #         return Response("",status=status.HTTP_204_NO_CONTENT)
        # return Response(status=status.HTTP_401_UNAUTHORIZED)