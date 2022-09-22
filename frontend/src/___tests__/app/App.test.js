import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../components/app/App';
import { BrowserRouter } from 'react-router-dom';
import configureAppStore from '../../store';
import { Provider } from 'react-redux';

describe('test App compoenent', () => {
  it('test App Renderering', async () => {
    await render(<Provider store={configureAppStore({})}><App /></Provider>, { wrapper: BrowserRouter });
    const btn = screen.getByRole('button', { name: "Compare Cars" });
    await act(() => userEvent.click(btn));
  })
})