import { useContext  } from 'react';
import DashboardContext from "../../context/DashboardContext";

const StockCard = () => {

    const {isLoading, dashboardData} = useContext(DashboardContext);

    // console.log(dashboardData)
    
    if (isLoading) {
        
        return <p>Loading</p>;
    
    } else if (dashboardData) {
        
        return(
            <div>
                {dashboardData["Stock info"] ? (
                    <div>
                        <h4>Company Info</h4>
                        <p>Company: {dashboardData["Stock info"]["Company_Name"]} ({dashboardData["Stock info"]["Symbol"]})</p>
                        <p>Industry: {dashboardData["Stock info"]["Industry"]}</p>
                        <p>Country: {dashboardData["Stock info"]["Country"]}</p>
                    </div>) :(
                        <p>No Company Data</p>
                    )}
                {dashboardData["Stats"] ? (
                    <div>
                        <h4>Investment Stats</h4>
                        <p>Monthly av. growth: {dashboardData["Stats"]["Monthly average Asset growth"]}</p>
                        <p>Total money invested: {dashboardData["Stats"]["Total money invested"]}</p>
                        <p>Total money made: {dashboardData["Stats"]["Total"]}</p>
                        <p>Total net: {dashboardData["Stats"]["Total net"]} </p>
                    </div>) : (
                        <p>No Data</p>
                    )
                    }
            </div>)
}

}

export default StockCard 