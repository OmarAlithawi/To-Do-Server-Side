import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './auth.repository';
import { User } from './auth.entity';
import { Payload } from './jwt.payload';
import * as config from 'config';

const JWT_CONFIG = config.get('jwt');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET || 'veryverysecret',
    });
  }

  async validate(payload: Payload): Promise<User> {
    const { username } = payload;
    const user = await this.userRepository.findOne({
      where: { name: username },
    });
    if (user) {
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }
}
