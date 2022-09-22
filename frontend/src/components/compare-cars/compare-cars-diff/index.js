import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import QuickCompareSpec from './quick-compare';
import Features from './features-and-specs';

const CompareCarDiff = () => {
  return (
    <Grid container flexDirection={"column"} style={{ marginTop: 10 }}>
      <QuickCompareSpec />
      <Features />
    </Grid>
  )
}

export default CompareCarDiff;