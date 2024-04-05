import { useContext  } from 'react';
import DashboardContext from "../../context/DashboardContext";

// third-party
import Chart from 'react-apexcharts';


const ReturnCharts = () => {

    const {isLoading,dashboardData, setError} = useContext(DashboardContext);


    // if (isLoading) {

    //     return <p>Loading...</p>;

    // } else if 
    
    if (dashboardData["Cash data"]) {

        try{

            const dates = dashboardData["Cash data"]["Date"];
            const returns = dashboardData["Cash data"]["Return"];
            const valueHeld = dashboardData["Cash data"]["Added value"];
            const cashOut = dashboardData["Cash data"]["Asset Sold"];

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
    } catch (error){
        console.log(error)
        setError(true)
    }
    } else {
        return <p>No data available.</p>;
    }

}

export default ReturnCharts;