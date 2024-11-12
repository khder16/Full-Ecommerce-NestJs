import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductEntity } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { RatingEntity } from 'src/reatings/entities/rating.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, UserEntity, CategoryEntity, RatingEntity])],
  controllers: [ProductsController],
  providers: [ProductsService, UsersService, CategoriesService],
  exports: [ProductsService]
})
export class ProductsModule { }
