import React, { useState, useEffect, useContext, useRef } from 'react';
import TextField from '@mui/material/TextField';
import DashboardContext from "../context/DashboardContext"
import PropTypes from 'prop-types';
import './DashboardComps/Dashboard.css';
import { ButtonBase,InputAdornment } from '@mui/material';
import { IconSearch } from '@tabler/icons-react';


// ==============================|| SEARCHBAR STYLE||============================== //

// ==============================|| SEARCHBAR||============================== //


  const SearchBar = ({id}) => {

    const { handleChange, recommendations, runBacktest, setSelectedOption, selectedOption, addHistory, history, isLoading  } = useContext(DashboardContext);
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
        if (recommendations.length > 0 && history.length>0){
            setShowDropdown(true);
    }
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
    
    const searchClicked = (event) => {

        if (selectedOption) {
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

      <div className="autocomplete" ref={searchBarRef} id={id}>
        <TextField
          id="search-bar"
          label="Search"
          value={inputValue}
          onChange={handleInputChange}
          onKeyUp={handleKeyDown} 
          onClick = {handleClick}
          disabled={isLoading}
          variant="outlined"
          style={{ width: '100%'}}

          InputProps={{
                startAdornment: (
                <ButtonBase onClick = {searchClicked}>
                <InputAdornment position="start">
                    <IconSearch stroke={1.5} size="1rem"/>
                </InputAdornment>
                </ButtonBase>
                ),
            }}
        />

        {(showDropdown && recommendations.length > 0) || (showDropdown &&  inputValue === "" )? (
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
 
  SearchBar.propTypes = {
    id: PropTypes.string,
  };

  export default SearchBar;