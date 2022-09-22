import { getCarDetailsApi, addFeedback, removeFeedback } from '../../components/car-details-page/CarDetailsServices';
import { axiosInstance } from '../../utils/axios';

jest.mock('../../utils/axios');


describe('test car details page Service API', () => {
  it('test for getCarDetailsApi', async () => {
    axiosInstance.get = jest.fn().mockResolvedValue({ data: 'test' });
    expect(await getCarDetailsApi('test')).toEqual('test');
  })
  it('test for addFeedback', async () => {
    axiosInstance.post = jest.fn().mockResolvedValue({ data: 'test' });
    expect(await addFeedback('test')).toEqual('test');
  })
  it('test for removeFeedback', async () => {
    axiosInstance.post = jest.fn().mockResolvedValue({ data: 'test' });
    expect(await removeFeedback('test')).toEqual('test');
  })
})