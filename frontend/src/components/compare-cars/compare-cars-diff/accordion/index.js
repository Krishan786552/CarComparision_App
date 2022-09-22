import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';
import styled from 'styled-components';

const StyledGrid = styled(Grid)`
  .Mui-expanded {
    margin: 0;
    margin-bottom: 1px;
    :not(:first-child) {
      margin-top: 1px;
    }
  }
`;

// material ui accordion compoenet to display the car's comapre specs
export default function SimpleAccordion(props) {
  const { accordionData } = props;
  return (
    <StyledGrid container item xs={12}>
      {accordionData.map(({ key, header, children, }) => (
        <Accordion sx={{ width: '100%' }} key={key} defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography><b>{header}</b></Typography>
          </AccordionSummary>
          <AccordionDetails>
            {children}
          </AccordionDetails>
        </Accordion>
      ))}
    </StyledGrid>
  );
}
