import {
  IsString,
  Matches,
  MaxLength,
  MinLength,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

export class AuthCredentialsDto {
  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(64)
  @Matches(/^[a-zA-Z0-9_]*$/, {
    message: 'only letters, numbers and lowercase allowed',
  })
  @Matches(/[a-zA-Z]/, {
    message: 'must be at least one letter',
  })
  username: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Matches(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    {
      message: 'invalid email',
    },
  )
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(64)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  password: string;
}
