from django.urls import path
from  views import Test

urlpatterns = [
    path("backtest", Test.as_view(), name='backtest'),
]