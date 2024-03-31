import { useEffect, useState } from 'react';
import SearchBar from '../components/DashboardComps/Searchbar';
import ReturnCharts from '../components/DashboardComps/ReturnsChart';
import StockCard from '../components/DashboardComps/StockInfoCard';



const Dashboard = () => {

    return (

        <div> 
        <h3>It will all be there</h3>
        <SearchBar />
        <StockCard />
        <ReturnCharts />
        </div> 
    )

}

export default Dashboard

