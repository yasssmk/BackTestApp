import { createContext, useState, useEffect} from "react";


const DashboardContext = createContext()

export default DashboardContext

export const DataProvider = ({children}) => {

    const [isLoading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState([]);
    const [query, setQuery] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [selectedOption, setSelectedOption] = useState("")
    const [hasError, setError] = useState(false)  

    useEffect(() => {
        setLoading(false);
      }, []);

    useEffect(() => {
        setError(false);
      }, [selectedOption]);


    const handleChange = async (event) => {
        const newQuery = event.target.value;
       
        // setQuery(newQuery)

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
                setRecommendations([]);;
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

            if (data.response === 200){
                localStorage.setItem(symbol, JSON.stringify(data))
                setDashboardData(data)

            } else {
                setError(true)
                setDashboardData([])

            }
        }

        } catch (error) {
            setError(true)
            setLoading(false)
            setDashboardData([])
            console.error('Error running backtest:', error);
        } finally{
            setLoading(false)
        }
    };


    let contextData = {
        isLoading: isLoading,
        setLoading: setLoading,
        dashboardData: dashboardData,
        // handleKeyDown: handleKeyDown,
        runBacktest: runBacktest,
        // setQuery:setQuery,
        // query: query,
        recommendations: recommendations,
        selectedOption: selectedOption,
        setSelectedOption: setSelectedOption,
        handleChange: handleChange,
        hasError: hasError
    }

    return (

            <DashboardContext.Provider value={contextData}>
                {children}
            </DashboardContext.Provider>

    )
}