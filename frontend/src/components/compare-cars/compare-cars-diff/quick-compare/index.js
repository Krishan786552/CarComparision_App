import React from 'react';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import TableData from '../table-data';
import { getQuickCompareData } from '../../CompareCarSelectors';
import { StyledCompareHeader } from '../commonStyles';

// displat quick compare data
const QuickCompareSpec = () => {
  const { header, quickData, tableHeaders } = useSelector(getQuickCompareData);
  const values = quickData?.map(({ key, ...rest }) => ({ [key]: Object.values(rest) }));
  const props = {
    data: quickData,
    values,
    tableHeaders
  };
  return quickData && quickData?.length > 0 && (
    <>
      <StyledCompareHeader elevation={2} sx={{ marginBottom: 0.3 }}>
        <Typography variant='h5' padding={"5px"}>
          {header}
        </Typography>
      </StyledCompareHeader>
      <TableData  {...props} />
    </>
  )
}

export default QuickCompareSpec