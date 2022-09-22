import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Grid from '@mui/material/Grid';
import styled from 'styled-components';
import useInjectReducer from '../../hooks/useInjectReducer';
import CompareCarsSlice, { setDropDownInitialValues, setDropDownValueByKey, fetchCompareCarData } from './CompareCarsSlice';
import { getDropDownDetails, getDropDownOptions } from './CompareCarSelectors';
import { useDispatch, useSelector } from 'react-redux';
import DirectionsCarFilledTwoToneIcon from '@mui/icons-material/DirectionsCarFilledTwoTone';
import CloseIcon from '@mui/icons-material/Close';
import Dropdown from './auto-complete';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Button, Typography } from '@mui/material';
import CompareCarDiff from './compare-cars-diff';
import useInjectSaga from '../../hooks/useInjectSaga';
import CompoareCarSaga from './CompareCarsSaga';
import Toast from '../toast';

const StyledGrid = styled(Grid)`
  border: 1px solid darkgrey;
  border-radius: 6px;
  @media only screen and (max-width: 400px) {
    flex-wrap: nowrap;
  }
`;

const StyledItem = styled(Grid)`
  min-height: 200px;
  position: relative;
  :not(:last-child) {
    border-right: 1px solid darkgray; 
  }
  :last-child #chip{
    display: none;
  }
`;

const StyledVsChip = styled(Grid)`
  height: 30px;
  width: 30px;
  border: 1px solid black;
  border-radius: 50%;
  position: absolute;
  right: 0;
  transform: translate(50%, 100%);
  color: red;
  background: white;
  z-index: 1;
`;

const StyledSeletCarChip = styled(Grid)`
  height: 60px;
  width: 60px;
  border: 1px solid black;
  border-radius: 50%;
`;

const CompareCars = () => {
  useInjectReducer('compare', CompareCarsSlice);
  useInjectSaga('compare', CompoareCarSaga);
  const dispatch = useDispatch();
  const [openToast, setOpenToast] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [keyValue, setKeyValue] = useState('');
  const dropDownOptions = useSelector(getDropDownOptions);
  const dropdownDetails = useSelector(getDropDownDetails);
  const msg = 'This option is already selected...choose other option.';

  const changeHandler = (_, item) => {
    const optionsSelected = dropdownDetails.map(i => i.value);
    if (!optionsSelected.includes(item?.name)) {
      dispatch(setDropDownValueByKey({ itemId: item.id, key: keyValue, value: item.name, name: item.name, data: item }));
      setOpenDialog(false);
    } else {
      setOpenToast(true);
    }
  }

  const iconClick = (key) => {
    setKeyValue(key);
    setOpenDialog(true);
  }

  useEffect(() => {
    if (dropDownOptions && dropDownOptions.length && !dropdownDetails.length) {
      dispatch(setDropDownInitialValues(Array.from(Array(5)).map(() => ({ key: uuidv4(), name: '', value: '', itemId: null, data: {} })) || []));
    }
  }, []);

  const dropdownValue = dropdownDetails?.find(i => i?.key === keyValue);

  const removeCar = (key) => {
    dispatch(setDropDownValueByKey({ key, value: '', name: '', data: {}, type: 'remove' }));
  }

  const compareBtnClick = () => {
    const ids = dropdownDetails?.filter(i => i.itemId).map(i => i.itemId).join();
    dispatch(fetchCompareCarData(ids));
  }

  const isDisabled = dropdownDetails?.filter(item => item?.value)?.length <= 1;

  console.log('------------------------+++++++++========', dropdownDetails);

  return (
    <>
      {dropdownDetails && dropdownDetails?.length && (<StyledGrid container>
        {dropdownDetails?.map((i) => (
          <StyledItem container item xs key={i?.key}>
            <StyledVsChip id="chip" container item justifyContent={"center"} alignItems={"center"}>VS</StyledVsChip>
            {!i?.value && (
              <>
                <Grid container justifyContent={"center"} alignItems={"center"} flexDirection="column" style={{ cursor: 'pointer' }} onClick={() => iconClick(i?.key)}>
                  <StyledSeletCarChip container alignItems={"center"} justifyContent={"center"}>
                    <DirectionsCarFilledTwoToneIcon fontSize={"large"} />
                  </StyledSeletCarChip>
                  <label style={{ color: '#0288d1' }}>Select Car</label>
                </Grid>
              </>
            )}
            {i?.value && (
              <Grid container flexDirection={"column"}>
                <Grid item container style={{ overflow: 'hidden' }} justifyContent={"flex-end"} alignItems="center" onClick={() => removeCar(i?.key)}>
                  <CloseIcon fontSize='small' />
                </Grid>
                <Grid item container style={{ overflow: 'hidden' }} justifyContent={"center"} alignItems="center">
                  <img src={process.env.REACT_APP_IMAGE_BASE_URL + i?.data?.image} alt={i?.data?.name} width={"100%"} />
                </Grid>
                <Grid item container style={{ overflow: 'hidden' }} justifyContent={"center"} alignItems="center">
                  <Typography sx={{ color: '#0288d1', fontWeight: 700 }} variant='subtitle2'>{i?.data?.name}</Typography>
                </Grid>
                <Grid item container style={{ overflow: 'hidden' }} justifyContent={"center"} alignItems="center">
                  <Typography sx={{ fontWeight: 'bold', fontSize: '1rem' }} variant='body2'>{i?.data?.price}</Typography>
                </Grid>
              </Grid>
            )}
          </StyledItem>
        ))}
      </StyledGrid>)}
      <Button variant='contained' style={{ marginTop: 5, width: 200 }} color={"primary"} onClick={compareBtnClick} disabled={isDisabled}>Compare</Button>
      <CompareCarDiff />
      {openDialog && (
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} PaperProps={{ style: { minWidth: 320, minHeight: 200 } }}>
          <DialogTitle sx={{ background: 'cadetblue' }}>Select Car</DialogTitle>
          <Dropdown options={[...dropDownOptions]} onChange={changeHandler} value={dropdownValue || ''} style={{ padding: 20 }} />
        </Dialog>
      )
      }
      {openToast && (
        <Toast open={openToast} handleClose={() => setOpenToast(false)} msg={msg}/>
      )}
    </>
  )
}

export default CompareCars;