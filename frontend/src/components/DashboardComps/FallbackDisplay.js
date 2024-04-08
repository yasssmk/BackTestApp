import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';


const FallbackDisplay = () =>{

     return (
        <Stack sx={{ width: '100%' }} spacing={2} alignItems="center" justifyContent="center" mt={4}>
            <Alert severity="error" variant="outlined">
                <AlertTitle>Error</AlertTitle>
                Something went wrong!
            </Alert>
        </Stack>
    )

}

export default FallbackDisplay