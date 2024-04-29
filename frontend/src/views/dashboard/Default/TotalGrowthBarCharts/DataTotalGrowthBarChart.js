import { useState, useEffect, useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';
import DashboardContext from "../../../../context/DashboardContext";

const DataTotalGrowthBarChart = ({ isLoading }) => {
  const { dashboardData } = useContext(DashboardContext);
  const theme = useTheme();
  const { primary } = theme.palette.text;
  const darkLight = theme.palette.dark.light;
  const grey200 = theme.palette.grey[200];
  const grey500 = theme.palette.grey[500];
  const primary200 = theme.palette.primary[200];
  const primaryDark = theme.palette.primary.dark;
  const secondaryMain = theme.palette.secondary.main;
  const secondaryLight = theme.palette.secondary.light;

  const [date, setDate] = useState([])
  const [cash, setCash] = useState([])
  const [held, setHeld] = useState([])
  const [returnYield, setReturn] = useState([])

  const newChartData = {
    height: 480,
    type: 'line',
    options: {
      chart: {
        id: 'bar-chart',
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled:true
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '50%'
        }
      },
      xaxis: {
        type: 'category',
        categories: date,
      },
      legend: {
        show: true,
        fontSize: '14px',
        fontFamily: `'Roboto', sans-serif`,
        position: 'bottom',
        offsetX: 20,
        labels: {
          useSeriesColors: false
        },
        markers: {
          width: 16,
          height: 16,
          radius: 5
        },
        itemMargin: {
          horizontal: 15,
          vertical: 8
        }
      },
      fill: {
        type: 'solid'
      },
      dataLabels: {
        enabled: false
      },
      grid: {
        show: true
      },
      colors: [secondaryMain, primary200, secondaryLight],
      xaxis: {
        labels: {
          style: {
            colors: [primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary]
          }
        }
      },
      yaxis: [
        {
          labels: {
            formatter: function (value) {
              return '$' + Math.round(value);
            },
            style: {
              colors: [primary]
            }
          }
        },
        {
          labels: {
            formatter: function (value) {
              return value + '%';
            },
            style: {
              colors: [primary]
            }
          },
          opposite: true, // align the secondary y-axis on the right side
        }
      ],
      
      grid: {
        borderColor: grey200
      },
      tooltip: {
        theme: 'dark'
      },
      legend: {
        labels: {
          colors: grey500
        }
      }
    },
    series: [
      {
        name: 'Cahs Out',
        type: 'bar',
        data: date.map((date, index) => ({ x: date, y: cash[index] })),
        yAxis: 0
      },
      {
        name: 'Asset Held',
        type: 'bar',
        data: date.map((date, index) => ({ x: date, y: held[index] })),
        yAxis: 0
      },
      {
        name: 'Returns',
        type: 'line',
        data: date.map((date, index) => ({ x: date, y: returnYield[index] })),
        yAxis: 1 
    },
    ]
  };

  useEffect(() => {
    if (dashboardData && dashboardData["Cash data"]) {
      const cashData = dashboardData["Cash data"]["Asset Sold"];
      const heldData = dashboardData["Cash data"]["Added value"];
      const dateData = dashboardData["Cash data"]["Date"];
      const returnData = dashboardData["Cash data"]["Return"]
  
      const roundedCash = cashData.map(num => Math.round(num));
      const roundedHeld = heldData.map(num => Math.round(num));
      const roundedReturn = returnData.map(num => Math.round(num))

      setDate(dateData);
      setCash(roundedCash);
      setHeld(roundedHeld);
      setReturn(roundedReturn)
    } 
    if (!isLoading) {
      ApexCharts.exec(`bar-chart`, 'updateOptions', newChartData);
    }
  }, [dashboardData, isLoading, primary200, primaryDark, secondaryMain, secondaryLight, primary, grey200, grey500]);

  return (
    <Chart {...newChartData} />
  );
};

export default DataTotalGrowthBarChart;
