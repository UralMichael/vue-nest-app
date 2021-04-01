import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { SignupCredentialsDto } from './dto/signup-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import * as config from 'config';
import { JwtConfigInterface } from '../config/jwt-config.interface';

const jwtConfig = config.get('jwt') as JwtConfigInterface;

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(signupCredentialsDto: SignupCredentialsDto): Promise<void> {
    return this.userRepository.signUp(signupCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ token: string; id: number; expiresIn: number }> {
    const user = await this.userRepository.validateUserPassword(
      authCredentialsDto,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { id: user.id, email: user.email };
    const token = await this.jwtService.sign(payload);
    const id = user.id;
    const expiresIn = jwtConfig.expiresIn;
    this.logger.debug(`Generated JWT with payload: ${JSON.stringify(payload)}`);

    return {
      token,
      id,
      expiresIn,
    };
  }
}
