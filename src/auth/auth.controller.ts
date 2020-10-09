import {
  Body,
  Controller,
  Injectable,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { User } from './auth.entity';
import { AuthService } from './auth.service';
import { UserCredetialsDto } from './dto/user.credetials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(
    @Body(ValidationPipe) userCredentialsDto: UserCredetialsDto,
  ): Promise<User> {
    return this.authService.signUp(userCredentialsDto);
  }

  @Post('signin')
  signIn(@Body() userCredentialsDto: UserCredetialsDto) {
    return this.authService.signIn(userCredentialsDto);
  }
}
