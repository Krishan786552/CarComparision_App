import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// toast compenet to show the warning msgs
const Toast = ({open, handleClose, msg}) => {
  return (
    <Snackbar open={open} autoHideDuration={30000} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
      <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
        {msg}
      </Alert>
    </Snackbar>
  )
}

export default Toast