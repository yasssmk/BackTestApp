import PropTypes from 'prop-types';
import { useContext  } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid,Typography } from '@mui/material';

// project imports
import MainCard from '../../../ui-component/cards/MainCard';
import SkeletonEarningCard from '../../../ui-component/cards/Skeleton/EarningCard';
import DashboardContext from "../../../context/DashboardContext";

// assets
import EarningIcon from '../../../assets/images/icons/earning.svg';


const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
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
    background: theme.palette.secondary[800],
    borderRadius: '50%',
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
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
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

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const EarningCard = ({ isLoading }) => {
  const theme = useTheme();
  const {dashboardData} = useContext(DashboardContext);


  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
              <Grid item>
                <Grid container  alignItems="center">
                  <Grid item>
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        backgroundColor: theme.palette.secondary[800],
                        mt: 1
                      }}
                    >
                      <img src={EarningIcon} alt="Notification" />
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Typography sx={{ fontSize: '2rem', fontWeight: 500, ml: 1, mt: 1.75, mb: 0.75, zIndex: 1}}>Company Info</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item>
                  <Grid container  justifyContent="space-between" alignItems="center">
                    <Typography sx={{ fontSize: '1.2rem', fontWeight: 500,  mr: 1, mt: 1.75, mb: 0.4 }}>Ticker: </Typography>
                    <Typography sx={{ fontSize: '1.2rem', fontWeight: 500, color: theme.palette.secondary[200], mr: 1, mt: 1.75, mb: 0.4 }}>{dashboardData["Stock info"] ? dashboardData["Stock info"]["Symbol"]: null} </Typography>
                  </Grid>
                  <Grid container  justifyContent="space-between"  alignItems="center">
                    <Typography sx={{ fontSize: '1.2rem', fontWeight: 500,  mr: 1, mb: 0.4 }}>Industry: </Typography>
                    <Typography sx={{ fontSize: '1.2rem', fontWeight: 500, color: theme.palette.secondary[200], mr: 1, mb: 0.4}}>{dashboardData["Stock info"] ?  dashboardData["Stock info"]["Industry"]: null} </Typography>
                  </Grid>
                  <Grid container  justifyContent="space-between"  alignItems="center">
                    <Typography sx={{ fontSize: '1.2rem', fontWeight: 500,  mr: 1, mb: 4.3 }}>Country: </Typography>
                    <Typography sx={{ fontSize: '1.2rem', fontWeight: 500, color: theme.palette.secondary[200], mr: 1, mb: 4.3  }}>{dashboardData["Stock info"] ? dashboardData["Stock info"]["Country"]: null}</Typography>
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

EarningCard.propTypes = {
  isLoading: PropTypes.bool
};

export default EarningCard;
