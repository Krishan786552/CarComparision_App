import { getCarDataApi } from '../../components/app/AppServices';
import { axiosInstance } from '../../utils/axios';

jest.mock('../../utils/axios');


describe('test App Service API', () => {
  it('test for getCarDataApi', async () => {
    axiosInstance.get = jest.fn().mockResolvedValue({ data: 'test' });
    expect(await getCarDataApi({})).toEqual('test');
  })
})