import { useState, useEffect, useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
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
  const secondary800 = theme.palette.secondary[800]
  const smallAvatar = theme.typography.smallAvatar

  const [date, setDate] = useState([])
  const [cash, setCash] = useState([])
  const [held, setHeld] = useState([])


  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const md = useMediaQuery(theme.breakpoints.down('md'));
  const lg = useMediaQuery(theme.breakpoints.up('lg'));
  
  const tickAmount = sm ? 8 : md ? 12 : lg ? 24 : 8;
  const showLabels = dashboardData["Cash data"]? true : false

  const newChartData = {
    height: 480,
    type: 'bar',
    options: {
      chart: {
        id: 'bar-chart',
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
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
        tickAmount: tickAmount,
        labels: {
          show: showLabels, 
          style: {
            colors: secondaryMain
          }
        }
      },
      legend: {
        show: true,
        fontSize: smallAvatar.fontSize,
        fontFamily: smallAvatar.fontFamily,
        position: 'bottom',
        offsetX: 20,
        labels: {
          useSeriesColors: false,
          colors: secondaryMain
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
        show: true,
        borderColor: secondaryLight
      },
      colors: [secondaryMain, primary200, secondaryLight],
      yaxis: [
        {
          labels: {
            formatter: function (value) {
              return '$' + Math.round(value);
            },
            show: showLabels,
            style: {
              colors: secondary800
            }
          }
        },
      ],
      tooltip: {
        theme: 'dark'
      },
      legend: {
        labels: {
          colors: secondaryMain,

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
     
    ]
  };

  useEffect(() => {
    if (dashboardData && dashboardData["Cash data"]) {
      const cashData = dashboardData["Cash data"]["Asset Sold"];
      const heldData = dashboardData["Cash data"]["Added value"];
      const dateData = dashboardData["Cash data"]["Date"];
  
      const roundedCash = cashData.map(num => Math.round(num));
      const roundedHeld = heldData.map(num => Math.round(num));

      setDate(dateData);
      setCash(roundedCash);
      setHeld(roundedHeld);
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
