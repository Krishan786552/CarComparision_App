import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Loader = ({ open, handleClose }) => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: 100 }}
      open={open}
      onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default React.memo(Loader);