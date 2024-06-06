import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// project imports
import SkeletonTotalGrowthBarChart from '../../../../ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from '../../../../ui-component/cards/MainCard';


// chart data
import DataTotalGrowthBarChart from './DataTotalGrowthBarChart';


const gridSpacing = 2 


// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const TotalGrowthBarChart = ({ isLoading }) => {
  const theme = useTheme();

  return (
    <>

      {isLoading ? (
        <SkeletonTotalGrowthBarChart />
      ) : (
        <MainCard sx = {{height:'100%'}}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <Typography sx={{...theme.typography.h2, color: theme.palette.secondary[800]}}>Value Growth ($)</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <DataTotalGrowthBarChart isLoading={isLoading} />
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

TotalGrowthBarChart.propTypes = {
  isLoading: PropTypes.bool
};

export default TotalGrowthBarChart;
