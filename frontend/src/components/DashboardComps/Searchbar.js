import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [recommendations, setRecommendations] = useState([]);
  
    
    const handleSearch = async (searchQuery) => {
        try {
            const response = await fetch('http://localhost:8000/dashboard/reco', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ search_query: searchQuery })
            });
    
            const data = await response.json();

            if (response.status === 200) {
                const firstFiveRecommendations = data.slice(0, 5);
                setRecommendations(firstFiveRecommendations);

            } else {
                setRecommendations([]);

            }

        } catch (error) {
            setRecommendations([])
            // console.error('Error fetching recommendations:', error);
        }
        };
  
    const handleChange = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        if (newQuery.trim() !== '') {
            handleSearch(newQuery);
        } else {
            setRecommendations([]);
        }
    };

    // useEffect(() => {
    //     console.log(recommendations); // Log recommendations state
    // }, [recommendations]);


    return (

        <Autocomplete
            id="search-bar"
            sx={{ width: 300 }}
            freeSolo
            disableClearable
            options={recommendations}
            autoHighlight
            getOptionLabel={(option) => `${option.Company_Name} (${option.Symbol})`} // Combine Company_Name and Symbol
            filterOptions={(options, { inputValue }) =>
                options.filter(
                    (option) =>
                        option.Company_Name.toLowerCase().includes(inputValue.toLowerCase()) ||
                        option.Symbol.toLowerCase().includes(inputValue.toLowerCase())
                )
            }
            onChange={(event, newValue) => {
                setQuery(newValue ? newValue.Company_Name : '');
            }}
            inputValue={query}
            onInputChange={(event, newInputValue) => {
                setQuery(newInputValue);
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Search..."
                    onChange={handleChange}
                />
            )}
            renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    {option.Company_Name} ({option.Symbol})
                </Box>
            )}
        />
    );
  };
  
  export default SearchBar;