import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, HttpStatus, Query, UseInterceptors, ParseFilePipeBuilder, UploadedFile, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '../utility/guards/authentication.guard';
import { AuthorizeGuard } from '../utility/guards/authorization.guard';
import { RequestUser } from '../interfaces/category.interface'
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v2 as cloudinary, v2 } from 'cloudinary';
import * as dotenv from 'dotenv';
import { LimitOnUpdateNotSupportedError } from 'typeorm';
import { SerializeIncludes, SerializeInterceptor } from 'src/utility/interceptors/serialize.interceptor';
import { ProductEntity } from 'c:/Users/lenovo/Downloads/NestEcommerce/ecommerce/src/products/entities/product.entity';
dotenv.config();


const MAX_PROFILE_PICTURE_SIZE_IN_BYTES = 2 * 1024 * 1024;
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @UseGuards(AuthGuard, AuthorizeGuard)
  @Post('create-product')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      filename(req, file, callback) {
        const newFileName = Date.now() + file.originalname;
        callback(null, newFileName);
      },
      destination: './images',
    }),
    limits: { fileSize: 1000 * 1000 * 1, },
    fileFilter(req, file, callback) {
      if (!file.originalname) {
        return callback(new BadRequestException('Please select a file to upload'), false);
      }

      if (!file.originalname.match(/\.(JPG|JPEG|PNG|gif|svg|webp)$/)) {
        return callback(new BadRequestException('Only image files are allowed (JPG, JPEG, PNG, GIF, SVG, WEBP)'), false);
      }
      callback(null, true)
    },
  }))
  async create(@UploadedFile() file: Express.Multer.File, @Body() createProductDto: CreateProductDto, @Request() request: RequestUser) {
    try {
      return this.productsService.create(file, createProductDto, request.user.id);
    } catch (error) {
      console.error('Error creating product:', error);
      throw new InternalServerErrorException('An error occurred while creating the product');
    }
  }

  @UseGuards(AuthGuard)
  @Get('allproduct')
  async findAll(@Query() query: any): Promise<import("c:/Users/lenovo/Downloads/NestEcommerce/ecommerce/src/products/entities/product.entity").ProductEntity[]> {
    try {
      return await this.productsService.findAll(query);
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new InternalServerErrorException('An error occurred while fetching the products');
    }
  }

  @UseGuards(AuthGuard)
  @Get('get-product/:id')
  findOne(@Param('id') id: string) {
    try {
      return this.productsService.findOne(+id);
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new InternalServerErrorException('An error occurred while fetching the product');
    }
  }


  @UseGuards(AuthGuard, AuthorizeGuard)
  @Patch('update-product/:id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    try {
      return this.productsService.update(+id, updateProductDto);
    } catch (error) {
      console.error('Error updating product:', error);
      throw new InternalServerErrorException('An error occurred while updating the product');
    }
  }

  @UseGuards(AuthGuard)
  @Get('search')
  async searchProducts(@Query('search') search: string) {
    try {
      return this.productsService.searchProducts(search);
    } catch (error) {
      console.error('Error search product:', error);
      throw new InternalServerErrorException('An error occurred while searching the product');
    }
  }

  @UseGuards(AuthGuard)
  @Get('filter')
  async filterProducts(@Query('categoryId') categoryId?: number, @Query('minPrice') minPrice?: number, @Query('maxPrice') maxPrice?: number): Promise<ProductEntity[]> {
    try {
      return this.productsService.filterProducts(categoryId, minPrice, maxPrice);
    } catch (error) {
      console.error('Error filter product:', error);
      throw new InternalServerErrorException('An error occurred while filtering the products');
    }
  }


  @UseGuards(AuthGuard, AuthorizeGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.productsService.remove(+id);
    } catch (error) {
      console.error('Error deleting product:', error);
      throw new InternalServerErrorException('An error occurred while deleting the product');
    }
  }
}