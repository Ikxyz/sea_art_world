import { AxiosError } from 'axios';

import { CustomError } from './error';







export type _Try<T> = [CustomError | null, T | null];

type _AsyncFunction<T> = (...arg: any) => Promise<T>;

type _SyncFunction<T> = (...arg: any) => T;

export async function tryAsync<T>(fn: _AsyncFunction<T>, ...args: any): Promise<_Try<T>> {
     try {

          const data = await fn(...args);

          return [null, data];

     } catch (error) {
          let err = error as AxiosError & CustomError & any;
          if (err.isAxiosError) {
               const networkError = new CustomError();
               networkError.code = Number(err.code);
               networkError.message = err.response?.statusText ?? "";
               networkError.data = err.response?.data;
               return [networkError, null];
          } else if (err.isCustomError) {
               return [err, null]
          }

          const customError = new CustomError();
          customError.message = err.message ?? "";
          customError.code = 400;
          return [customError, null];
     }

}

export function trySync<T>(fn: _SyncFunction<T>, ...args: any): _Try<T> {

     try {

          const data = fn(args);

          return [null, data];

     } catch (error) {

          return [error as any, null];
     }

}