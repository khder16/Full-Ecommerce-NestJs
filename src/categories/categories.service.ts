import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { EntityManager } from 'typeorm';
@Injectable()
export class CategoriesService {

  constructor(@InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>, private usersService: UsersService, private entityManager: EntityManager) { }


  async create(createCategoryDto: CreateCategoryDto, userId: number): Promise<CategoryEntity> {
    try {
      return await this.entityManager.transaction(async (entityManager) => {
        const user = await this.usersService.findOne(userId);
        if (!user) {
          throw new NotFoundException();
        }
        const category = this.categoryRepository.create(createCategoryDto);
        category.addedBy = user
        await this.categoryRepository.save(category);
        return category
      })
    } catch (error) {
      throw new InternalServerErrorException('Failed to create category');
    }
  }

  async findAll(): Promise<CategoryEntity[]> {
    try {
      const allCategories = await this.categoryRepository.find({});
      if (!allCategories || allCategories.length === 0) {
        throw new NotFoundException('No categories found');
      }
      return allCategories;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch categories');
    }
  }


  async findOne(id: number): Promise<CategoryEntity> {
    return await this.categoryRepository.findOne({ where: { id }, relations: { addedBy: true }, select: { addedBy: { id: true, name: true, email: true } } });
  }



  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<CategoryEntity> {
    try {
      const category = await this.categoryRepository.findOneBy({ id });
      if (!category) {
        throw new NotFoundException('Category not found.');
      }
      Object.assign(category, updateCategoryDto);
      return await this.categoryRepository.save(category);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update categories');
    }
  }



  remove(id: number) {
    return;
  }
}
