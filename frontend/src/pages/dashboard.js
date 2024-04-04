import { useContext } from 'react';
import SearchBar from '../components/DashboardComps/Searchbar';
import ReturnCharts from '../components/DashboardComps/ReturnsChart';
import StockCard from '../components/DashboardComps/StockInfoCard';
import SignalsCard from '../components/DashboardComps/SignalsCard';
import DashboardContext from "../context/DashboardContext";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';


const Dashboard = () => {
    const { hasError } = useContext(DashboardContext);
    
    const DashboardComponent = hasError ? (
        <Stack sx={{ width: '100%' }} spacing={2} alignItems="center" justifyContent="center" mt={4}>
            <Alert severity="error" variant="outlined">
                <AlertTitle>Error</AlertTitle>
                Something went wrong!
            </Alert>
        </Stack>
    ) : (
        <>
            <StockCard />
            <ReturnCharts />
            <SignalsCard />
        </>
    );

    return (
        <div>
            <h3>It will all be there</h3>
            <SearchBar />
            {DashboardComponent}
        </div>
    );
};

export default Dashboard

