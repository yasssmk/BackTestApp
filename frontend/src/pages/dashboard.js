import { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import SearchBar from '../components/DashboardComps/Searchbar';
import ReturnCharts from '../components/DashboardComps/ReturnsChart';
import StockCard from '../components/DashboardComps/StockInfoCard';
import SignalsCard from '../components/DashboardComps/SignalsCard';

const ErrorFallback = ({ error, resetErrorBoundary }) => (
    <div role="alert">
      <p>Oops! Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );

const Dashboard = () => {
    return ( 
            <div> 
                <h3>It will all be there</h3>
                <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => console.log('Resetting')}>
                    <SearchBar />
                    <StockCard />
                    <ReturnCharts />
                    <SignalsCard />
                </ErrorBoundary>
            </div> 

    );
};

export default Dashboard

