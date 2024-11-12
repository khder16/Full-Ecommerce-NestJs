import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateReatingDto } from './dto/create-rating.dto';
import { UpdateReatingDto } from './dto/update-rating.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RatingEntity } from './entities/rating.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class RatingsService {
  constructor(@InjectRepository(RatingEntity) private ratingRepository: Repository<RatingEntity>, private readonly productService: ProductsService, private readonly userServices: UsersService) { }
  async create(createReatingDto: CreateReatingDto, userId: number) {
    try {
      const user = await this.userServices.findOne(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const product = await this.productService.findOne(createReatingDto.productId);
      if (!product) {
        throw new NotFoundException('Product not found');
      }

      if (createReatingDto.stars < 1 || createReatingDto.stars > 5) {
        throw new Error('Invalid stars number');
      }

      const rate = this.ratingRepository.create({
        stars: createReatingDto.stars,
        comments: createReatingDto.comments,
        product: product,
        addedBy: userId
      });

      return await this.ratingRepository.save(rate);
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return `This action returns all reatings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reating`;
  }

  update(id: number, updateReatingDto: UpdateReatingDto) {
    return `This action updates a #${id} reating`;
  }

  remove(id: number) {
    return `This action removes a #${id} reating`;
  }
}
