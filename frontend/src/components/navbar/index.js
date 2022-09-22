import React, { useMemo } from 'react';
import AppBar from '@mui/material/AppBar';
import styled from 'styled-components';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';

const StyledAppBar = styled(AppBar)`
  background: #fff;
`;

const NavBar = () => {
  const navigate = useNavigate();

  // to navigate to compare page
  const navigateToComparePage = useMemo(() => () => {
    navigate('/cars/compare-cars');
  }, []);

  return (
    <StyledAppBar component="nav">
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <Link to='/'>
          <img src="https://imgd.aeplcdn.com/0x0/cw/static/icons/new-header/logo.svg" alt="CarWale" title="CarWale" width="136" />
        </Link>
        <Button variant='contained' color='primary' onClick={navigateToComparePage}>Compare Cars</Button>
      </Toolbar>
    </StyledAppBar>
  )
}

export default NavBar