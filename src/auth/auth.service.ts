import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './auth.entity';
import { UserRepository } from './auth.repository';
import { UserCredetialsDto } from './dto/user.credetials.dto';
import { Payload } from './jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private authRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(userCredentialsDto: UserCredetialsDto): Promise<User> {
    return this.authRepository.signUp(userCredentialsDto);
  }

  async signIn(
    userCredentialsDto: UserCredetialsDto,
  ): Promise<{ access_token; name }> {
    const username = await this.authRepository.validateUser(userCredentialsDto);

    if (!username) {
      throw new UnauthorizedException();
    }
    const payload: Payload = { username };
    return {
      access_token: this.jwtService.sign(payload),
      name: username,
    };
  }
}
