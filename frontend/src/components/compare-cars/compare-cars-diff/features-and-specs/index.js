import React from 'react';
import { v4 as uuidv4 } from 'uuid'
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import TableData from '../table-data';
import { getFeaturesSpecsData } from '../../CompareCarSelectors';
import { StyledCompareHeader } from '../commonStyles';
import SimpleAccordion from '../accordion';

// compoenent to display the car's fetaures and specs
const FeaturesAndSpecs = () => {
  const featuresSpecsData = useSelector(getFeaturesSpecsData);
  // console.log('::::::::::::;featuresSpecsData::::::::::::::',featuresSpecsData);
  if (!(Object?.keys(featuresSpecsData)?.length)) return null;
  const { featuresSpecs: { Features, Specification }, tableHeaders } = featuresSpecsData;
  if (!Features || !Specification) return null;
  const data = (childrenData) => Object?.keys(childrenData)?.map((key) => ({ key, ...childrenData?.[key]?.reduce((acc, itm, indx) => ({ ...acc, [`value${indx}`]: itm }), {}) }));
  const values = (childrenData) => Object?.keys(childrenData)?.map((key) => ({ [key]: childrenData?.[key] }));
  const getAccordionData = (dataArr) => Object?.keys(dataArr)?.map((item) => ({ key: uuidv4(), header: item, children: <TableData data={data(dataArr?.[item])} values={values(dataArr?.[item])} tableHeaders={tableHeaders}/> }));
  const accordionDataFeatures = getAccordionData(Features);
  const accordionDataSpecs = getAccordionData(Specification);
  const arr = ['Features', 'Specification'];
  return (
    <>
      {
        arr.map((itm) => (
          <>
            <StyledCompareHeader elevation={2} sx={{ marginBottom: 0.3 }}>
              <Typography variant='h5' padding={"5px"}>
                {itm}
              </Typography>
            </StyledCompareHeader>
            <SimpleAccordion accordionData={itm === 'Features' ? accordionDataFeatures : accordionDataSpecs} />
          </>
        ))
      }
    </>
  )
};

export default FeaturesAndSpecs;