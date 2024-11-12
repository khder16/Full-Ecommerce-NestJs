import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSignupDto } from './dto/user-singup.dto';
import * as bcrypt from 'bcryptjs';
import { UserSignInDto } from './dto/user-signin.dto';
import { sign } from 'jsonwebtoken'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) { }

  async signup(userSignupDto: UserSignupDto): Promise<UserEntity> {
    try {
      const userExist = await this.findUserByEmail(userSignupDto.email);
      if (userExist) {
        throw new BadRequestException('Email is not availabel.')
      }
      userSignupDto.password = await bcrypt.hash(userSignupDto.password, 10)
      const user = this.userRepository.create(userSignupDto);
      return await this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException()

    }
  }


  async signIn(userSignInDto: UserSignInDto): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOneBy({ email: userSignInDto.email });
      if (!user) {
        throw new BadRequestException()
      }


      const passwordValid = await bcrypt.compare(userSignInDto.password, user.password)
      if (!passwordValid) {
        throw new UnauthorizedException('Invalid password');
      }
      if (!passwordValid) {
        throw new UnauthorizedException();
      }
      return user
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }


  async accessToken(user: UserEntity): Promise<string> {
    const token = sign({ id: user.id, email: user.email }, "Khder16", { expiresIn: '30d' })
    return token
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    const allUsers = await this.userRepository.find({})
    return allUsers;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id: id })
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }
}
