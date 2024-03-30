import { useContext  } from 'react';
import DashboardContext from "../../context/DashboardContext";

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';


const ReturnCharts = () => {

    const {isLoading,dashboardData} = useContext(DashboardContext);


    if (isLoading) {
        
        return <p>Loading...</p>;

    } else if (dashboardData.length > 0) {

        const dates = dashboardData[1]["Date"];
        const returns = dashboardData[1]["Return"];


        const chartData = dates.map((date, index) => ({
            x: date, // Date as x-axis
            y: returns[index] // Return as y-axis
        }));

        const chartOptions = {
            chart: {
                id: 'basic-bar',
            },
            xaxis: {
                type: 'category',
                categories: dates, // Dates for x-axis
            },
        };

        const series = [
            {
                name: 'Returns',
                data: chartData, // Chart data array
            },
        ];

        return (
            <div>
                <Chart options={chartOptions} series={series} type="line" width = {1000} height={350} />
            </div>
        );
    } else {
        return <p>No data available.</p>;
    }

}

export default ReturnCharts;