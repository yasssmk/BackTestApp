from signals import Signals
from data import StockData
import pandas as pd
from datetime import datetime, date
import numpy as np

class BackTest(StockData):

    def __init__(self, symbol):
        super().__init__(symbol)
        self.stock_data = self.get_data()
        self.monthly_stock_data = self.get_monthly_data()
        self.signals = Signals(self.stock_data, self.monthly_stock_data )       
        self.sells = self.signals.sell_signal()
        self.buys= self.signals.buy_signal()

    
    def back_test(self):

        portfolio = pd.DataFrame(columns=['Symbol', 'Buying Date', 'Buying Price','Buying Signal', 'Selling Date', 'Selling Price','Selling Signal', 'Yield (%)', 'Profit/Loss ($)'])

        trades = []

        if len(self.sells) == 0:

            last_close_price = self.stock_data.loc[self.stock_data.index[-1], 'Close']

            for index, buy_row in self.buys.iterrows():
                buy_date = buy_row['Date']
                buying_price = buy_row['Close']
                buying_signal = buy_row['Signal']
                yield_percent = ((last_close_price / buying_price) - 1) * 100
                profit_or_loss = (last_close_price - buying_price)

                # Get today's date and format it in the same format as other dates
                today_date = datetime.datetime.now().strftime('%Y-%m-%d')

                trades.append([self.symbol, buy_date, buying_price, buying_signal, today_date, last_close_price, yield_percent, profit_or_loss])
        else:
            for index, buy_row in self.buys.iterrows():
                buy_date = buy_row['Date']
                sell_date = None
                selling_price = None

                for index, sell_row in self.sells.iterrows():
                    if sell_row['Date'] > buy_date:
                        sell_date = sell_row['Date']
                        selling_price = sell_row['Close']
                        selling_signal = sell_row['Signal']
                        break

                if sell_date is not None:
                    buying_price = buy_row['Close']
                    buying_signal = buy_row['Signal']
                    yield_percent = ((selling_price / buying_price) - 1) * 100
                    profit_or_loss = (selling_price - buying_price)

                else:
                    last_close_price = self.stock_data.loc[self.stock_data.index[-1], 'Close']
                    buying_price = buy_row['Close']
                    buying_signal = buy_row['Signal']
                    yield_percent = ((last_close_price / buying_price) - 1) * 100
                    profit_or_loss = (last_close_price - buying_price)

                    # Get the last close date and price from stock_data
                    last_close_date = self.stock_data.index[-1].strftime('%Y-%m-%d')
                    last_close_price = self.stock_data[self.stock_data.index[-1], 'Close']

                    sell_date = last_close_date
                    selling_price = last_close_price

                trades.append([self.symbol, buy_date, buying_price,buying_signal, sell_date, selling_price, selling_signal, yield_percent, profit_or_loss])


        trades_df = pd.DataFrame(trades, columns=['Symbol', 'Buying Date', 'Buying Price','Buying Signal', 'Selling Date', 'Selling Price','Selling signal', 'Yield (%)', 'Profit/Loss ($)'])

        total_yield = trades_df['Yield (%)'].mean()
        total_profit_loss = trades_df['Profit/Loss ($)'].sum()

        total_row = pd.DataFrame([{'Symbol': self.symbol,
                                'Buying Date': 'Total',
                                'Buying Price': '',
                                'Buying Signal':'',
                                'Selling Date': '',
                                'Selling Price': '',
                                'Selling Signal': '',
                                'Yield (%)': total_yield,
                                'Profit/Loss ($)': total_profit_loss}])

        portfolio = pd.concat([portfolio, total_row], ignore_index=True)

        return trades_df
    
    
    def calculate_money_invested(self):

        df = self.back_test()

        df['Buying Date'] = pd.to_datetime(df['Buying Date'], errors='coerce')
        df['Selling Date'] = pd.to_datetime(df['Selling Date'].replace('Still Holding', np.nan), errors='coerce')

        start_date = df['Buying Date'].min()

        # Create a date range from start_date to the last month
        end_date = pd.to_datetime('today')
        date_range = pd.date_range(start=start_date, end=end_date, freq='M')

        # Format the date_range to match the '%y-%m' format
        formatted_date_range = date_range.strftime('%Y-%m-%d')

        monthly_data = pd.DataFrame(columns=['Money Added','Total Money Invested', 'Added value', 'Asset Sold', 'Return'])
        total_money_invested = 0
        sold_asset = 0

        for month in formatted_date_range:

            value_increased = 0

            # Extract year and month from the formatted date
            year, month_str, _ = month.split('-')
            year = int(year)
            month = int(month_str)

            # Filter operations that were active in this month
            active_operations = df[
                (df['Buying Date'].dt.year == year) & (df['Buying Date'].dt.month == month)
            ]

            # Calculate monthly profit for active operations
            if active_operations['Buying Price'].sum() != 0:
                money_invested = active_operations['Buying Price'].sum()-sold_asset

                if money_invested < 0:
                    sold_asset = money_invested*(-1)
                    money_invested = 0
                if money_invested > 0:
                    sold_asset = 0


                total_money_invested += money_invested

            try:
                current_date = date(year, month, 31)
                current_date_datetime = pd.to_datetime(current_date)
            
            except ValueError:

                try:
                    current_date = date(year, month, 30) 
                    current_date_datetime = pd.to_datetime(current_date)
                except ValueError:
                    current_date = date(year, month, 28)
                    current_date_datetime = pd.to_datetime(current_date)

            # Filter operations with 'Selling Date' as 'Still Holding' or that meet the other conditions
            holding_operation = df[
                ((df['Buying Date'] < current_date_datetime) & (df['Selling Date'] > current_date_datetime))
            ]

            selling_operations = df[
                (df['Selling Date'].dt.year == year) & (df['Selling Date'].dt.month == month)
            ]

            for _, operation in selling_operations.iterrows():

                selling_date = pd.to_datetime(operation['Selling Date']).strftime('%Y-%m')

                if selling_date == f"{year}-{month:02d}":
                    sold_asset += operation['Selling Price']

            for _, operation in holding_operation.iterrows():

                stock_data = self.monthly_stock_data

                stock_data = stock_data.reset_index()
                stock_data['Date'] = pd.to_datetime(stock_data['Date'])
                stock_data.set_index('Date', inplace=True)

                # Filter the stock data for the current month
                monthly_stock_data = stock_data[
                    (stock_data.index.year == year) & (stock_data.index.month == month)
                ]

            # Calculate and update cumulative closing prices
                value_increased += monthly_stock_data['Close'].sum()

            # Calculate the return for the current month
            return_percentage = (((value_increased + sold_asset) / (total_money_invested)) -1) * 100

            monthly_data.loc[f"{month:02d}-{year}"] = [money_invested, total_money_invested, value_increased, sold_asset, return_percentage]

        return monthly_data
    

def calculate_and_print_statistics(df):


        num_months_with_investment = (df['Money Added'] != 0).sum()
        num_months = (df['Money Added']).count()


        average_monthly_investment = df['Total Money Invested'].iloc[-1] / num_months_with_investment


        monthly_avg_asset_growth = (df['Added value'] + df['Asset Sold']).pct_change().mean() * 100


        total_cash = df['Asset Sold'].iloc[-1]

        total_money = df['Total Money Invested'].iloc[-1]


        total_held = df['Added value'].iloc[-1]


        total = total_held + total_cash

        stat = {
            "Number of months with investment": f"{(num_months_with_investment/num_months)}",
            "Average monthly investment": f"{average_monthly_investment:.2f}$",
            "Monthly average Asset growth": f"{monthly_avg_asset_growth:.2f}%",
            "Total money invested": f"{total_money:.2f}$",
            "Total cash": f"{total_cash:.2f}$",
            "Total held": f"{total_held:.2f}$",
            "Total": f"{total:.2f}$"
        }

        return stat


test = BackTest("AAPL")
df_test = test.back_test()
df_return = test.calculate_money_invested()
print(df_return)
print(calculate_and_print_statistics(df_return))