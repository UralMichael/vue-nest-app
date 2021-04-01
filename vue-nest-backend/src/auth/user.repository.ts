import * as bcrypt from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { SignupCredentialsDto } from './dto/signup-credentials.dto';

import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(signupCredentialsDto: SignupCredentialsDto): Promise<void> {
    const { username, email, password } = signupCredentialsDto;

    const user = this.create();

    user.username = username;
    user.email = email;
    user.password = await bcrypt.hash(password, 10);

    let emailFetch;

    try {
      emailFetch = await this.findOne({ email });
    } catch (error) {
      throw new InternalServerErrorException();
    }

    console.log(emailFetch);

    if (emailFetch) {
      throw new ConflictException('Email not unique');
    }

    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        console.log(JSON.stringify(error));
        throw new ConflictException('Username not unique');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<User> {
    const { username, email, password } = authCredentialsDto;
    let user: User;
    if (username !== null) {
      user = await this.findOne({ username });
    } else if (email !== null) {
      user = await this.findOne({ email });
    } else {
      throw new BadRequestException();
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    } else {
      return null;
    }
  }
}
