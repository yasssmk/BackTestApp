import { useEffect, useState, useContext } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import SearchBar from '../components/DashboardComps/Searchbar';
import ReturnCharts from '../components/DashboardComps/ReturnsChart';
import StockCard from '../components/DashboardComps/StockInfoCard';
import SignalsCard from '../components/DashboardComps/SignalsCard';
import DashboardContext from "../context/DashboardContext";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';



const ErrorFallback = ({ error, resetErrorBoundary }) => (
    <div role="alert">
      <p>Oops! Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );

const Dashboard = () => {
    const { hasError} = useContext(DashboardContext);
    return ( 
            <div> 
                <h3>It will all be there</h3>
                <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => console.log('Resetting')}>
                    <SearchBar />
                    <StockCard />
                    <ReturnCharts />
                    <SignalsCard />
                </ErrorBoundary>
                {hasError && (
                <Stack sx={{ width: '100%' }} spacing={2} alignItems="center" justifyContent="center" mt={8}>
                    <Alert severity="error" variant="outlined">
                        <AlertTitle>Error</AlertTitle>
                        Something went wrong!
                    </Alert>
                </Stack>
            )}
            </div> 

    );
};

export default Dashboard

