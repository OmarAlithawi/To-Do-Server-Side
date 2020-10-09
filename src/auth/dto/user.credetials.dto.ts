import { IsNotEmpty, Length, Matches, Max, Min } from 'class-validator';

export class UserCredetialsDto {
  @IsNotEmpty()
  @Length(4, 25)
  username: string;
  @IsNotEmpty()
  @Length(8, 25)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, {
    message: 'The password must have 1 capital letter and 1 sign',
  })
  password: string;
}
