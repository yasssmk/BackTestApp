import { useEffect, useState } from 'react';
import SearchBar from '../components/DashboardComps/Searchbar';



const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
      setLoading(false);
    }, []);

    return (

        <div> 
        <h3>It will all be there</h3>
        <SearchBar />
        </div> 
    )

}

export default Dashboard

