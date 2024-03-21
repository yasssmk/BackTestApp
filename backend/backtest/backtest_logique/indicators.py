import ta

class Indicators():
        
    def calculate_macd(self, stock_data, slow, fast, signal):
        macd = ta.trend.MACD(stock_data['Close'], window_slow=slow, window_fast=fast, window_sign=signal)
        stock_data['MACD'] = macd.macd()
        stock_data['Signal'] = macd.macd_signal()
        try:
            stock_data['MACD_Histogram'] = macd.macd_diff()
        except KeyError as e:
            raise KeyError(f"The 'MACD_Histogram' column is not available in the data: {e}")
        return stock_data
    
    
    def calculate_moving_averages(self, stock_data):
        stock_data['MA12'] =stock_data['Close'].rolling(window=12).mean()
        stock_data['MA20'] =stock_data['Close'].rolling(window=20).mean()
        stock_data['MA50'] =stock_data['Close'].rolling(window=50).mean()
        stock_data['MA5'] = stock_data['Close'].rolling(window=5).mean()

    
    def bb_low_indicator(self, stock_data):
        bb = ta.volatility.BollingerBands(stock_data['Close'])
        bb_low = bb.bollinger_lband_indicator()
        return bb_low
    
    def bb_high_indicator(self, stock_data):
        bb = ta.volatility.BollingerBands(stock_data['High'])
        bb_high = bb.bollinger_hband_indicator()
        return bb_high
    


# stock = StockData('AAPL')
# data = stock.get_data()
# ind = Indicators()
# print(ind.calculate_macd(data, 26,12,9))

