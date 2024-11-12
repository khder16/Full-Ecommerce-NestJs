import { Module } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingEntity } from './entities/rating.entity';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { CategoryEntity } from 'src/categories/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RatingEntity, UserEntity, ProductEntity, CategoryEntity])],
  controllers: [RatingsController],
  providers: [RatingsService, UsersService, ProductsService, CategoriesService],
  exports: [RatingsService]
})
export class ReatingsModule { }
