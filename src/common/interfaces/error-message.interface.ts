import { HttpStatus } from '@nestjs/common';

import { AppErrorEnum } from '../enums/app-error.enum';

export interface IErrorMessage {
    type: AppErrorEnum;
    httpStatus: HttpStatus;
    errorMessage: string;
    userMessage: string;
}
