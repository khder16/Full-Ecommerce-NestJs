import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategoryEntity } from './entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { UserEntity } from 'src/users/entities/user.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryEntity,
      UserEntity]),
    UsersModule,
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, UsersService],
  exports: [CategoriesService]
})
export class CategoriesModule { }