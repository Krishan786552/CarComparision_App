import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Outlet, useLocation } from 'react-router-dom';
import AppSaga from './AppSaga';
import { fetchData } from './AppSlice';
import useInjectSaga from '../../hooks/useInjectSaga';
import NavBar from '../navbar';
import Loader from './loader/Loader';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Lato'
    },
    // body1: {
    //   fontWeight: 600
    // }
  },
  palette: {
    primary: {
      main: 'rgb(229, 48, 18)'
    }
  }
})

const App = () => {
  useInjectSaga('app', AppSaga);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <>
      <Loader />
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex' }}>
          <NavBar />
          {/* <Loader open={true} handleClose={() => {}}/> */}
          {/* <Box component='main' sx={{ p: 3 }} style={{ background: location.pathname === '/' ? '#C0C0C0' : location.pathname.includes('compare-cars') ? 'white' : '#BEBEBE', width: '100%' }}> */}
          <Box component='main' sx={{ p: 3, width: '100%' }}>
            <Toolbar />
            {/* <Loader open={true} handleClose={() => {}}/> */}
            {/* <Outlet/> */}
            <Outlet />
          </Box>
        </Box>
      </ThemeProvider>
    </>
  )
}

export default App