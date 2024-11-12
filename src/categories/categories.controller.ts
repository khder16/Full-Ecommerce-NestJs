import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ExecutionContext, Request } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthorizeGuard } from 'src/utility/guards/authorization.guard';
import { CurrentUser } from 'src/utility/decorator/current-user.decorator';
import { AuthGuard } from 'src/utility/guards/authentication.guard';
import { RequestUser } from '../interfaces/category.interface'
import { CategoryEntity } from './entities/category.entity';
import { log } from 'console';
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @UseGuards(AuthGuard)
  @Post('create-categories')
  async create(@Body() createCategoryDto: CreateCategoryDto, @Request() request: RequestUser): Promise<CategoryEntity> {
    const category = await this.categoriesService.create(createCategoryDto, request.user.id);
    return category
  }

  @UseGuards(AuthGuard)
  @Get('all-categories')
  async findAll() {
    return await this.categoriesService.findAll();
  }


  @UseGuards(AuthGuard)
  @Get('get-category/:id')
  async findOne(@Param('id') id: string) {
    return await this.categoriesService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch('update-category/:id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }


}


