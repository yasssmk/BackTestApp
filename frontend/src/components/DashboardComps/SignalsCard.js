import { useContext, useEffect  } from 'react';
import DashboardContext from "../../context/DashboardContext";
import { DataGrid } from '@mui/x-data-grid';

const SignalsCard = () => {

    const {isLoading, dashboardData, setError} = useContext(DashboardContext);

    if (isLoading) {
        
        return <p></p>
    
    } else if (dashboardData["Investissement data"]) {

        try{

            let data = dashboardData["Investissement data"]

            const columns = [
                { field: 'id', headerName: 'ID', width: 70 },
                { field: 'symbol', headerName: 'Symbol', width: 130 },
                { field: 'buyingDate', headerName: 'Buying Date', width: 150 },
                { field: 'buyingPrice', headerName: 'Buying Price', width: 150 },
                { field: 'sellingDate', headerName: 'Selling Date', width: 150 },
                { field: 'sellingPrice', headerName: 'Selling Price', width: 150 },
                { field: 'profitLoss', headerName: 'Profit/Loss ($)', width: 180 },
                { field: 'yieldPercentage', headerName: 'Yield (%)', width: 150 },
            ];

            const rows = Object.keys(data.Symbol).map(index => ({
                id: parseInt(index) + 1,
                symbol: data.Symbol[index],
                buyingDate: data['Buying Date'][index],
                buyingPrice: data['Buying Price'][index],
                sellingDate: data['Selling Date'][index],
                sellingPrice: data['Selling Price'][index],
                profitLoss: data['Profit/Loss ($)'][index],
                yieldPercentage: data['Yield (%)'][index],
            }));

            
            return(
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid rows={rows} columns={columns} pageSize={5} />
                </div>
            )
        } catch{
            setError(true)
        }
}

}

export default SignalsCard 