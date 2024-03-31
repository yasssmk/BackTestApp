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
        const valueHeld = dashboardData[1]["Added value"];
        const cashOut = dashboardData[1]["Asset Sold"];

        const lineData = dates.map((date, index) => ({ x: date, y: returns[index] }));
        const assetHeldData = dates.map((date, index) => ({ x: date, y: valueHeld[index] }));
        const cashOutData = dates.map((date, index) => ({ x: date, y: cashOut[index] }));

        const chartOptions = {
            chart: {
                id: 'basic-bar',
            },
            xaxis: {
                type: 'category',
                categories: dates,
            },
            yaxis: [
                {
                    title: {
                        text: 'Returns',
                    },
                },
                {
                    opposite: true,
                    title: {
                        text: 'Value Held / Cash Out',
                    },
                },
            ],
        };

        const series = [
            {
                name: 'Returns',
                type: 'line',
                data: lineData,
                yAxis: 0, // Use the first y-axis
            },
            {
                name: 'Value Held',
                type: 'bar',
                data: assetHeldData,
                yAxis: 1, // Use the second y-axis
            },
            {
                name: 'Cash Out',
                type: 'bar',
                data: cashOutData,
                yAxis: 1, // Use the second y-axis
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