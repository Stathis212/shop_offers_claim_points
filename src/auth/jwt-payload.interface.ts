import { User } from '../users/user.entity';

export interface JwtPayload {
  user: User;
}
