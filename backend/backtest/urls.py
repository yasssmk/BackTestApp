from django.urls import path
from .views import Recomendation

urlpatterns = [
    # path("backtest", Test.as_view(), name='backtest'),
    path("reco", Recomendation.as_view(), name='recomendation'),
]