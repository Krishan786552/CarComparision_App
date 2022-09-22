import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import CarCard from '../car-card';
import { getCarsLists } from './CarListSelectors';

const CarsList = () => {
  const data = useSelector(getCarsLists);

  const content = data.map((carInfo) => <CarCard carInfo={carInfo} key={carInfo.id} />);

  return data.length > 0 && <Grid container spacing={3}>{content}</Grid>
}

export default CarsList;