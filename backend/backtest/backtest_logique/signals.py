from .divergences import Divergences
from .indicators import Indicators
from .trends import Trends
import pandas as pd

class Signals():

    def __init__(self, stock_data, monthly_stock_data):
        self.stock_data = stock_data
        self.monthly_stock_data = monthly_stock_data
        self.div = Divergences(self.stock_data, self.monthly_stock_data)
        self.divergences = self.div.find_divergences()
        self.ind = Indicators()
        self.trends = Trends()
    
    def buy_signal(self):

        bb_low = self.ind.bb_low_indicator(self.stock_data)
        bb_low_monthly = self.ind.bb_low_indicator(self.monthly_stock_data)
        self.ind.calculate_macd(self.monthly_stock_data, 26, 3, 7)
        # self.ind.calculate_moving_averages(self.stock_data)
        first_macd_trend_end_date = self.trends.create_macd_trend_periods(self.monthly_stock_data)[0]['End Date']
        divergences = self.divergences
        trend_types = {}

        signals_df = pd.DataFrame(columns=['Date', 'Signal', 'Close'])

        #signals before confirmation:
        waiting_confirmation = False
        confirmation_date = None
        waiting_monthly_confirmation = False


        for index, divergence in divergences.iterrows():

            if divergence['Signal'] == 'Buy':
                    date = divergence['Date']
                    div_type = divergence['Divergence Type']
                    try:
                        close_price = self.stock_data.loc[self.stock_data.index == date, 'Close'].values[0]
                    except IndexError:
                        try:
                            close_price = self.stock_data.loc[self.stock_data.index < date, 'Close'].iloc[-1]
                        except IndexError:
                            close_price = None
                    if close_price is not None:
                        new_row = pd.DataFrame({'Date': date, 'Signal': div_type, 'Close': close_price}, index=[0])
                        signals_df = pd.concat([signals_df, new_row], ignore_index=True)

        for j in range(1, len(self.monthly_stock_data)):
                date = self.monthly_stock_data.index[j].date()
                trend_type = self.trends.get_trend_type_on_date(date, self.monthly_stock_data)['Trend Type']

                if date >= first_macd_trend_end_date.date():

                    if bb_low_monthly[j] == 1:
                        waiting_monthly_confirmation = True
                        signal = 'BB Low monthly'
                        continue

                    if waiting_monthly_confirmation:
                        if trend_type == 'Bullish':
                            signal = 'Monthly BB low'
                            close_price = self.monthly_stock_data['Close'].iloc[j]
                            signals_df = pd.concat([signals_df, pd.DataFrame({'Date': [date], 'Signal': [signal], 'Close': [close_price]})], ignore_index=True)
                            waiting_monthly_confirmation = False

                    if trend_type == 'Bearish' and self.monthly_stock_data['MACD'][j-1] > self.monthly_stock_data['MACD'][j] and self.monthly_stock_data['MACD'][j-2] > self.monthly_stock_data['MACD'][j-1]:
                        waiting_monthly_confirmation = False

        for i in range(1, len(self.stock_data)):
                
                date = self.stock_data.index[i].date()

                if date >= first_macd_trend_end_date.date():
                    trend_type = self.trends.get_trend_type_on_date(date, self.stock_data)['Trend Type']
                    signal = ''

                    if trend_type == 'Bullish':

                        if self.stock_data['MA12'][i] > self.stock_data['MA20'][i]:
                            if self.stock_data['MA5'][i] >= self.stock_data['MA12'][i] and self.stock_data['MA5'][i-1] <= self.stock_data['MA12'][i-1]:
                                date = self.stock_data.index[i].date()  # Get the date
                                close_price = self.stock_data['Close'].iloc[i]  # Get the 'Close' price
                                signal = 'Pull Back'
                                signals_df = pd.concat([signals_df, pd.DataFrame({'Date': [date], 'Signal': [signal], 'Close': [close_price]})], ignore_index=True)

                    if not waiting_confirmation:

                        if trend_type == 'Bullish' or trend_type == 'Bullish breath':
                            lower_price = self.stock_data['Low'].iloc[i]
                            ma50 = self.stock_data['MA50'].iloc[i]

                            if bb_low.iloc[i] == 1:
                                waiting_confirmation = True
                                confirmation_date = date
                                signal = 'BB Low'
                                continue

                            elif lower_price <= ma50:
                                waiting_confirmation = True
                                confirmation_date = date
                                signal = 'ma50 signal'
                                continue

                    elif waiting_confirmation == True:

                        for index, row in divergences.iterrows():
                            if row['Signal'] == 'Sell' and row['Date'] <= pd.Timestamp(date) and row['Date'] >= pd.Timestamp(confirmation_date):
                                waiting_confirmation = False
                                confirmation_date = None
                                break

                        if trend_type == 'Bearish':
                            waiting_confirmation = False
                            confirmation_date = None


                        elif trend_type == 'Bullish':

                            if self.stock_data['MACD'][i] > self.stock_data['Signal'][i] and self.stock_data['MA12'][i] > self.stock_data['MA50'][i]:
                                date = self.stock_data.index[i].date()
                                close_price = self.stock_data['Close'].iloc[i]
                                signal = 'Pull Back'
                                signals_df = pd.concat([signals_df, pd.DataFrame({'Date': [date], 'Signal': [signal], 'Close': [close_price]})], ignore_index=True)
                                waiting_confirmation = False
                                confirmation_date = None

                            elif self.stock_data['MACD'][i] > self.stock_data['Signal'][i] and self.stock_data['MA12'][i-1] <= self.stock_data['MA50'][i-1]:
                                date = self.stock_data.index[i].date()
                                close_price = self.stock_data['Close'].iloc[i]
                                signal = 'Pull Back'
                                signals_df = pd.concat([signals_df, pd.DataFrame({'Date': [date], 'Signal': [signal], 'Close': [close_price]})], ignore_index=True)
                                waiting_confirmation = False
                                confirmation_date = None

        signals_df = signals_df.drop_duplicates(subset=['Date', 'Signal'])
        signals_df['Date'] = pd.to_datetime(signals_df['Date'])
        signals_df = signals_df.sort_values(by='Date', ascending=True)
        
        return signals_df
    
    def sell_signal(self):

        divergences = self.divergences
        bb_high = self.ind.bb_high_indicator(self.stock_data)
        sell_signals_df = pd.DataFrame(columns=['Date', 'Signal', 'Close'])

        for index, divergence in divergences.iterrows():

            if divergence['Signal'] == 'Sell':
                date = divergence['Date']
                div_type =divergence['Divergence Type']
                close_price = self.stock_data.loc[self.stock_data.index <= date, 'Close'].iloc[-1]
                new_row = pd.DataFrame({'Date': date, 'Signal': div_type, 'Close': close_price}, index=[0])
                sell_signals_df = pd.concat([sell_signals_df, new_row], ignore_index=True)


        for i in range(1, len(self.stock_data)):

            date = self.stock_data.index[i].date()
            trend_type = self.trends.get_trend_type_on_date(date, self.monthly_stock_data)['Trend Type']

        if trend_type != 'Bullish':
            if bb_high.iloc[i] == 1 or bb_high.iloc[i-1] == 1 :
                signal = 'BB High'
                close_price = self.stock_data['Close'][i]
                new_row = pd.DataFrame({'Date': date, 'Signal': div_type, 'Close': close_price}, index=[0])
                sell_signals_df = pd.concat([sell_signals_df, new_row], ignore_index=True)

        sell_signals_df['Date'] = pd.to_datetime(sell_signals_df['Date'])
        sell_signals_df = sell_signals_df.sort_values(by='Date', ascending=True)
        return sell_signals_df

# stock = Signals("AAPL")
# print(stock.sell_signal())
