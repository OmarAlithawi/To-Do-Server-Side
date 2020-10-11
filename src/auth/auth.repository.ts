import { EntityRepository, Repository } from 'typeorm';
import { User } from './auth.entity';
import { UserCredetialsDto } from './dto/user.credetials.dto';
import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private logger = new Logger('UserRepository');
  async signUp(userCredentialsDto: UserCredetialsDto): Promise<User> {
    const { username, password } = userCredentialsDto;
    const user = new User();
    user.name = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    try {
      const newUser = await user.save();
      this.logger.log(`new user signed up ${newUser}`);
      return newUser;
    } catch {
      throw new BadRequestException();
    }
  }

  async validateUser(userCredentialsDto: UserCredetialsDto): Promise<any> {
    const { username, password } = userCredentialsDto;
    const user = await this.findOne({ where: { name: username } });
    if (user && user.validatepassword(password)) {
      return user.name;
    } else {
      throw new UnauthorizedException();
    }
    return user;
  }
  async hashPassword(password, salt) {
    return await bcrypt.hash(password, salt);
  }
}
