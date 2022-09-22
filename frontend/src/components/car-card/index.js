import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
// import CardActions from '@mui/material/CardActions';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const CarCard = ({ carInfo }) => {
  const navigate = useNavigate();
  const { id, name, image, price } = carInfo;

  // to check the details ofa particular car based on its id
  const navigateToCarDetailsPage = () => {
    navigate(`/${name.replace(/\s+/g, '-')}`, { state: { id } });
  }

  return (
    <Grid item xs={12} sm={6} lg={3} key={id}>
      <Card style={{ height: '100%' }} elevation={3}>
        <CardActionArea onClick={navigateToCarDetailsPage}>
          <CardMedia
            component="img"
            height="194"
            sx={{ objectFit: 'contain' }}
            image={process.env.REACT_APP_IMAGE_BASE_URL + image}
            alt={name}
          />
          <CardContent style={{ background: '#f9f9f9' }}>
            <Typography variant='subtitle1' color="black">
              <b>{name}</b>
            </Typography>
            <Typography variant="body1" color="black">
              {price}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

export default CarCard;