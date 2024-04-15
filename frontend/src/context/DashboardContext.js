import { createContext, useState, useEffect} from "react";
import { useNavigate,  useLocation  } from 'react-router-dom';


const DashboardContext = createContext()


export default DashboardContext

export const DataProvider = ({children}) => {

    const [isLoading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [selectedOption, setSelectedOption] = useState("")
    const [hasError, setError] = useState(false)
    const [history, setHistory] = useState([])

    const navigate = useNavigate()
    const location = useLocation()


    useEffect(() => {
        setLoading(false);
      }, []);

    
    const clearStates = () => {
        setDashboardData([]);
        setHistory([])
        setRecommendations([])
        setSelectedOption([])
    }; 

    
    const getStockList = async() =>{

        try{
            const response = await fetch('http://localhost:8000/dashboard/reco', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        // body: JSON.stringify({ search_query: newQuery })
                    });

            const data = await response.json();

            if (response.ok){
                return data
            } else {
                setRecommendations([])
            }
        } catch {
            setError(true)
        }
    }

    const handleChange = async (event) => {
        const newQuery = event.target.value;
    
        setError(false);
        setSelectedOption("");
        if (newQuery.trim() !== '') {
            try {
                const stockList = await getStockList()
                const recommendations = stockList.filter(item =>
                    item.Symbol.startsWith(newQuery.toUpperCase()) ||
                    item.Company_Name.toLowerCase().startsWith(newQuery.toLowerCase())
                ).slice(0, 5);
                setRecommendations(recommendations);
            } catch (error) {
                setRecommendations([]);
                setError(true);
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
                    const symbolToRemove = newHistory[0].Symbol; 
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

        if (navigate && location !== '/dashboard') {
            navigate('/dashboard');
        }

        try {

            // let data;
            // const localStorageData = localStorage.getItem(symbol)
            
            // if (localStorageData){
            //     data = JSON.parse(localStorageData);
            //     setDashboardData(data)
            //     setLoading(false)
            // } else {

            const response = await fetch('http://localhost:8000/dashboard/rundashboard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ Symbol: symbol })
            });

            const data = await response.json();

            if (response.status === 200){
                // localStorage.setItem(symbol, JSON.stringify(data))
                setDashboardData(data)

            } else {
                setError(true)
                setDashboardData([])

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
        history: history,
        clearStates: clearStates
    }

    return (

            <DashboardContext.Provider value={contextData}>
                {children}
            </DashboardContext.Provider>

    )
}