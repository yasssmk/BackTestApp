from django.urls import path
from .views import Test, Recomendation

urlpatterns = [
    path("rundashboard", Test.as_view(), name='rundashboard'),
    path("reco", Recomendation.as_view(), name='recomendation'),
]