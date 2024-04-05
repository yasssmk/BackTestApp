import { useContext} from "react";
import { Grid } from '@mui/material'
import StockCard from './StockInfoCard'
import ReturnCharts from './ReturnsChart'
import SignalsCard from './SignalsCard'
import DashboardContext from "../../context/DashboardContext";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const DashboardComp = () => {

    const { isLoading } = useContext(DashboardContext);

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex' }} alignItems="center" justifyContent="center">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Grid container spacing={3}>
            <Grid item lg={4} md={6} sm={6} xs={12}>
                <StockCard />
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <ReturnCharts />
                    </Grid> 
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <SignalsCard />
                    </Grid>
               </Grid>
            </Grid>
        </Grid>
    );
}

export default DashboardComp