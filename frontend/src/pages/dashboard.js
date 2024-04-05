import { useContext, lazy, Suspense } from 'react';
import SearchBar from '../components/Searchbar';
import DashboardContext from "../context/DashboardContext";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { ErrorBoundary } from 'react-error-boundary';

const DashboardCards = lazy(() => import('../components/DashboardComps'));

const Dashboard = () => {
    const { hasError } = useContext(DashboardContext);
    
    const DashboardComponent = hasError ? (
        <Stack sx={{ width: '100%' }} spacing={2} alignItems="center" justifyContent="center" mt={4}>
            <Alert severity="error" variant="outlined">
                <AlertTitle>Error</AlertTitle>
                Something went wrong!
            </Alert>
        </Stack>
    ) : ( <>
                <Suspense fallback={<div><h2>CA CHARRRRGE</h2></div>}>
                    <DashboardCards />
                </Suspense>
            
        </>)
    ;

    return (
        <div>
            <h3>It will all be there</h3>
            <SearchBar />
            <ErrorBoundary fallback={<p> Ca a fucked up</p>}>
                {DashboardComponent}
            </ErrorBoundary>
        </div>
    );
};

export default Dashboard

