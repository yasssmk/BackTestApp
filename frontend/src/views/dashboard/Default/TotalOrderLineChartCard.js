import PropTypes from 'prop-types';
import { useState,  useContext   } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';

// third-party
import Chart from 'react-apexcharts';

// project imports
import MainCard from '../../../ui-component/cards/MainCard';
import SkeletonTotalOrderCard from '../../../ui-component/cards/Skeleton/EarningCard';
import DashboardContext from "../../../context/DashboardContext";

import ChartDataMonth from './chart-data/total-order-month-line-chart';
import ChartDataYear from './chart-data/total-order-year-line-chart';

// assets
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&>div': {
    position: 'relative',
    zIndex: 5
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.primary[800],
    borderRadius: '50%',
    zIndex: 1,
    top: -85,
    right: -95,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140
    }
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    zIndex: 1,
    width: 210,
    height: 210,
    background: theme.palette.primary[800],
    borderRadius: '50%',
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down('sm')]: {
      top: -155,
      right: -70
    }
  }
}));

// ==============================|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||============================== //

const TotalOrderLineChartCard = ({ isLoading }) => {
  const theme = useTheme();

  const [timeValue, setTimeValue] = useState(false);
  const handleChangeTime = (event, newValue) => {
    setTimeValue(newValue);
  };

  const {dashboardData, setError} = useContext(DashboardContext);

  return (
    <>
      {isLoading ? (
        <SkeletonTotalOrderCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item>
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        backgroundColor: theme.palette.primary[800],
                        color: '#fff',
                        mt: 1
                      }}
                    >
                      <LocalMallOutlinedIcon fontSize="inherit" />
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Typography sx={{ fontSize: '2rem', fontWeight: 500, ml: 1, mt: 1.75, mb: 0.75, zIndex: 1}}>Investment Stats</Typography>
                  </Grid>
                  {/* <Grid item>
                    <Button
                      disableElevation
                      variant={timeValue ? 'contained' : 'text'}
                      size="small"
                      sx={{ color: 'inherit' }}
                      onClick={(e) => handleChangeTime(e, true)}
                    >
                      Month
                    </Button>
                    <Button
                      disableElevation
                      variant={!timeValue ? 'contained' : 'text'}
                      size="small"
                      sx={{ color: 'inherit' }}
                      onClick={(e) => handleChangeTime(e, false)}
                    >
                      Year
                    </Button>
                  </Grid> */}
                </Grid>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item>
                  <Grid container  justifyContent="space-between" alignItems="center">
                    <Typography sx={{ fontSize: '1.2rem', fontWeight: 500,  mr: 1, mt: 1.75, mb: 0.4 }}>Monthly av. growth: </Typography>
                    <Typography sx={{ fontSize: '1.2rem', fontWeight: 500, color: theme.palette.success.light, mr: 1, mt: 1.75, mb: 0.4 }}>{dashboardData["Stats"] ? dashboardData["Stats"]["Monthly average Asset growth"]: null} </Typography>
                  </Grid>
                  <Grid container  justifyContent="space-between"  alignItems="center">
                    <Typography sx={{ fontSize: '1.2rem', fontWeight: 500,  mr: 1, mb: 0.4 }}>Total money invested: </Typography>
                    <Typography sx={{ fontSize: '1.2rem', fontWeight: 500, color: theme.palette.success.light, mr: 1, mb: 0.4}}>{dashboardData["Stats"] ?  dashboardData["Stats"]["Total money invested"]: null} </Typography>
                  </Grid>
                  <Grid container  justifyContent="space-between"  alignItems="center">
                    <Typography sx={{ fontSize: '1.2rem', fontWeight: 500,  mr: 1, mb: 0.4}}>Total money made: </Typography>
                    <Typography sx={{ fontSize: '1.2rem', fontWeight: 500, color: theme.palette.success.light, mr: 1, mb: 0.4 }}>{dashboardData["Stats"] ? dashboardData["Stats"]["Total"]: null}</Typography>
                  </Grid>
                  <Grid container  justifyContent="space-between"  alignItems="center">
                    <Typography sx={{ fontSize: '1.2rem', fontWeight: 500,  mr: 1, mb: 0.75 }}>Total net: </Typography>
                    <Typography sx={{ fontSize: '1.2rem', fontWeight: 500, color: theme.palette.success.light, mr: 1, mb: 0.75 }}>{dashboardData["Stats"] ? dashboardData["Stats"]["Total net"]: null}</Typography>
                  </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

TotalOrderLineChartCard.propTypes = {
  isLoading: PropTypes.bool
};

export default TotalOrderLineChartCard;
