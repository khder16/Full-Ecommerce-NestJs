import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Put, Query, InternalServerErrorException } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from 'src/utility/guards/authentication.guard';
import { RequestUser } from 'src/interfaces/category.interface';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }


  @UseGuards(AuthGuard)
  @Post('order-product')
  async create(@Body() createOrderDto: CreateOrderDto, @Request() request: RequestUser) {
    try {
      return await this.ordersService.create(createOrderDto, request.user.id);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error)
    }
  }

  @Get('allorders')
  async findAll() {
    try {
      return this.ordersService.findAll();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error)
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return this.ordersService.findOne(+id);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error)
    }
  }

  @UseGuards(AuthGuard)
  @Put('update-order/:id')
  async update(@Param('id') id: string, @Body() updateOrderStatusDto: UpdateOrderStatusDto, @Request() request: RequestUser) {
    try {
      return await this.ordersService.update(+id, updateOrderStatusDto, request.user.id);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error)
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.ordersService.remove(+id);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error)
    }
  }


  @Post('sales-report')
  async getSalesReport(@Query('startDate') startDate?: string, @Query('endDate') endDate?: string) {
    try {
      return this.ordersService.getSalesReport(new Date(startDate), new Date(endDate));
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error)
    }
  }
}
