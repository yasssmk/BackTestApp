import PropTypes from 'prop-types';
import React, { useState, useEffect, useContext, useRef } from 'react';

// material-ui
import { useTheme, styled, useMediaQuery } from '@mui/material';
import { Avatar, Box, ButtonBase, Card, Grid, InputAdornment, OutlinedInput, Popper, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress'

// third-party
import PopupState, { bindPopper, bindToggle } from 'material-ui-popup-state';

// project imports
import Transitions from '../../../../ui-component/extended/Transitions';
import DashboardContext from "../../../../context/DashboardContext"

// assets
import { IconSearch, IconX } from '@tabler/icons-react';
import { shouldForwardProp } from '@mui/system';

// styles
const PopperStyle = styled(Popper, { shouldForwardProp })(({ theme }) => ({
  zIndex: 1100,
  width: '99%',
  top: '-55px !important',
  padding: '0 12px',
  [theme.breakpoints.down('sm')]: {
    padding: '0 10px'
  }
}));

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
  width: 434,
  marginLeft: 16,
  paddingLeft: 16,
  paddingRight: 16,
  '& input': {
    background: 'transparent !important',
    paddingLeft: '4px !important'
  },
  [theme.breakpoints.down('lg')]: {
    width: 250
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginLeft: 4,
    background: '#fff'
  }
}));

const HeaderAvatarStyle = styled(Avatar, { shouldForwardProp })(({ theme }) => ({
  ...theme.typography.commonAvatar,
  ...theme.typography.mediumAvatar,
  background: theme.palette.secondary.light,
  color: theme.palette.secondary.dark,
  '&:hover': {
    background: theme.palette.primary.dark,
    color: theme.palette.secondary.light
  }
}));

const SuggestionBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  width: 434,
  marginLeft: 16,
  paddingLeft: 16,
  paddingRight: 16,
  zIndex: theme.zIndex.modal + 1,
  position: 'absolute',
  marginTop: theme.spacing(1),
  '& div': {
    cursor: 'pointer',
    padding: theme.spacing(1),
    '&:hover': {
      backgroundColor: theme.palette.action.hover
    }
  },
  [theme.breakpoints.down('lg')]: {
    width: 250
  },
  [theme.breakpoints.down('md')]: {
    width: '86%',
    marginLeft: 4,
    background: '#fff'
  }
}));

//==============================|| SEARCH INPUT - MOBILE||============================== //

const MobileSearch = ({
  value,
  setValue,
  popupState,
  showDropdown,
  handleInputChange,
  handleSelectOption,
  searchClicked,
  history,
  recommendations,
  isLoading
}) => {
  const theme = useTheme();

  const handleOptionClick = (option) => {
    handleSelectOption(option);
    setValue(option.Company_Name);
  };

  return (
    <>
      <OutlineInputStyle
        id="input-search-header"
        value={value}
        onChange={handleInputChange}
        placeholder="Search"
        disabled={isLoading}
        startAdornment={
          <InputAdornment position="start">
            <ButtonBase onClick={searchClicked}>
            <Avatar
            sx={{
                    ...theme.typography.commonAvatar,
                    ...theme.typography.mediumAvatar,
                    background: theme.palette.background.paper
                    
            }}
            >
              <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
            </Avatar>
            </ButtonBase>
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <Box sx={{ ml: 2 }}>
              <ButtonBase sx={{ borderRadius: '12px' }}>
                <Avatar
                  variant="rounded"
                  sx={{
                    ...theme.typography.commonAvatar,
                    ...theme.typography.mediumAvatar,
                    background: theme.palette.orange.light,
                    color: theme.palette.orange.dark,
                    '&:hover': {
                      background: theme.palette.orange.dark,
                      color: theme.palette.orange.light,
                    },
                  }}
                  {...bindToggle(popupState)}
                >
                  <IconX stroke={1.5} size="1.3rem" />
                </Avatar>
              </ButtonBase>
            </Box>
          </InputAdornment>
        }
        aria-describedby="search-helper-text"
        inputProps={{ 'aria-label': 'weight' }}
      />
      {showDropdown && (
        <SuggestionBox>
          {value === ''
            ? history.map((option) => (
                <div key={option.id} onClick={() => handleOptionClick(option)}>
                  <Typography>
                    {option.Company_Name} ({option.Symbol})
                  </Typography>
                </div>
              ))
            : recommendations.map((option) => (
                <div key={option.id} onClick={() => handleOptionClick(option)}>
                  <Typography>
                    {option.Company_Name} ({option.Symbol})
                  </Typography>
                </div>
              ))}
        </SuggestionBox>
      )}
    </>
  );
};

MobileSearch.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
  popupState: PopupState,
  showDropdown: PropTypes.bool,
  handleInputChange: PropTypes.func,
  handleSelectOption: PropTypes.func,
  history: PropTypes.array,
  recommendations: PropTypes.array,
};

// ==============================|| SEARCH INPUT ||============================== //

const SearchSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [value, setValue] = useState('');
  const { handleChange, recommendations, runBacktest, setSelectedOption, selectedOption, addHistory, history, isLoading} =
    useContext(DashboardContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const searchBarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
    setValue(inputValue);
    handleChange(event);
    setShowDropdown(inputValue.length > 0);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && selectedOption) {
      setShowDropdown(false);
      runBacktest(selectedOption.Symbol);
    }
  };

  const searchClicked = () => {
    setShowDropdown(false)
    if (selectedOption) {
      setShowDropdown(false);
      runBacktest(selectedOption.Symbol);
    }
  };

  const handleSelectOption = (option) => {
    setInputValue(option.Company_Name);
    setSelectedOption(option);
    addHistory(option);
    setShowDropdown(false);
  };

  const handleClick = (event) =>{
    if (recommendations.length > 0 && history.length>0 && !selectedOption){
        setShowDropdown(true);
}
}


  return (
    <>
      {!isMobile && (
        <Box component="div" sx={{ display: { xs: 'none', md: 'block' } }} ref={searchBarRef}>
          <OutlineInputStyle
            id="input-search-header"
            value={inputValue}
            onChange={handleInputChange}
            onKeyUp={handleKeyDown}
            onClick = {handleClick}
            placeholder="Search"
            disabled={isLoading}
            startAdornment={
              <InputAdornment position="start">
                <ButtonBase onClick={searchClicked}>
                  <HeaderAvatarStyle variant="rounded" >
                    <IconSearch stroke={selectedOption ? 3: 1.5} size="1rem" color= {selectedOption ? theme.palette.primary.main: theme.palette.grey[500] } />
                  </HeaderAvatarStyle>
                </ButtonBase>
              </InputAdornment>
            }
            endAdornment={isLoading &&
            <InputAdornment position="end">
              <CircularProgress size="1.5 rem"/>
            </InputAdornment>
          }
            aria-describedby="search-helper-text"
            inputProps={{ 'aria-label': 'weight' }}
          />

          {showDropdown && (
            <SuggestionBox>
              {value === ''
                ? history.map((option) => (
                    <div key={option.id} onClick={() => handleSelectOption(option)}>
                      <Typography>
                        {option.Company_Name} ({option.Symbol})
                      </Typography>
                    </div>
                  ))
                : recommendations.map((option) => (
                    <div key={option.id} onClick={() => handleSelectOption(option)}>
                      <Typography>
                        {option.Company_Name} ({option.Symbol})
                      </Typography>
                    </div>
                  ))}
            </SuggestionBox>
          )}
        </Box>
      )}
      {isMobile && (
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <PopupState variant="popper" popupId="demo-popup-popper">
            {(popupState) => (
              <>
                <Box sx={{ ml: 1 }}>
                  <ButtonBase sx={{ borderRadius: '12px' }}>
                    <HeaderAvatarStyle variant="rounded" {...bindToggle(popupState)}>
                      <IconSearch stroke={1.5} size="1.2rem" />
                    </HeaderAvatarStyle>
                  </ButtonBase>
                </Box>
                <PopperStyle {...bindPopper(popupState)} transition>
                  {({ TransitionProps }) => (
                    <>
                      <Transitions type="zoom" {...TransitionProps} sx={{ transformOrigin: 'center left' }}>
                        <Card
                          sx={{
                            background: '#fff',
                            [theme.breakpoints.down('sm')]: {
                              border: 0,
                              boxShadow: 'none',
                            },
                          }}
                        >
                          <Box sx={{ p: 2 }}>
                            <Grid container alignItems="center" justifyContent="space-between" ref={searchBarRef}>
                              <Grid item xs>
                                <MobileSearch
                                  value={value}
                                  setValue={setValue}
                                  popupState={popupState}
                                  showDropdown={showDropdown}
                                  handleInputChange={handleInputChange}
                                  handleSelectOption={handleSelectOption}
                                  searchClicked = {searchClicked}
                                  history={history}
                                  recommendations={recommendations}
                                  isLoading={isLoading}
                                />
                              </Grid>
                            </Grid>
                          </Box>
                        </Card>
                      </Transitions>
                    </>
                  )}
                </PopperStyle>
              </>
            )}
          </PopupState>
        </Box>
      )}
    </>
  );
};

export default SearchSection;
