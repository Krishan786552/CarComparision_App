import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { getCarDetailsApi, addFeedback, removeFeedback } from './CarDetailsServices';
import Grid from '@mui/material/Grid';
import styled from 'styled-components';
import { Button, Typography } from '@mui/material';
import Feedback from '../feedback';
import { v4 as uuidv4 } from 'uuid';
import Dialog from './DIalog';

// import axios from '../../utils/axios';

const StyledImg = styled.img`
  width: 84%;
  // border: 9px solid #c8d8e4;
  // border-radius: 43px;
`;

const StyledP = styled.p`
  color: #000;
  margin: 1rem 0;
`;

const StyledGrid = styled(Grid)`
  border: 2px solid black;
  border-radius: 4px;
  padding: 10px;
  margin-top: 5px;
  // background: rgb(200, 216, 228);
`;

const CarDetailsComponent = () => {
  const location = useLocation();
  const { state: { id } } = location;
  const dialogRef = useRef();
  // console.log('+++++++locationlocation+++++++', location);
  const [carItem, setCarItem] = useState(null);
  console.log('------------------------++++++++++++++++++++++++++', carItem);
  useEffect(() => {
    const getCarDetails = async () => {
      const data = await getCarDetailsApi(id);
      if (data) {
        setCarItem(data);
      }
    }
    getCarDetails();
  }, [setCarItem]);


  const submitFeedback = useCallback(async (event, obj, onClose) => {
    onClose();
    event.preventDefault();
    // const obj = {
    //   title: feedbackTitle,
    //   subtitle: feedbackComment,
    //   name: userName,
    //   email: userEmail
    // };
    const data = await (addFeedback({ id: carItem.id, body: obj }));
    console.log(data);
    setCarItem(data);

  }, [carItem]);

  const removeFeedbackHandler = useCallback(async (key) => {
    const data = await (removeFeedback({ id: carItem?.id, body: { key } }));
    console.log(data);
    setCarItem(data);
  }, [carItem?.id]);



  const setInnerHtml = (value) => <StyledP dangerouslySetInnerHTML={{ __html: value }} />
  const header = useMemo(() => (
    <Grid container alignItems="center" style={{ border: '2px solid', borderRadius: 4, background: '#F5F5F5' }}>
      <Grid item xs={7}>
        <StyledImg src={process.env.REACT_APP_IMAGE_BASE_URL + carItem?.image} alt={carItem?.name} />
      </Grid>
      <Grid item xs={5}>
        <Typography variant='subtitle1' color="black" sx={{ fontWeight: 700, letterSpacing: 5, fontSize: '1.4rem' }}>
          {carItem?.name}
        </Typography>
        <Typography variant='h4' color="black" sx={{ fontSize: '1.3rem' }}>
          {carItem?.price}
        </Typography>
      </Grid>
    </Grid>
  ), [carItem?.name, carItem?.image, carItem?.price]);

  const main = useMemo(() => (
    <>
      <Typography variant='h5' mt={4} color="black" sx={{ letterSpacing: 5 }}>{carItem?.name} Features</Typography>
      <StyledGrid container item xs={12}>
        {carItem?.description.map((item) => (
          <Grid item xs={12} key={item.key + item.value}>
            <StyledP><strong>{item.key}</strong></StyledP>
            {setInnerHtml(item.value)}
          </Grid>
        ))}
      </StyledGrid>

    </>
  ), [carItem?.name, carItem?.description]);

  const onClickHandler = useMemo(() => () => dialogRef?.current?.openDialog(), []);

  const feedbackHeader = useMemo(() => (
    <Grid container item xs={12} justifyContent={"space-between"} alignItems={"center"} mt={3}>
      <Typography variant='h5' mt={4} color="black" sx={{ letterSpacing: 5, margin: 0 }}>{carItem?.name} feedbacks</Typography>
      <Button variant='outlined' color="primary" onClick={onClickHandler}>Add Feedback</Button>
    </Grid>
  ), [carItem?.name, dialogRef?.current]);

  const feedbackContent = useMemo(() => carItem?.feedback && carItem?.feedback.length > 0 && carItem?.feedback?.map((feedback) => <Grid container key={feedback?.key} style={{ margin: '5px 0' }}><Feedback feedback={feedback} onRemove={removeFeedbackHandler} /></Grid>), [carItem?.feedback]);

  return carItem && (
    <>
      <Grid container flexDirection="column">
        {header}
        {main}
        {feedbackHeader}
        <Grid container item xs={12}>
          <StyledGrid container item rowSpacing={3} flexDirection={"column"} style={{ background: '#F5F5F5', flexWrap: 'nowrap' }}>
            {feedbackContent}
            {(!carItem?.feedback || carItem?.feedback?.length === 0) && <Typography variant='body1' color="primary">No Feedbacks Available</Typography>}
          </StyledGrid>
        </Grid>
      </Grid>
      <Dialog submitFeedback={submitFeedback} ref={dialogRef} />
    </>
  );
}

export default CarDetailsComponent;