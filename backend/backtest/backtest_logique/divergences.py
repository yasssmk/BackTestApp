from .indicators import Indicators
from .trends import Trends
import pandas as pd

class Divergences():

    def __init__(self, stock_data, monthly_stock_data):
        self.stock_data = stock_data
        self.monthly_stock_data = monthly_stock_data
        self.ind = Indicators()
        self.ind.calculate_moving_averages(self.stock_data)
        self.ind.calculate_moving_averages(self.monthly_stock_data)
        self.trends = Trends()
    
    
    def find_divergences(self):

        divergences = set()  # Use a set to store unique divergences
        trend_periods = self.trends.create_macd_trend_periods(self.stock_data)
        lt_trends = self.trends.create_lt_trend_periods(self.monthly_stock_data)
        trend_periods_monthly = self.trends.create_macd_trend_periods(self.monthly_stock_data)
    
        self.ind.calculate_macd(self.monthly_stock_data,26,12,9)


        def add_divergence(divergence_type, signal, date):
            divergence = (
                divergence_type,
                signal,
                date
            )
            divergences.add(divergence)

        bearish_divergence_spotted = False
        bullish_divergence_spotted = False
        previous_lt_trend = None


        for lt_trend in lt_trends:

            start_date = pd.to_datetime(lt_trend['Start Date'])
            end_date = pd.to_datetime(lt_trend['End Date'])
            current_trend = None


            if previous_lt_trend == 'Bullish breath' and lt_trend['Trend Type'] == 'Bullish' and bullish_divergence_spotted:
                add_divergence('Bullish Divergence', 'Buy', start_date)
                bullish_divergence_spotted = False

            elif previous_lt_trend == 'Bearish' and bullish_divergence_spotted:
                add_divergence('Bullish Divergence', 'Buy', start_date)
                bullish_divergence_spotted = False

            elif previous_lt_trend == 'Bullish' and lt_trend['Trend Type'] == 'Bullish breath' and bearish_divergence_spotted:
                add_divergence('Bearish Divergence', 'Sell', start_date)
                bearish_divergence_spotted = False


            for period in trend_periods:

                if period['Start Date'] >= start_date and period['Start Date'] <= end_date:

                    if current_trend is None:
                        current_trend = period['Trend Type']
                        current_highest_price = period['Highest Price']
                        current_highest_histogram = period['Highest Histogram']
                        current_highest_macd = period['Highest MACD']
                        current_lowest_price = period['Lowest Price']
                        current_lowest_histogram = period['Lowest Histogram']
                        current_lowest_macd = period['Lowest MACD']
                        previous_highest_price = current_highest_price
                        previous_highest_histogram = current_highest_histogram
                        previous_highest_macd = current_highest_macd
                        previous_lowest_price = current_lowest_price
                        previous_lowest_histogram = current_lowest_histogram
                        previous_lowest_macd = current_lowest_macd

                    else:

                        if period['Trend Type'] != current_trend:
                            current_trend = period['Trend Type']

                        if current_trend == 'MACD Bullish':

                            if period['Highest Price'] >= current_highest_price:

                                previous_highest_price = current_highest_price
                                previous_highest_histogram = current_highest_histogram
                                previous_highest_macd = current_highest_macd

                                current_trend = period['Trend Type']
                                current_highest_price = period['Highest Price']
                                current_highest_histogram = period['Highest Histogram']
                                current_highest_macd = period['Highest MACD']

                                # Bearish Divergence
                                if (current_highest_price > previous_highest_price and
                                    current_highest_macd <= previous_highest_macd):
                                    bearish_divergence_spotted = True

                        elif current_trend == 'MACD Bearish':

                            if period['Lowest Price'] <= current_lowest_price:

                                previous_lowest_price = current_lowest_price
                                previous_lowest_histogram = current_lowest_histogram
                                previous_lowest_macd = current_lowest_macd

                                current_trend = period['Trend Type']
                                current_lowest_price = period['Lowest Price']
                                current_lowest_histogram = period['Lowest Histogram']
                                current_lowest_macd = period['Lowest MACD']

                                # Bullish Divergence
                                if (current_lowest_price < previous_lowest_price and
                                    current_lowest_macd >= previous_lowest_macd):
                                    bullish_divergence_spotted = True
     


            if bullish_divergence_spotted:
                for i in range(1, len(self.monthly_stock_data)):

                    if self.monthly_stock_data.index[i] > period['Start Date'] and self.monthly_stock_data.index[i] <= period['End Date']:
                        if self.monthly_stock_data['Close'][i] < period['Lowest Price']:
                            print(f" the {self.monthly_stock_data.index[i]} month cloe  = {self.monthly_stock_data['Close'][i]} and period lowest {period['Lowest Price']} ")
                            bullish_divergence_spotted = False



            previous_lt_trend = lt_trend['Trend Type']

            #Divergences Monthly
            current_monthly_trend = None
            for period_m in trend_periods_monthly:

                if current_monthly_trend is None:
                    current_monthly_trend = period_m['Trend Type']
                    current_monthly_highest_price  = period_m['Highest Price']
                    current_monthly_highest_histogram = period_m['Highest Histogram']
                    current_monthly_highest_macd = period_m['Highest MACD']
                    current_monthly_lowest_price = period_m['Lowest Price']
                    current_monthly_lowest_histogram = period_m['Lowest Histogram']
                    current_monthly_lowest_macd = period_m['Lowest MACD']
                    previous_monthly_highest_price = current_monthly_highest_price
                    previous_monthly_highest_histogram = current_monthly_highest_histogram
                    previous_monthly_highest_macd = current_monthly_highest_macd
                    previous_monthly_lowest_price = current_monthly_lowest_price
                    previous_monthly_lowest_histogram = current_monthly_lowest_histogram
                    previous_monthly_lowest_macd = current_monthly_lowest_macd


                else:

                    if period_m['Trend Type'] != current_monthly_trend:
                        current_monthly_trend = period_m['Trend Type']


                    if period_m['Highest Price'] >= current_monthly_highest_price:

                        previous_monthly_highest_price = current_monthly_highest_price
                        previous_monthly_highest_histogram = current_monthly_highest_histogram
                        previous_monthly_highest_macd = current_monthly_highest_macd

                        current_monthly_trend = period_m['Trend Type']
                        current_monthly_highest_price = period_m['Highest Price']
                        current_monthly_highest_histogram = period_m['Highest Histogram']
                        current_monthly_highest_macd = period_m['Highest MACD']

                        # Bearish Divergence
                        if current_monthly_trend == 'MACD Bullish':
                            if (current_monthly_highest_price > previous_monthly_highest_price and
                                current_monthly_highest_macd <= previous_monthly_highest_macd):
                                add_divergence('Monthly Bearish Divergence', 'Sell', period_m['End Date'])


                    if period_m['Lowest Price'] <= current_monthly_lowest_price:

                        previous_monthly_lowest_price = current_monthly_lowest_price
                        previous_monthly_lowest_histogram = current_monthly_lowest_histogram
                        previous_monthly_lowest_macd = current_monthly_lowest_macd

                        current_monthly_trend = period_m['Trend Type']
                        current_monthly_lowest_price = period_m['Lowest Price']
                        current_monthly_lowest_histogram = period_m['Lowest Histogram']
                        current_monthly_lowest_macd = period_m['Lowest MACD']

                        # Bullish Divergence
                        if current_monthly_trend == 'MACD Bearish':
                            if (current_monthly_lowest_price < previous_monthly_lowest_price and
                                current_monthly_lowest_macd >= previous_monthly_lowest_macd):
                                add_divergence('Monthly Bullish Divergence', 'Buy', period_m['End Date'])


        divergences_list = list(divergences)
        divergences_df = pd.DataFrame(divergences_list, columns=['Divergence Type', 'Signal', 'Date'])
        return divergences_df


# stock = Divergences('AAPL')
# print(stock.find_divergences())