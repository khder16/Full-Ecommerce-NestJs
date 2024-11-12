import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Res, UseGuards, InternalServerErrorException, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSignupDto } from './dto/user-singup.dto';
import { UserEntity } from './entities/user.entity';
import { UserSignInDto } from './dto/user-signin.dto';
import { Response } from 'express';
import { CurrentUser } from 'src/utility/decorator/current-user.decorator';
import { AuthGuard } from 'src/utility/guards/authentication.guard';
import { AuthorizeGuard } from 'src/utility/guards/authorization.guard';
import { Roles } from 'src/utility/common/user-roles.enum';



@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @Post('signup')
  async signup(@Body() userSignupDto: UserSignupDto): Promise<UserEntity> {
    try {
      return await this.usersService.signup(userSignupDto)
    } catch (error) {
      console.error('Signup Error:', error);
      throw new InternalServerErrorException('An error occurred during signup');
    }
  }

  @Post('signin')
  async signin(@Body() userSignInDto: UserSignInDto, @Res() response: Response) {
    try {
      const user = await this.usersService.signIn(userSignInDto);
      const accessToken = await this.usersService.accessToken(user);
      response.cookie('token', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 3600000
      });
      response.json({ user, accessToken })

    } catch (error) {
      console.error('Signin Error:', error);
      throw new InternalServerErrorException('An error occurred during signin');
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthorizeGuard)
  @Get('all-users')
  async findAllUsers(): Promise<UserEntity[]> {
    try {
      const users = await this.usersService.findAll()
      return users;
    } catch (error) {
      console.error('Fetch All Users Error:', error);
      throw new InternalServerErrorException('An error occurred while fetching users');
    }
  }


  @UseInterceptors(ClassSerializerInterceptor)
  @Get('one-user/:id')
  async findOne(@Param('id') id: number): Promise<UserEntity> {
    try {
      const user = await this.usersService.findOne(id)
      if (!user) {
        throw new NotFoundException('User not found')
      }
      return user;
    } catch (error) {
      console.error('Fetch User Error:', error);
      throw new InternalServerErrorException('An error occurred while fetching the user');
    }
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.usersService.create(createUserDto);

    } catch (error) {
      console.error('Create User Error:', error);
      throw new InternalServerErrorException('An error occurred while creating the user');
    }
  }


  @Get()
  findAll() {
    try {
      return this.usersService.findAll();

    } catch (error) {

    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return this.usersService.update(+id, updateUserDto);
    } catch (error) {
      console.error('Update User Error:', error);
      throw new InternalServerErrorException('An error occurred while updating the user');
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.usersService.remove(+id);

    } catch (error) {
      console.error('Delete User Error:', error);
      throw new InternalServerErrorException('An error occurred while deleting the user');
    }
  }

  @Get('me')
  getProfile(@CurrentUser() currentUser: UserEntity) {
    try {
      if (!currentUser) {
        throw new NotFoundException('Not found user')
      }
      return currentUser;
    } catch (error) {
      console.error('Not Found User Error:', error);
      throw new InternalServerErrorException('An error occurred while Finding the user');
    }
  }
}
