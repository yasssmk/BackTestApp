from django.shortcuts import render
from rest_framework.views import APIView
from .backtest_logique.backtesting import BackTest

# Create your views here.
class Test(APIView):
    def test(symbol):
        result = BackTest.calculate_money_invested()