import React, { useMemo } from 'react';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';

const Feedback = ({ feedback, onRemove }) => {

  // to remove the feedback
  const closeIconClickHandler = useMemo(() => () => {
    onRemove(feedback?.key);
  }, [feedback?.key]);

  return (
    <>
      <Grid container item xs={12} flexDirection={"column"} style={{ paddingTop: 0, background: 'rgb(229,48,18)', padding: '9px', borderRadius: '7px' }} justifyContent={"space-evenly"} key={feedback?.key}>
        <Grid item style={{ display: 'flex', justifyContent: "space-between" }}>
          <Typography variant='h5' mb={"3px"} sx={{ fontWeight: 700 }}>{feedback?.title}</Typography>
          <CloseIcon fontSize='small' onClick={closeIconClickHandler} />
        </Grid>
        <Grid item>
          <Typography variant='subtitle1' sx={{ lineHeight: '1.1rem' }}>{feedback?.subtitle}</Typography>
        </Grid>
        <Grid container item mt={2.5} style={{ color: '#fff' }}>
          <Typography variant='body2' sx={{ fontWeight: 500 }}>{feedback?.name}</Typography>
          <Typography variant='caption' marginLeft={2.5}>({feedback?.email})</Typography>
        </Grid>
      </Grid>
      <Divider light sx={{ borderColor: '#000', margin: '8px 0' }} variant={"fullWidth"} />
    </>
  )
}

const arePropsEqual = (prev, next) => {
  console.log(prev, next);
  return prev?.feedback?.key === next?.feedback?.key;
}

export default React.memo(Feedback, arePropsEqual);