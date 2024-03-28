from rest_framework import serializers
from .models import Stock

class StocksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = ['id', 'Symbol', 'Company_Name', 'Country', 'Sector', 'Industry']
        

