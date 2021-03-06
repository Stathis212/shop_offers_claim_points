import { createParamDecorator } from '@nestjs/common';

import { User } from '../../core/entities/user.entity';

export const GetUser = createParamDecorator((data, req): User => {
  return req.user;
});

export const GetUserId = createParamDecorator((data, req): User => {
  return req.user.id;
});
