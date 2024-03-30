import { createContext, useState, useEffect} from "react";

const DashboardContext = createContext()

export default DashboardContext

export const DataProvider = ({children}) => {

    const [isLoading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState([]);
    const [query, setQuery] = useState('');
    const [recommendations, setRecommendations] = useState([]);   

    useEffect(() => {
        setLoading(false);
      }, []);

    const handleChange = async (event) => {
        const newQuery = event.target.value;
        setQuery(newQuery);
        if (newQuery.trim() !== '') {
            try {
                const response = await fetch('http://localhost:8000/dashboard/reco', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ search_query: newQuery })
                });
                const data = await response.json();
                if (response.status === 200) {
                    const firstFiveRecommendations = data.slice(0, 5);
                    setRecommendations(firstFiveRecommendations);
                } else {
                    setRecommendations([]);
                }
            } catch (error) {
                setRecommendations([]);
                console.error('Error fetching recommendations:', error);
            }
        }
    };

    const runBacktest = async (symbol) => {
        try {

            let data;
            const localStorageData = localStorage.getItem(symbol)
            
            if (localStorageData){
                data = JSON.parse(localStorageData);
                setDashboardData(data)
                setLoading(false)
            } else {

            const response = await fetch('http://localhost:8000/dashboard/rundashboard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ Symbol: symbol })
            });

            const data = await response.json();
            localStorage.setItem(symbol, JSON.stringify(data))
            setDashboardData(data)
            setLoading(false)
        }

        } catch (error) {
            setLoading(false)
            console.error('Error running backtest:', error);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {

            if (recommendations.length > 0 && query.trim() !== '') {
                const selectedOption = recommendations.find(option => option.Company_Name.toLowerCase() === query.toLowerCase());
                if (selectedOption) {
                    setLoading(true) 
                    runBacktest(selectedOption.Symbol);
                }
            }
        }
    };


    let contextData = {
        isLoading: isLoading,
        setLoading: setLoading,
        dashboardData: dashboardData,
        handleKeyDown: handleKeyDown,
        runBacktest: runBacktest,
        setQuery:setQuery,
        query: query,
        recommendations: recommendations,
        handleChange: handleChange

    }

    return (
        <DashboardContext.Provider value={contextData}>
            {children}
        </DashboardContext.Provider>
    )
}