import ta
from data import StockData

class Indicators(StockData):

    def __init__(self, symbol):
        super().__init__(symbol)
        self.stock_data = self.get_data(symbol)
        self.monthly_stock_data = self.get_monthly_data(symbol)
        
    
    def calculate_macd(self, slow, fast, signal):
        macd = ta.trend.MACD(self.stock_data ['Close'], window_slow=slow, window_fast=fast, window_sign=signal)
        self.stock_data ['MACD'] = macd.macd()
        self.stock_data ['Signal'] = macd.macd_signal()
        try:
            self.stock_data['MACD_Histogram'] = macd.macd_diff()
        except KeyError as e:
            raise KeyError(f"The 'MACD_Histogram' column is not available in the data: {e}")
        return self.stock_data
    
    def calculate_monthly_macd(self, slow, fast, signal):
        macd = ta.trend.MACD(self.monthly_stock_data['Close'], window_slow=slow, window_fast=fast, window_sign=signal)
        self.monthly_stock_data ['MACD'] = macd.macd()
        self.monthly_stock_data['Signal'] = macd.macd_signal()
        try:
            self.monthly_stock_data['MACD_Histogram'] = macd.macd_diff()
        except KeyError as e:
            raise KeyError(f"The 'MACD_Histogram' column is not available in the data: {e}")
        return self.monthly_stock_data
    
    def calculate_moving_averages(self):
        self.stock_data['MA12'] =self.stock_data['Close'].rolling(window=12).mean()
        self.stock_data['MA20'] =self.stock_data['Close'].rolling(window=20).mean()
        self.stock_data['MA50'] =self.stock_data['Close'].rolling(window=50).mean()
        self.stock_data['MA5'] = self.stock_data['Close'].rolling(window=5).mean()
    
    def calculate_monthly_moving_averages(self):
        self.monthly_stock_data['MA12'] =self.monthly_stock_data['Close'].rolling(window=12).mean()
        self.monthly_stock_data['MA20'] =self.monthly_stock_data['Close'].rolling(window=20).mean()
        self.monthly_stock_data['MA50'] =self.monthly_stock_data['Close'].rolling(window=50).mean()
        self.monthly_stock_data['MA5'] = self.monthly_stock_data['Close'].rolling(window=5).mean()
    
    def bb_low_indicator(self):
        bb = ta.volatility.BollingerBands(self.stock_data['Close'])
        bb_low = bb.bollinger_lband_indicator()
        return bb_low
    
    def bb_low_monthly_indicator(self):
        bb = ta.volatility.BollingerBands(self.monthly_stock_data['Close'])
        bb_low = bb.bollinger_lband_indicator()
        return bb_low
    
    def bb_high_indicator(self):
        bb = ta.volatility.BollingerBands(self.stock_data['High'])
        bb_high = bb.bollinger_hband_indicator()
        return bb_high
    
    def bb_high_monthly_indicator(self):
        bb = ta.volatility.BollingerBands(self.monthly_stock_data['High'])
        bb_high = bb.bollinger_hband_indicator()
        return bb_high
    


stock = Indicators('AAPL')
print(stock.calculate_macd(26,12,9))

