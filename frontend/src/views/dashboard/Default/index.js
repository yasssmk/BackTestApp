import { useContext } from 'react';

// material-ui
import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
// project imports
import InfoCard from './CompanyInfoCard';
import SignalsCard from './SignalsCard/index';
import InvestmentCard from './InvestmentCard';
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
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <InfoCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <InvestmentCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{height: chartCardSize}}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={8} sx={{ height: '600px',}}>
            <TotalGrowthBarChart isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={4} sx={{ height: '600px',}} >
              <SignalsCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}; 

export default Dashboard;
