import CarsList from "../../components/car-list";
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AppSlice from '../../components/app/AppSlice';
import { BrowserRouter } from 'react-router-dom';
import configureAppStore from '../../store';
import { Provider } from 'react-redux';

describe('test CarList compoenent', () => {
  it('test CarList Rendering', async () => {
    const store = configureAppStore({
      app: {
        data: [{
          "id": "Marutiefty878781899",
          "name": "Maruti Brezza",
          "price": "₹ 7.99 Lakh onwards",
          "image": "brezza.webp",
          "feedback": []
        }]
      }
    });
    // store?.injectReducer('app', AppSlice);
    await render(<Provider store={store}><CarsList /></Provider>, { wrapper: BrowserRouter });

    const cardBtn = screen.getByRole('button', { name: 'Maruti Brezza Maruti Brezza ₹ 7.99 Lakh onwards' });
    await act(async () => userEvent.click(cardBtn));
    expect(screen.getByText('Maruti Brezza')).toBeInTheDocument();
  })
})