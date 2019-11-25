import { LoginUserDto } from '../../auth/dto/login.dto';
import { User } from '../user.entity';

export interface IUsersService {
  getAllUsers(user: User): Promise<User[]>;
  getUserById(ID: number): Promise<User | null>;
  getOneUser(options: object): Promise<User | null>;
  createUser(user: User): Promise<string>;
  updateUserEmail(loginUserDto: LoginUserDto, user: User): Promise<User | null>;
  deleteUser(ID: number): Promise<string>;
}
