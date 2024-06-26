import PropTypes from 'prop-types';
import { useState,  useContext   } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, Grid, Typography } from '@mui/material';

// project imports
import MainCard from '../../../ui-component/cards/MainCard';
import SkeletonTotalOrderCard from '../../../ui-component/cards/Skeleton/EarningCard';
import DashboardContext from "../../../context/DashboardContext";

// assets
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';;

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.primary[800],
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
    background: theme.palette.primary.dark,
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
    background: theme.palette.primary.dark,
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

  const {dashboardData} = useContext(DashboardContext);

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
                        backgroundColor: theme.palette.primary.dark,
                        color: '#fff',
                        mt: 1
                      }}
                    >
                      <TrendingUpOutlinedIcon height='30' width='30' />
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Typography sx={{ ...theme.typography.h2, color: theme.palette.secondary.light, ml: 1, mt: 1.75, mb: 0.75, zIndex: 1 }}>Investment data</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item>
                  <Grid container  justifyContent="flex-start" alignItems="center">
                    <Typography sx={{ ...theme.typography.h3, color: theme.palette.secondary[200],  color: theme.palette.primary[200], mr: 1, mt: 1.75, mb: 0.4 }}>Monthly av. growth: </Typography>
                    <Typography sx={{ ...theme.typography.h3, color: theme.palette.secondary.light, mr: 1, mt: 1.75, mb: 0.4 }}>{dashboardData["Stats"] ? dashboardData["Stats"]["Monthly average Asset growth"]: null} </Typography>
                  </Grid>
                  <Grid container  justifyContent="flex-start"  alignItems="center">
                    <Typography sx={{ ...theme.typography.h3, color: theme.palette.secondary[200],  color: theme.palette.primary[200], mr: 1, mb: 0.4 }}>Total money invested: </Typography>
                    <Typography sx={{ ...theme.typography.h3, color: theme.palette.secondary.light,  mr: 1, mb: 0.4}}>{dashboardData["Stats"] ?  dashboardData["Stats"]["Total money invested"]: null} </Typography>
                  </Grid>
                  <Grid container  justifyContent="flex-start"  alignItems="center">
                    <Typography sx={{ ...theme.typography.h3, color: theme.palette.secondary[200],  color: theme.palette.primary[200], mr: 1, mb: 0.4}}>Total money made: </Typography>
                    <Typography sx={{ ...theme.typography.h3, color: theme.palette.secondary.light, mr: 1, mb: 0.4 }}>{dashboardData["Stats"] ? dashboardData["Stats"]["Total"]: null}</Typography>
                  </Grid>
                  <Grid container  justifyContent="flex-start"  alignItems="center">
                    <Typography sx={{ ...theme.typography.h3, color: theme.palette.secondary[200],  color: theme.palette.primary[200], mr: 1, mb: 0.75 }}>Total net: </Typography>
                    <Typography sx={{ ...theme.typography.h3, color: theme.palette.secondary.light, mr: 1, mb: 0.75 }}>{dashboardData["Stats"] ? dashboardData["Stats"]["Total net"]: null}</Typography>
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
