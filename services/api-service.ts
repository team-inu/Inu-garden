import axios, { AxiosRequestConfig } from 'axios';

import { Axios } from '@/libs/axios';
import { ApiError, ApiResponse } from '@/types/api-response-type';

export abstract class ApiService {
  protected get<T = object>(url: string) {
    return Axios.get<ApiResponse<T>>(url);
  }

  protected post<T = object>(url: string, data: object, config?: AxiosRequestConfig<any>) {
    return Axios.post<ApiResponse<T>>(url, data, config);
  }

  protected put<T = object>(url: string, data: object) {
    return Axios.put<ApiResponse<T>>(url, data);
  }

  protected patch<T = object>(url: string, data: object) {
    return Axios.patch<ApiResponse<T>>(url, data);
  }

  protected delete<T = object>(url: string, data?: object) {
    return Axios.delete<ApiResponse<T>>(url, data);
  }

  protected upload<T = object>(url: string, data: FormData) {
    return Axios.post<ApiResponse<T>>(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  // Throws the error object from the API response. Or return the root of the error if it does not exist,
  // in case the root of the error instance is not from the API response.
  protected throwError(error: unknown): never {
    if (typeof error === 'string') {
      throw new Error(error);
    } else if (axios.isAxiosError(error)) {
      // If `response` does not exist, that means "Network Error"
      throw error?.response?.data.error || error;
    } else {
      throw error;
    }
  }

  public static isDomainError(error: unknown): error is ApiError {
    return (
      typeof error === 'object' &&
      error !== null &&
      (error as ApiError).code !== undefined &&
      (error as ApiError).message !== undefined
    );
  }
}
