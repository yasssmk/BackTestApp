import { useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, Grid, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';


const chartData = {
  type: 'area',
  height: 95,
  options: {
    chart: {
      id: 'support-chart',
      sparkline: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 1
    },
    tooltip: {
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      y: {
        title: 'Ticket '
      },
      marker: {
        show: false
      }
    }
  },
  
};

// ===========================|| DASHBOARD DEFAULT - BAJAJ AREA CHART CARD ||=========================== //

const BajajAreaChartCard = ({ data, name }) => {
  const theme = useTheme();

  const orangeDark = theme.palette.secondary[800];

  const newSupportChart = {
    type: 'area',
    height: 95,
    options: {
    chart: {
      id: 'support-chart',
      sparkline: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 1
    },
    tooltip: {
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      y: {
        title: 'Ticket '
      },
      marker: {
        show: false
      }
    }
  },
    colors: [orangeDark],
    
    series: [
        {
          data: data
        }
      ],
    tooltip: {
        theme: 'light',
        custom: function({ series, seriesIndex, dataPointIndex, w }) {
          return (
            '<div class="arrow_box">' +
            "<Typography >" +
            "Return: " +
            '<strong>' +
            series[seriesIndex][dataPointIndex] +
            '%</strong>' +
            "</Typography >" +
            "</div>"
          );
        }
      },
    };

  useEffect(() => {

    ApexCharts.exec(`support-chart`, 'updateOptions', newSupportChart);
    
  }, [data, orangeDark]);

  return (
    <Card sx={{ bgcolor: 'secondary.light' }}>
      <Grid container sx={{ p: 2, pb: 0, color: '#fff' }}>
        <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography sx={{ ...theme.typography.body1, color: theme.palette.secondary[800], fontWeight:'bold'}}>
              {name}
            </Typography>
            </Grid>
              <Grid >
                <Typography sx={{...theme.typography.body1, color: theme.palette.secondary[800], fontWeight:'bold'}}>
                  ROI  : {data.length > 0 ? `${data[data.length - 1]}%` : '-'}
                </Typography>
              </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Chart {...newSupportChart} />
    </Card>
  );
};

export default BajajAreaChartCard;
