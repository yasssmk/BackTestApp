import { useContext  } from 'react';
import DashboardContext from "../../context/DashboardContext";

const StockCard = () => {

    const {isLoading, selectedOption, dashboardData} = useContext(DashboardContext);


    if (isLoading) {
        
        return <p></p>;
    
    } else if (dashboardData.length > 0) {
        
        return(
            <div>
            <p>Company: {selectedOption.Company_Name} ({selectedOption.Symbol})</p>
            <p>Industry: {selectedOption.Industry}</p>
            <p>Country: {selectedOption.Country}</p>
            <p>Monthly av. growth: {dashboardData[2]["Monthly average Asset growth"]}</p>
            <p>Total money invested: {dashboardData[2]["Total money invested"]}</p>
            <p>Total money made: {dashboardData[2]["Total"]}</p>
            <p>Total net: {dashboardData[2]["Total net"]} </p>
            </div>)
}

}

export default StockCard 