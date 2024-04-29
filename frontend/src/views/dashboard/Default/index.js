import { useEffect, useState, useContext } from 'react';

// material-ui
import { Grid, Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard/index';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarCharts';
import DashboardContext from '../../../context/DashboardContext';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const gridSpacing = 2 

const Dashboard = () => {
  const theme = useTheme();
  const { isLoading } = useContext(DashboardContext)

  const md = useMediaQuery(theme.breakpoints.down('md'));

  const chartCardSize = md ? '1200px' : '600px'

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <EarningCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <TotalOrderLineChartCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{height: chartCardSize}}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={8} sx={{ height: '600px',}}>
            <TotalGrowthBarChart isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={4} sx={{ height: '600px',}} >
              <PopularCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}; 

export default Dashboard;
