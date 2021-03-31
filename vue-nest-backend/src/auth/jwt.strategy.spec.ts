import { JwtStrategy } from './jwt.strategy';
import { Test } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { UnauthorizedException } from '@nestjs/common';

const mockUserRepository = () => ({
  findOne: jest.fn(),
});

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  let userRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        { provide: UserRepository, useFactory: mockUserRepository },
      ],
    }).compile();

    jwtStrategy = await module.get<JwtStrategy>(JwtStrategy);
    userRepository = await module.get<UserRepository>(UserRepository);
  });

  describe('validate', () => {
    const mockUsername = 'TestUser';

    it('should validate and returns the user based on JWT payload', async () => {
      const user = new User();
      user.username = mockUsername;
      userRepository.findOne.mockResolvedValue(user);

      const result = await jwtStrategy.validate({ username: mockUsername });
      expect(userRepository.findOne).toHaveBeenCalledWith({
        username: mockUsername,
      });
      expect(result).toEqual(user);
    });

    it('should throw unauthorized exception if user not found', () => {
      userRepository.findOne.mockResolvedValue(null);

      expect(jwtStrategy.validate({ username: mockUsername })).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
