import { useContext, lazy} from "react";
import { Grid } from '@mui/material'
import StockCard from './StockInfoCard'
import ReturnCharts from './ReturnsChart'
import SignalsCard from './SignalsCard'
import DashboardContext from "../../context/DashboardContext";


const DashboardSkeleton = lazy(() => import("./skeleton"));


const DashboardComp = () => {

    const { isLoading } = useContext(DashboardContext);

    if (isLoading) {
        return (
            <DashboardSkeleton />
        );
    }

    return (
        <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
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