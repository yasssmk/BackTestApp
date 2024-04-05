import React, { useState, useEffect, useContext, useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import DashboardContext from "../context/DashboardContext"
import './DashboardComps/Dashboard.css';
import { ErrorBoundary } from 'react-error-boundary';

  const SearchBar = () => {

    const { handleChange, recommendations, runBacktest, setSelectedOption, selectedOption, addHistory, history  } = useContext(DashboardContext);
    const [showDropdown, setShowDropdown] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const searchBarRef = useRef(null);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleClick = (event) =>{
        setShowDropdown(true);
    }

    const handleClickOutside = (event) => {
        if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
    };
  
    const handleInputChange = (event) => {

        setInputValue(event.target.value);
        handleChange(event);
        if (event.target.value.length === 0){
            setSelectedOption("")
            setShowDropdown(false);
        } else {
            setShowDropdown(true);
        }

    };
  
    const handleKeyDown = (event) => {

        if (event.key === 'Enter' && selectedOption) {
            setShowDropdown(false)
            runBacktest(selectedOption.Symbol); 
        }
      };
    
    const handleSelectOption = (option) => {
        setInputValue(option.Company_Name);
        setSelectedOption(option)
        addHistory(option) 
        setShowDropdown(false);
        }

    return (

      <div className="autocomplete" ref={searchBarRef} style={{ width: 300 }}>
        <TextField
          id="search-bar"
          label="Search..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyUp={handleKeyDown} 
          onClick = {handleClick}
          variant="outlined"
        />
        {/* {showDropdown && recommendations.length > 0 && (
          <div className="autocomplete-items">
            {recommendations.map((option) => (
              <div key={option.id} onClick={() => handleSelectOption(option)}>
                {option.Company_Name} ({option.Symbol})
              </div>
            ))}
          </div>
        )} */}
        {(showDropdown && recommendations.length > 0) || showDropdown &&  inputValue === "" ? (
        <div className="autocomplete-items">
            {inputValue === ""
                ? history.map((option) => (
                    <div key={option.id} onClick={() => handleSelectOption(option)}>
                        {option.Company_Name} ({option.Symbol})
                    </div>
                ))
                : recommendations.map((option) => (
                    <div key={option.id} onClick={() => handleSelectOption(option)}>
                        {option.Company_Name} ({option.Symbol})
                    </div>
                ))}
        </div>
    ) : null}
      </div>
    );
  };
 
  
  export default SearchBar;