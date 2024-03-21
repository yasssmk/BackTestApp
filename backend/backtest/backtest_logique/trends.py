from data import StockData
from indicators import Indicators
from datetime import date
import pandas as pd

class Trends():

    def __init__(self):
        self.ind = Indicators()

    
    def add_trend_period(self, trend_periods, stock_data, trend_type, start_date, end_date):
        highest_price = stock_data['High'][start_date:end_date].max()
        highest_macd = stock_data['MACD'][start_date:end_date].max()
        highest_histogram = stock_data['MACD_Histogram'][start_date:end_date].max()
        lowest_price = stock_data['Low'][start_date:end_date].min()
        lowest_macd = stock_data['MACD'][start_date:end_date].min()
        lowest_histogram = stock_data['MACD_Histogram'][start_date:end_date].min()

        trend_periods.append({
            'Start Date': start_date,
            'End Date': end_date,
            'Trend Type': trend_type,
            'Highest Price': highest_price,
            'Highest MACD': highest_macd,
            'Highest Histogram': highest_histogram,
            'Lowest Price': lowest_price,
            'Lowest MACD': lowest_macd,
            'Lowest Histogram': lowest_histogram
        })
    
    def create_macd_trend_periods(self, stock_data):

        # self.ind.calculate_moving_averages(stock_data=stock_data)
        self.ind.calculate_macd(stock_data=stock_data, slow=26, fast=3, signal=7)

        trend_periods = []
        in_trend = False
        trend_type = None
        start_date = None
        end_date = None
        last_processed_date = None  

        for i in range(1, len(stock_data)):

            if (
                stock_data['Signal'][i] > 0
                and stock_data['MACD'][i] > stock_data['Signal'][i]
                and stock_data['MACD'][i - 1] <= stock_data['Signal'][i - 1] or stock_data['MACD'][i] > stock_data['Signal'][i] and stock_data['Signal'][i] > 0 and stock_data['Signal'][i-1] < 0
            ):
                if in_trend:
                    end_date = stock_data.index[i]
                    self.add_trend_period(trend_periods, stock_data, trend_type, start_date, end_date)
                start_date = stock_data.index[i]
                trend_type = 'MACD Bullish'
                in_trend = True
            elif (
                stock_data['Signal'][i] > 0
                and stock_data['MACD'][i] < stock_data['Signal'][i]
                and stock_data['MACD'][i - 1] >= stock_data['Signal'][i - 1]
            ):
                if in_trend:
                    end_date = stock_data.index[i]
                    self.add_trend_period(trend_periods, stock_data, trend_type, start_date, end_date)
                start_date = stock_data.index[i]
                trend_type = 'MACD Bullish breath'
                in_trend = True
            elif (
                stock_data['Signal'][i] < 0
                and stock_data['MACD'][i] < stock_data['Signal'][i]
                and stock_data['MACD'][i - 1] >= stock_data['Signal'][i - 1] or stock_data['MACD'][i] < stock_data['Signal'][i] and stock_data['Signal'][i] < 0 and stock_data['Signal'][i-1] > 0
            ):
                if in_trend:
                    end_date = stock_data.index[i]
                    self.add_trend_period(trend_periods, stock_data, trend_type, start_date, end_date)
                start_date = stock_data.index[i]
                trend_type = 'MACD Bearish'
                in_trend = True
            elif (
                stock_data['Signal'][i] < 0
                and stock_data['MACD'][i] > stock_data['Signal'][i]
                and stock_data['MACD'][i - 1] <= stock_data['Signal'][i - 1]
            ):
                if in_trend:
                    end_date = stock_data.index[i]
                    self.add_trend_period(trend_periods, stock_data, trend_type, start_date, end_date)
                start_date = stock_data.index[i]
                trend_type = 'MACD Bearish breath'
                in_trend = True


            # Check if i is the last index and append the current trend with the end date as today's date
            if i == len(stock_data) - 1:
                end_date = date.today()
                self.add_trend_period(trend_periods, stock_data, trend_type, start_date, end_date)

            # Update last_processed_date
            last_processed_date = stock_data.index[i]

        return trend_periods
    
    def add_lt_trend_period(self, trend_periods, stock_data, trend_type, start_date, end_date):
        self.ind.calculate_macd(stock_data, 26, 12, 9)
        highest_price = round(stock_data['High'][start_date:end_date].max(),2)
        lowest_price = round(stock_data['Low'][start_date:end_date].min(),2)
        highest_macd = round(stock_data['MACD'][start_date:end_date].max(),2)
        lowest_macd = round(stock_data['MACD'][start_date:end_date].min(),2)
        trend_periods.append({
            'Start Date': start_date.strftime('%Y-%m-%d'),
            'End Date': end_date.strftime('%Y-%m-%d'),
            'Trend Type': trend_type,
            'Highest Price': highest_price,
            'Highest MACD': highest_macd,
            'Lowest Price': lowest_price,
            'Lowest MACD': lowest_macd
        })
    
    def create_lt_trend_periods(self, stock_data):

        trend_periods_lt = []
        trend_type = None
        start_date = None
        end_date = None

        # self.ind.calculate_moving_averages(stock_data)
        self.ind.calculate_macd(stock_data, 26, 12,9)
        last_processed_date = None


        # Create trend periods
        for i in range(1, len(stock_data)):
            if i == 1:
                start_date = stock_data.index[i]

                if stock_data['MACD'][i] > stock_data['Signal'][i] > 0:
                    trend_type = 'Bullish'
                elif stock_data['MACD'][i] < stock_data['Signal'][i] and stock_data['MACD'][i] > 0:
                    trend_type = 'Bullish breath'
                elif stock_data['MACD'][i] < stock_data['Signal'][i] < 0:
                    trend_type = 'Bearish'
                elif stock_data['MACD'][i] > stock_data['Signal'][i] and stock_data['MACD'][i] < 0:
                    trend_type = 'Bearish breath'
                else:
                    trend_type = 'No trend'

            else:

                if stock_data['MACD'][i] > 0:

                    if stock_data['MACD'][i] > stock_data['MACD'][i-1] and stock_data['MACD'][i] > stock_data['Signal'][i]:
                        if trend_type == 'Bullish':
                            end_date = stock_data.index[i]
                        elif trend_type != 'Bullish':
                            if end_date:
                                end_date = stock_data.index[i]
                                self.add_lt_trend_period(trend_periods_lt, stock_data, trend_type, start_date, end_date)
                            
                            start_date = stock_data.index[i]
                            trend_type = 'Bullish'

                    elif stock_data['MACD'][i] < stock_data['MACD'][i-1]:
                        if trend_type == 'Bullish breath':
                            end_date = stock_data.index[i]
                        elif trend_type != 'Bullish breath':
                            if end_date:
                                end_date = stock_data.index[i]
                                self.add_lt_trend_period(trend_periods_lt, stock_data, trend_type, start_date, end_date)

                            start_date = stock_data.index[i]
                            trend_type = 'Bullish breath'

                    elif stock_data['MACD'][i] < stock_data['Signal'][i]:
                        if trend_type == 'Bullish breath':
                            end_date = stock_data.index[i]
                        elif trend_type != 'Bullish breath':
                            if end_date:
                                end_date = stock_data.index[i]
                                self.add_lt_trend_period(trend_periods_lt, stock_data, trend_type, start_date, end_date)
                            start_date = stock_data.index[i]
                            trend_type = 'Bullish breath'

                elif stock_data['MACD'][i] < 0:

                    if stock_data['MACD'][i] < stock_data['Signal'][i]:
                        if trend_type == 'Bearish':
                            end_date = stock_data.index[i]
                        elif trend_type != 'Bearish':
                            if end_date:
                                end_date = stock_data.index[i]
                                self.add_lt_trend_period(trend_periods_lt, stock_data, trend_type, start_date, end_date)
                            start_date = stock_data.index[i]
                            trend_type = 'Bearish'

                    elif stock_data['MACD'][i] > stock_data['Signal'][i]:
                        if trend_type == 'Bearish breath':
                            end_date = stock_data.index[i]
                        elif trend_type != 'Bearish breath':
                            if end_date:
                                end_date = stock_data.index[i]
                                self.add_lt_trend_period(trend_periods_lt, stock_data, trend_type, start_date, end_date)
                            start_date = stock_data.index[i]
                            trend_type = 'Bearish breath'

                else:
                    if trend_type == 'No trend':
                        if end_date:
                            self.add_lt_trend_period(trend_periods_lt, stock_data, trend_type, start_date, end_date)


            # Check if this is the last data point
            if i == len(stock_data) - 1:
                end_date = date.today()
                if end_date != last_processed_date:
                    self.add_lt_trend_period(trend_periods_lt, stock_data, trend_type, start_date, end_date)


        return [period for period in trend_periods_lt]
    
    def get_trend_type_on_date(self, date, stock_data):
        target_date = pd.to_datetime(date)
        trend_periods = self.create_lt_trend_periods(stock_data)

        for period in trend_periods:
            start_date = pd.to_datetime(period['Start Date'])
            end_date = pd.to_datetime(period['End Date'])

            if start_date and end_date and start_date <= target_date <= end_date:
                return {
                    'Start Date': start_date,
                    'End Date': end_date,
                    'Trend Type': period['Trend Type']
                }

        return {'Trend Type': 'Trend not found'}

# stock = StockData('AAPL')
# data = stock.get_data()
# trend  = Trends()

# print(trend.get_trend_type_on_date("2023-11-06", data))