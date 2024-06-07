import PropTypes from 'prop-types';
import { useState, useContext, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, CardContent, Grid, Typography } from '@mui/material';

// project imports
import ReturnChartCard from './ReturnChartCard';
import MainCard from '../../../../ui-component/cards/MainCard'
import SkeletonPopularCard from '../../../../ui-component/cards/Skeleton/PopularCard';
import DashboardContext from '../../../../context/DashboardContext';
import SignalRow from './SignalsRow';


// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const gridSpacing = 2

const PopularCard = ({ isLoading }) => {  
  const theme = useTheme();
  const { dashboardData } = useContext(DashboardContext);

  const [buyingDates, setBuyingDates] = useState([])
  const [sellingDates, setSellingDates] = useState([])
  const [buyingPrices, setBuyingPrices] = useState([])
  const [sellingPrices, setSellingPrices] = useState([])
  const [profits, setProfts] = useState([])
  const [returnYield, setReturn] = useState([])
  const [returnTotalYield, setTotalReturn] = useState([])
  const [compnayName, setName] = useState('')

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

      const returnData = dashboardData["Cash data"]["Return"]
      const roundedReturn = returnData.map(num => Math.round(num))

      const dataName = dashboardData['Stock info']['Company_Name']
  

      setBuyingDates(dataBuyingDates);
      setSellingDates(dataSellingDates);
      setBuyingPrices(dataBuyingPrices);
      setSellingPrices(dataSellingPrices);
      setProfts(dataProfits);
      setReturn(dataReturnYield);
      setTotalReturn(roundedReturn)
      setName(dataName)
    } else{
      setBuyingDates([]);
      setSellingDates([]);
      setBuyingPrices([]);
      setSellingPrices([]);
      setProfts([]);
      setReturn([]);
      setTotalReturn([])
      setName("") 
    }
  }, [dashboardData]);


  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (

        <MainCard content={false} sx = {{height:'100%'}}>
          <CardContent>
          <Box  component="div" sx={{ height: '530px', overflow: "auto", overflowY: "scroll", pr: 1}}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid container alignContent="center" justifyContent="space-between">
                  <Grid item>
                    <Typography sx={{...theme.typography.h2, color: theme.palette.secondary[800]}}>Transactions Signals</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ pt: '16px !important' }}>
                <ReturnChartCard data={returnTotalYield} name={compnayName} />
              </Grid>
              <Grid item xs={12}>
                <Grid item>
                  <Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <Grid items justifyContent="flex-start" alignItems="center" >
                            <Typography sx={{ ...theme.typography.body1, color: theme.palette.secondary.main, fontWeight: 'bold' }}> 
                                Buy
                            </Typography>
                    </Grid>
                    <Grid items >
                            <Typography sx={{ ...theme.typography.body1, color: theme.palette.secondary.main, fontWeight: 'bold' }}> 
                                Sell
                            </Typography>
                    </Grid>
                    <Grid items >
                            <Typography sx={{ ...theme.typography.body1, color: theme.palette.secondary.main, fontWeight: 'bold' }}> 
                                Return
                            </Typography>
                    </Grid>
                    <Grid items >
                            <Typography sx={{ ...theme.typography.body1, color: theme.palette.secondary.main }}> 
                                
                            </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
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
            </Grid></Box>
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
