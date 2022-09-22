import React, { useCallback, useContext, useState, useImperativeHandle } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Button } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

const SimpleDialog = React.forwardRef(({ submitFeedback }, ref) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [feedbackTitle, setFeedbackTitle] = useState('');
  const [feedbackComment, setFeedbackComment] = useState('');
  const [openFeedbackDialog, setOpenFeedbackDialog] = useState(false);

  const addFeedbackClickHandler = useCallback((event) => {
    const obj = {
      key: uuidv4(),
      title: feedbackTitle,
      subtitle: feedbackComment,
      name: userName,
      email: userEmail
    };

    submitFeedback(event, obj, onClose);
  }, [feedbackTitle, feedbackComment, userName, userEmail]);

  useImperativeHandle(ref, () => ({
    openDialog: () => {
      setOpenFeedbackDialog(true);
    }
  }));

  const TextFieldsArray = [
    {
      key: 'name',
      label: 'Name',
      value: userName,
      onchange: (e) => setUserName(e?.target?.value)
    },
    {
      key: 'email',
      label: 'Email',
      value: userEmail,
      onchange: (e) => setUserEmail(e?.target?.value)
    },
    {
      key: 'feedback-title',
      label: 'Feedback Title',
      value: feedbackTitle,
      onchange: (e) => setFeedbackTitle(e?.target?.value)
    },
    {
      key: 'feedback-comment',
      label: 'Feedback Comment',
      value: feedbackComment,
      onchange: (e) => setFeedbackComment(e?.target?.value)
    },
  ];

  const onClose = () => {
    setOpenFeedbackDialog(false);
    setUserEmail('');
    setUserName('');
    setFeedbackComment('');
    setFeedbackTitle('');
  };

  return openFeedbackDialog && (
    <Dialog open={openFeedbackDialog} onClose={onClose} PaperProps={{ style: { minWidth: 400 } }}>
      <DialogTitle sx={{ background: 'cadetblue' }}>Write A Feedback</DialogTitle>
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: '16px' }}>
        {TextFieldsArray?.map((item) => (
          <FormControl variant="filled" sx={{ margin: '5px' }} key={item?.key}>
            <InputLabel htmlFor={`${item?.label}id`}>{item?.label}</InputLabel>
            <FilledInput id={`${item?.label}id`} value={item?.value} onChange={item?.onchange} type={item?.key === 'email' ? 'email' : 'text'} />
          </FormControl>
        ))}
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '5px' }}>
          <Button variant='contained' color='primary' type='button' onClick={addFeedbackClickHandler}>Add Feedback</Button>
          <Button variant='outlined' color='warning' type='button' onClick={onClose}>Cancel</Button>
        </Box>
      </Box>
    </Dialog>
  )
});

export default React.memo(SimpleDialog);