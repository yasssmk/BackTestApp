import PropTypes from 'prop-types';
import { useState, useContext, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Button, CardActions, CardContent, Divider, Grid, Menu, MenuItem, Typography } from '@mui/material';

// project imports
import BajajAreaChartCard from './BajajAreaChartCard';
import MainCard from '../../../../ui-component/cards/MainCard'
import SkeletonPopularCard from '../../../../ui-component/cards/Skeleton/PopularCard';
import DashboardContext from '../../../../context/DashboardContext';
import SignalRow from './SignalsRow';


// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const gridSpacing = 2

const PopularCard = ({ isLoading }) => {
  const theme = useTheme();
  const { dashboardData } = useContext(DashboardContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const [buyingDates, setBuyingDates] = useState([])
  const [sellingDates, setSellingDates] = useState([])
  const [buyingPrices, setBuyingPrices] = useState([])
  const [sellingPrices, setSellingPrices] = useState([])
  const [profits, setProfts] = useState(['0'])
  const [returnYield, setReturn] = useState(['%0'])

  useEffect(() => {
    if (dashboardData && dashboardData["Investissement data"]) {
      const investissementData = dashboardData["Investissement data"];
      const dataBuyingDates = investissementData["Buying Date"].map(date => {
        const formattedDate = new Date(date).toLocaleDateString('en-GB');
        const [dd, mm, yy] = formattedDate.split('/');
        return `${dd.padStart(2, '0')}/${mm.padStart(2, '0')}/${yy.slice(-2)}`;
      });
      const dataSellingDates = investissementData["Selling Date"].map(date => {
        const formattedDate = new Date(date).toLocaleDateString('en-GB');
        const [dd, mm, yy] = formattedDate.split('/');
        return `${dd.padStart(2, '0')}/${mm.padStart(2, '0')}/${yy.slice(-2)}`;
      });
      const dataBuyingPrices = investissementData["Buying Price"].map(price => parseFloat(price).toFixed(2));
      const dataSellingPrices = investissementData["Selling Price"].map(price => parseFloat(price).toFixed(2));
      const dataProfits = investissementData["Profit/Loss ($)"].map(profit => {
        const numericProfit = parseFloat(profit);
        return Number.isNaN(numericProfit) ? 0 : parseFloat(numericProfit.toFixed(2));
      });
      const dataReturnYield = investissementData["Yield (%)"].map(Datayield => Math.round(parseFloat(Datayield)));
  
      // Set the state with the formatted data
      setBuyingDates(dataBuyingDates);
      setSellingDates(dataSellingDates);
      setBuyingPrices(dataBuyingPrices);
      setSellingPrices(dataSellingPrices);
      setProfts(dataProfits);
      setReturn(dataReturnYield);
    }
  }, [dashboardData]);



  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          <CardContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid container alignContent="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h4">Buying/Selling Signals</Typography>
                  </Grid>
                  <Grid item>
                    <MoreHorizOutlinedIcon
                      fontSize="small"
                      sx={{
                        color: theme.palette.primary[200],
                        cursor: 'pointer'
                      }}
                      aria-controls="menu-popular-card"
                      aria-haspopup="true"
                      onClick={handleClick}
                    />
                    <Menu
                      id="menu-popular-card"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      variant="selectedMenu"
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                    >
                      <MenuItem onClick={handleClose}> Today</MenuItem>
                      <MenuItem onClick={handleClose}> This Month</MenuItem>
                      <MenuItem onClick={handleClose}> This Year </MenuItem>
                    </Menu>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ pt: '16px !important' }}>
                <BajajAreaChartCard />
              </Grid>
              <Grid item xs={12}>
                {buyingDates.map((date, index) => (
                  <SignalRow
                    key={index}
                    buyingDate={date}
                    sellingDate={sellingDates[index]}
                    buyingPrice={buyingPrices[index]}
                    sellingPrice={sellingPrices[index]}
                    profit={profits[index]}
                    transactionYield={returnYield[index]}
                  />
                ))}
              </Grid>
            </Grid>
          </CardContent>

        </MainCard>
      )}
    </>
  );
};

PopularCard.propTypes = {
  isLoading: PropTypes.bool
};

export default PopularCard;
