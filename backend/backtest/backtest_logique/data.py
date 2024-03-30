import os
import sys
import django
import yfinance as yf
import pandas as pd
from datetime import datetime

# Add the path to your Django project directory
sys.path.append(os.path.relpath('C:\\Users\\ysamk\\Desktop\\coding\\BacktestApp\\backend'))

# Set up Django's environment
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from backtest.models import Stock

DATA_START_DATE = '2015-01-05'
DATA_END_DATE = datetime.now()

class StockData:
    def __init__(self, symbol):
        self.symbol = symbol

    
    def get_stock_info(self):
        try:
            stock = Stock.objects.get(Symbol=self.symbol)
            return {
                'id': stock.id,
                'Company_Name': stock.Company_Name,
                'Symbol': stock.Symbol,
                'Country': stock.Country,
                'Sector': stock.Sector,
                'Industry': stock.Industry
            }
        except Stock.DoesNotExist:
            return None

    def get_data(self):
        stock_data = yf.download(self.symbol, start=DATA_START_DATE, end=DATA_END_DATE, interval='1wk')

        # Save the data to a CSV file
        # csv_file_name = f"{symbol}.csv"
        # stock_data.to_csv(csv_file_name)

        return stock_data

    def get_monthly_data(self):
        stock_data = yf.download(self.symbol, start=DATA_START_DATE, end=DATA_END_DATE, interval='1mo')

        # Save the data to a CSV file
        # csv_file_name = f"{symbol}_monthly.csv"
        # stock_data.to_csv(csv_file_name)

        return stock_data

    def load_data_from_csv(self, csv_file_name):
        stock_data = pd.read_csv(csv_file_name, index_col='Date', parse_dates=True)

        return stock_data

# stock = StockData('CRM')
# stock_info = stock.get_monthly_data()

# print(stock_info)