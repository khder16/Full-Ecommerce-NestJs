import { Injectable, InternalServerErrorException, NotFoundException, UploadedFile } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryBuilder, Repository } from 'typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { EntityManager } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { v2 as cloudinary, v2 } from 'cloudinary';


@Injectable()
export class ProductsService {
  constructor(@InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>, private readonly categoriesService: CategoriesService, private readonly userServices: UsersService, private entityManager: EntityManager) { }

  async create(@UploadedFile() file: Express.Multer.File, createProductDto: CreateProductDto, userId: number): Promise<ProductEntity> {
    try {
      v2.config({
        cloud_name: process.env.CLOUDINARY_Name,
        api_key: process.env.Cloudinary_API_KEY,
        api_secret: process.env.Cloudinary_SECRET_KEY,
      });

      const result = await v2.uploader.upload(file.path,
        {
          resource_type: 'auto',
        });

      return await this.entityManager.transaction(async (entityManager) => {
        const user = await this.userServices.findOne(userId);
        if (!user) {
          throw new NotFoundException();
        }
        const categoryId = createProductDto.categoryId
        const category = await this.categoriesService.findOne(categoryId)
        if (!category) {
          throw new NotFoundException('Category not found');
        }

        const newProduct = this.productRepository.create(createProductDto);
        newProduct.category = category;
        newProduct.addedBy = user;

        if (!newProduct.images) { newProduct.images = []; }
        newProduct.images.push(result.secure_url);

        await this.productRepository.save(newProduct);
        return newProduct
      })

    } catch (error) {
      console.error('Error:', error);
      throw new InternalServerErrorException();
    }
  }

  async findAll(query: any) {
    try {
      const { page = 1, limit = 10 } = query;
      const skip = (page - 1) * limit;

      const allProducts = await this.productRepository.find({
        select: { title: true, price: true, images: true, description: true },
        skip,
        take: limit
      });

      if (!allProducts || allProducts.length == 0) {
        throw new NotFoundException('There is no product');
      }
      return allProducts;
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number): Promise<ProductEntity> {
    try {
      const product = await this.productRepository.findOne({ where: { id }, select: { title: true, price: true, images: true, description: true } })
      if (!product) {
        throw new NotFoundException('Product can not found');
      }
      return product;
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<ProductEntity> {
    const product = await this.productRepository.findOneBy({ id })
    if (!product) {
      throw new NotFoundException('Can not found the product. ');
    }
    Object.assign(product, updateProductDto);
    return await this.productRepository.save(product);
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }



  async searchProducts(search: string) {
    try {
      const products = this.productRepository.createQueryBuilder('products')
        .where('products.title LIKE :search', { search: `%${search}%` })
        .orWhere('products.description LIKE :search', { search: `%${search}%` })
        .getMany()
      return products;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException()
    }
  }


  async filterProducts(categoryId?: number, minPrice?: number, maxPrice?: number) {
    try {
      let queryBuilder = this.productRepository.createQueryBuilder('products');

      if (categoryId) {
        queryBuilder = queryBuilder.andWhere('products.category.id :categoryId', { categoryId })
      }

      if (minPrice) {
        queryBuilder = queryBuilder.andWhere('products.price >= :minPrice', { minPrice })

      }

      if (maxPrice) {
        queryBuilder = queryBuilder.andWhere('products.price <= :maxPrice', { maxPrice })
      }


      return queryBuilder.getMany()


    } catch (error) {

    }
  }
}