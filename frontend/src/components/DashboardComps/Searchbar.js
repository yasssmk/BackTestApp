import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import DashboardContext from "../../context/DashboardContext"

const SearchBar = () => {

    const {isLoading, handleKeyDown, setLoading, query, recommendations, handleChange,setQuery} = useContext(DashboardContext);

    return (

        isLoading ? (
            <p>loading...</p> 
        ) : (
        <Autocomplete
            id="search-bar"
            sx={{ width: 300 }}
            freeSolo
            disableClearable
            options={recommendations}
            autoHighlight
            getOptionLabel={(option) => `${option.Company_Name}`}
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
                    onKeyDown={(event) => {
                        handleKeyDown(event);
                    }}
                />
            )}
            renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    {option.Company_Name} ({option.Symbol})
                </Box>
            )}
        />
    )

    );
}
  
  export default SearchBar;