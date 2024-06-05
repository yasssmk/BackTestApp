// material-ui
import { Card, CardContent, Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';


// ==============================|| SKELETON - POPULAR CARD ||============================== //
const gridSpacing = 2

const PopularCard = () => (
  <Card>
    <CardContent>
      <Grid container spacing={gridSpacing} sx={{height:'550px'}}>
        <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
            <Grid item xs zeroMinWidth>
              <Skeleton variant="rectangular" height={20} />
            </Grid>
            <Grid item>
              <Skeleton variant="rectangular" height={20} width={20} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant="rectangular" height={115} />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Grid container alignItems="center" spacing={12} justifyContent="space-between">
                <Grid item xs={6}>
                  <Skeleton variant="rectangular" height={20} />
                </Grid>
                <Grid item xs={6}>
                  <Grid container alignItems="center" spacing={12} justifyContent="space-between">
                    <Grid item xs zeroMinWidth>
                      <Skeleton variant="rectangular" height={20} />
                    </Grid>
                    <Grid item>
                      <Skeleton variant="rectangular" height={16} width={16} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Skeleton variant="rectangular" height={20} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                <Grid item xs={6}>
                  <Skeleton variant="rectangular" height={20} />
                </Grid>
                <Grid item xs={6}>
                  <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                    <Grid item xs zeroMinWidth>
                      <Skeleton variant="rectangular" height={20} />
                    </Grid>
                    <Grid item>
                      <Skeleton variant="rectangular" height={16} width={16} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Skeleton variant="rectangular" height={20} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                <Grid item xs={6}>
                  <Skeleton variant="rectangular" height={20} />
                </Grid>
                <Grid item xs={6}>
                  <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                    <Grid item xs zeroMinWidth>
                      <Skeleton variant="rectangular" height={20} />
                    </Grid>
                    <Grid item>
                      <Skeleton variant="rectangular" height={16} width={16} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Skeleton variant="rectangular" height={20} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                <Grid item xs={6}>
                  <Skeleton variant="rectangular" height={20} />
                </Grid>
                <Grid item xs={6}>
                  <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                    <Grid item xs zeroMinWidth>
                      <Skeleton variant="rectangular" height={20} />
                    </Grid>
                    <Grid item>
                      <Skeleton variant="rectangular" height={16} width={16} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Skeleton variant="rectangular" height={20} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default PopularCard;
