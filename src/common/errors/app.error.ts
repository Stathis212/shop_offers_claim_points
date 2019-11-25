import { HttpStatus } from '@nestjs/common';

import { AppErrorEnum } from '../enums/app-error.enum';
import { IErrorMessage } from '../interfaces/error-message.interface';

export class AppError extends Error {
  public errorCode: AppErrorEnum;
  public httpStatus: number;
  public errorMessage: string;
  public userMessage: string;
  constructor(errorCode: AppErrorEnum) {
      super();
      const errorMessageConfig: IErrorMessage = this.getError(errorCode);
      if (!errorMessageConfig) {
        throw new Error('Unable to find message code error.');
      }
      Error.captureStackTrace(this, this.constructor);
      this.name = this.constructor.name;
      this.httpStatus = errorMessageConfig.httpStatus;
      this.errorCode = errorCode;
      this.errorMessage = errorMessageConfig.errorMessage;
      this.userMessage = errorMessageConfig.userMessage;
  }
  private getError(errorCode: AppErrorEnum): IErrorMessage {
      let res: IErrorMessage;
      switch (errorCode) {
          case AppErrorEnum.USER_NOT_FOUND:
              res = {
                  type: AppErrorEnum.USER_NOT_FOUND,
                  httpStatus: HttpStatus.NOT_FOUND,
                  errorMessage: 'User not found',
                  userMessage: 'Unable to find the user with the provided information.',
              };
              break;
          case AppErrorEnum.USER_EXISTS:
              res = {
                  type: AppErrorEnum.USER_EXISTS,
                  httpStatus: HttpStatus.UNPROCESSABLE_ENTITY,
                  errorMessage: 'User exisists',
                  userMessage: 'Username exists',
              };
              break;
          case AppErrorEnum.NOT_IN_SESSION:
              res = {
                  type: AppErrorEnum.NOT_IN_SESSION,
                  httpStatus: HttpStatus.UNAUTHORIZED,
                  errorMessage: 'No Session',
                  userMessage: 'Session Expired',
              };
              break;
          case AppErrorEnum.NO_USERS_IN_DB:
              res = {
                  type: AppErrorEnum.NO_USERS_IN_DB,
                  httpStatus: HttpStatus.NOT_FOUND,
                  errorMessage: 'No Users exits in the database',
                  userMessage: 'No Users. Create some.',
              };
              break;
      }
      return res;
  }
}
