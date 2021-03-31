import * as bcrypt from 'bcrypt';
import { Test } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from './user.entity';

const mockCredentialsDto: AuthCredentialsDto = {
  username: 'TestUser',
  password: 'TestPassword',
};

describe('UserRepository', () => {
  let userRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserRepository],
    }).compile();

    userRepository = await module.get<UserRepository>(UserRepository);
  });

  describe('signUp', () => {
    let save;

    beforeEach(() => {
      save = jest.fn();
      userRepository.create = jest.fn().mockReturnValue({ save });
    });

    it('should successfully sign up user', () => {
      // any value resolved without error
      save.mockResolvedValue(undefined);
      expect(userRepository.signUp(mockCredentialsDto)).resolves.not.toThrow();
    });

    it('should return conflict exception', () => {
      save.mockRejectedValue({ code: '23505' });
      expect(userRepository.signUp(mockCredentialsDto)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should return server error exception', () => {
      save.mockRejectedValue({ code: '00000' });
      expect(userRepository.signUp(mockCredentialsDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('validateUserPassword', () => {
    let mockUser;

    beforeEach(() => {
      userRepository.findOne = jest.fn();

      mockUser = new User();
      mockUser.username = mockCredentialsDto.username;

      bcrypt.hash = jest.fn();
      bcrypt.compare = jest.fn();
    });

    it('should return username if password is valid', async () => {
      userRepository.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);

      const result = await userRepository.validateUserPassword(
        mockCredentialsDto,
      );
      expect(bcrypt.compare).toHaveBeenCalled();
      expect(result).toEqual(mockCredentialsDto.username);
    });

    it('should return null if password is not valid', async () => {
      userRepository.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(false);

      const result = await userRepository.validateUserPassword(
        mockCredentialsDto,
      );
      expect(bcrypt.compare).toHaveBeenCalled();
      expect(result).toBeNull();
    });

    it('should return null if user can not be found', async () => {
      userRepository.findOne.mockResolvedValue(null);

      const result = await userRepository.validateUserPassword(
        mockCredentialsDto,
      );
      expect(bcrypt.compare).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });
  });
});
