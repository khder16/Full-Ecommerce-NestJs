import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { CreateReatingDto } from './dto/create-rating.dto';
import { UpdateReatingDto } from './dto/update-rating.dto';
import { RequestUser } from 'src/interfaces/category.interface';
import { async } from 'rxjs';
import { AuthGuard } from 'src/utility/guards/authentication.guard';

@Controller('reatings')
export class RatingsController {
  constructor(private readonly reatingsService: RatingsService) { }


  @UseGuards(AuthGuard)
  @Post('add-rating')
  async create(@Body() createReatingDto: CreateReatingDto, @Request() request: RequestUser) {
    return await this.reatingsService.create(createReatingDto, request.user.id);
  }

  @Get()
  findAll() {
    return this.reatingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reatingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReatingDto: UpdateReatingDto) {
    return this.reatingsService.update(+id, updateReatingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reatingsService.remove(+id);
  }
}
