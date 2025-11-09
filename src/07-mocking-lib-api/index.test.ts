import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
jest.mock('lodash', () => ({
  throttle: (fn: unknown) => fn,
}));

const mockData = { id: 1, title: 'Test' };
const path = '/test';

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const mockValue = jest.fn().mockResolvedValue({ data: mockData });
    const mockAxiosInstance = { get: mockValue };
    mockedAxios.create.mockReturnValue(mockAxiosInstance as any);
    await throttledGetDataFromApi(path);
    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockValue = jest.fn().mockResolvedValue({ data: mockData });
    const mockAxiosInstance = { get: mockValue };
    mockedAxios.create.mockReturnValue(mockAxiosInstance as any);
    await throttledGetDataFromApi(path);
    expect(mockValue).toHaveBeenCalledWith(path);
  });

  test('should return response data', async () => {
    const mockValue = jest.fn().mockResolvedValue({ data: mockData });
    const mockAxiosInstance = { get: mockValue };
    mockedAxios.create.mockReturnValue(mockAxiosInstance as any);
    const result = await throttledGetDataFromApi(path);
    expect(result).toEqual(mockData);
  });
});