import Feedback from "../../components/feedback";
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import configureAppStore from '../../store';
import { Provider } from 'react-redux';

describe('test feedback compoenet', () => {
  it('test Feedback compoenent rendering', async () => {
    const props = {
      feedback: {
        "key": "9793d18b-11e7-4691-b146-390ab788937f",
        "title": "Great",
        "subtitle": "Its a great car to buy.",
        "name": "Pushkar Shrivastava",
        "email": "shrivastava.pushkar92@gmail.com"
      },
      onRemove: jest.fn()
    };
    const props2 = {
      feedback: {
        "key": "9793d18b-11e7-4691-99bb-390ab788937f",
        "title": "Great",
        "subtitle": "Its a great car to buy.",
        "name": "Pushkar Shrivastava",
        "email": "shrivastava.pushkar92@gmail.com"
      },
      onRemove: jest.fn()
    };

    const { rerender } = await render(<Provider store={configureAppStore()}><Feedback {...props} /></Provider>, { wrapper: BrowserRouter })
    await rerender(<Provider store={configureAppStore()}><Feedback {...props2} /></Provider>, { wrapper: BrowserRouter })
  })
})