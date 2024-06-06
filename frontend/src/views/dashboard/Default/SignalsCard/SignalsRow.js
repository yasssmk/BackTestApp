import { useTheme } from '@mui/material/styles';
import { Avatar, Divider, Grid, Typography } from '@mui/material';

import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';


const SignalRow = ({ buyingDate, sellingDate, buyingPrice, sellingPrice, profit, transactionYield }) => {
    const theme = useTheme();

    const ArrowAvatar = (profit) => {
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

            <Divider sx={{ my: 1.5}} />
            <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <Grid items >
                <Grid container direction="column" justifyContent="flex-start" alignItems="center" >
                    <Grid item>
                        <Typography sx={{ ...theme.typography.body1, color: theme.palette.secondary.main }}>
                            
                            $ {buyingPrice}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography sx={{ ...theme.typography.subtitle2, color: theme.palette.secondary[800] }}>
                            {buyingDate}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid items >
                <Grid container direction="column" justifyContent="flex-start" alignItems="center">

                    <Grid item>
                        <Typography sx={{ ...theme.typography.body1, color: theme.palette.secondary.main }}>
                            $ {sellingPrice}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography sx={{ ...theme.typography.subtitle2, color: theme.palette.secondary[800] }}>
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
                                <Typography sx={{ ...theme.typography.body1, color: theme.palette.secondary.main }}>
                                $ {profit}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography sx={{ ...theme.typography.subtitle2, color: theme.palette.secondary[800]}}>
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