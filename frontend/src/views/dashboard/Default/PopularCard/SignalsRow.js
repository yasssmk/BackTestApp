import { useEffect, useContext } from 'react';

import { useTheme } from '@mui/material/styles';
import { Avatar, Button, CardActions, CardContent, Divider, Grid, Menu, MenuItem, Typography } from '@mui/material';

import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';


const SignalRow = ({ buyingDate, sellingDate, buyingPrice, sellingPrice, profit, transactionYield }) => {
    const theme = useTheme();

    const ArrowAvatar = (profit) => {
        // Extracting the profit value
        const profitValue = profit.profit;    
      
        if (profitValue > 0) {
          return (
            <>
              <Avatar
                variant="rounded"
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: '5px',
                  backgroundColor: theme.palette.success.light,
                  color: theme.palette.success.dark,
                  ml: 2
                }}
              >
                <KeyboardArrowUpOutlinedIcon fontSize="small" color="inherit" />
              </Avatar>
            </>
          );
        } else {
          return (
            <>
              <Avatar
                variant="rounded"
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: '5px',
                  backgroundColor: theme.palette.orange.light,
                  color: theme.palette.orange.dark,
                  ml: 2
                }}
              >
                <KeyboardArrowDownOutlinedIcon  fontSize="small" color="inherit" />
              </Avatar>
            </>
          );
        }
      }
 

    return (
        <>

            <Divider sx={{ my: 1.5 }} />
            <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <Grid items >
                <Grid container direction="column" justifyContent="flex-start" alignItems="center" >
                    <Grid item>
                        <Typography variant="subtitle1" color="inherit">
                            
                            $ {buyingPrice}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle2" sx={{ color: theme.palette.secondary.dark }}>
                            {buyingDate}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid items >
                <Grid container direction="column" justifyContent="flex-start" alignItems="center">
                    <Grid item>
                        <Typography variant="subtitle1" color="inherit">
                            $ {sellingPrice}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle2" sx={{ color: theme.palette.secondary.dark }}>
                            {sellingDate}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item >
                <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                    <Grid item>
                        <Grid container direction="row" justifyContent="center" alignItems="center">
                            <Grid item>
                                <Typography variant="subtitle1" color="inherit">
                                $ {profit}
                                </Typography>
                            </Grid>
                            {/* <Grid item>
                                <ArrowAvatar profit={profit} />
                            </Grid> */}
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle2" sx={{ color: theme.palette.secondary.dark }}>
                            {transactionYield}%
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item justifyContent='flex-end' >
            <ArrowAvatar profit={profit} />
            </Grid>
            </Grid>
            </>
    )
}

export default SignalRow