import { Grid } from '@mui/material'
import EarningCard from './infoCards'
import ChartSkeleton from './ChartSkeleton'
import TableSkeleton from './TableSkeleton'


const DashboardSkeleton = () => {

    return (
        <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
                <EarningCard />
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <ChartSkeleton />
                    </Grid> 
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <TableSkeleton />
                    </Grid>
               </Grid>
            </Grid>
        </Grid>
    );
}

export default DashboardSkeleton