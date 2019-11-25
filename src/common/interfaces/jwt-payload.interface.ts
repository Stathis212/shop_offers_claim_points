import { User } from '../../core/entities/user.entity';

export interface JwtPayload {
  user: User;
}
