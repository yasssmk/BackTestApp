import { useContext  } from 'react';
import DashboardContext from "../../context/DashboardContext";
import EarningCard from "./skeleton/infoCards"
import {Card, Grid } from '@mui/material'

const StockCard = () => {

    const {dashboardData, setError} = useContext(DashboardContext);

    
    if (dashboardData) {

        try{
        
            return(
                <Grid justifyContent="center" alignItems="stretch">
                    <Grid item xs={12} sm={6} sx={{ flexBasis: '50%' }}>
                        {dashboardData["Stock info"] ? (
                            <Card>
                                <h4>Company Info</h4>
                                <p>Company: {dashboardData["Stock info"]["Company_Name"]} ({dashboardData["Stock info"]["Symbol"]})</p>
                                <p>Industry: {dashboardData["Stock info"]["Industry"]}</p>
                                <p>Country: {dashboardData["Stock info"]["Country"]}</p>
                            {/* <p>{Yacine}</p> error to catch */}
                            </Card>) :(
                                <EarningCard />
                            )}
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ flexBasis: '50%' }}>
                        {dashboardData["Stats"] ? (
                            <Card>
                                <h4>Investment Stats</h4>
                                <p>Monthly av. growth: {dashboardData["Stats"]["Monthly average Asset growth"]}</p>
                                <p>Total money invested: {dashboardData["Stats"]["Total money invested"]}</p>
                                <p>Total money made: {dashboardData["Stats"]["Total"]}</p>
                                <p>Total net: {dashboardData["Stats"]["Total net"]} </p>
                            </Card>) : (

                                <EarningCard />
                            
                            )
                            }
                    </Grid>
                </Grid>);
        
        } catch (error){
            console.log(error)
            setError(true)
        }
}

}

export default StockCard 