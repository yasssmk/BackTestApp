import { createContext, useState, useEffect} from "react";


const DashboardContext = createContext()

export default DashboardContext

export const DataProvider = ({children}) => {

    const [isLoading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [selectedOption, setSelectedOption] = useState("")
    const [hasError, setError] = useState(false)
    const [history, setHistory] = useState([])

    useEffect(() => {
        setLoading(false);
      }, []);

    const handleChange = async (event) => {
        const newQuery = event.target.value;

        setError(false);
        setSelectedOption("")

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

    const addHistory = (selectedOption) =>{
        const item =  selectedOption

        setHistory(prevHistory =>{
            const isDuplicate = prevHistory.some(option => option.id === selectedOption.id);
        
            if (!isDuplicate) {
                const newHistory = [...prevHistory,item];
                if (newHistory.length > 5) {
                    newHistory.shift()
                }
                return newHistory
            } else{
                    return history
                }
        })
                  
    }

    const runBacktest = async (symbol) => {

        setError(false);
        setLoading(true)

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
            console.log(data)
            console.log(response.status)

            if (response.status === 200){
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
        runBacktest: runBacktest,
        recommendations: recommendations,
        selectedOption: selectedOption,
        setSelectedOption: setSelectedOption,
        handleChange: handleChange,
        hasError: hasError,
        setError: setError,
        addHistory : addHistory,
        history: history 
    }

    return (

            <DashboardContext.Provider value={contextData}>
                {children}
            </DashboardContext.Provider>

    )
}