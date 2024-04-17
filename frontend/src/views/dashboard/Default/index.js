import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';


// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
