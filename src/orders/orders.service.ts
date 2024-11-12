import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrdersProductsEntity } from './entities/orders-products.entity';
import { ShippingEntity } from './entities/shipping.entity';
import { UsersService } from 'src/users/users.service';
import { EntityManager } from 'typeorm';
import { ProductsService } from 'src/products/products.service';
import { OrderStatus } from './enums/order-status.enum';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
@Injectable()
export class OrdersService {

  constructor(@InjectRepository(OrderEntity) private readonly OrderRepository: Repository<OrderEntity>,
    @InjectRepository(OrdersProductsEntity) private readonly opRepository: Repository<OrdersProductsEntity>,
    private userService: UsersService, private entityManager: EntityManager,
  ) { }


  async create(createOrderDto: CreateOrderDto, userId: number): Promise<OrderEntity> {
    try {
      return await this.entityManager.transaction(async (entityManager) => {
        const user = await this.userService.findOne(userId)
        if (!user) {
          throw new NotFoundException();
        }

        const shippingEntity = new ShippingEntity();
        Object.assign(shippingEntity, createOrderDto.shippingAddress);

        const orderEntity = new OrderEntity();
        Object.assign(orderEntity, createOrderDto.orderdProducts);

        orderEntity.shippingAddress = shippingEntity;
        orderEntity.user = user;
        const order = await this.OrderRepository.save(orderEntity);


        const orderProducts = createOrderDto.orderdProducts.map((product) => {
          return {
            id: order.id,
            productId: product.id,
            product_quantity: product.product_quantity,
            product_unit_price: product.product_unit_price
          };
        });
        await this.opRepository.save(orderProducts)

        return order;
      });

    } catch (error) {

      throw new InternalServerErrorException
    }
  }

  async findAll(): Promise<OrderEntity[]> {
    return await this.OrderRepository.find({});
  }

  async findOne(id: number): Promise<OrderEntity> {
    return await this.OrderRepository.findOne({
      where: { id }, relations: {
        shippingAddress: true,
        user: true,
        product: true
      }
    })
  }

  async update(id: number, updateOrderStatusDto: UpdateOrderStatusDto, userId: number) {
    try {
      const user = await this.userService.findOne(userId)
      if (!user) {
        throw new NotFoundException();
      }

      const order = await this.OrderRepository.findOne({ where: { id } });
      if (!order) {
        throw new NotFoundException();
      }
      if (order.status === OrderStatus.DELIVERD || order.status === OrderStatus.CANCELLED) {
        throw new BadRequestException(`Order already ${order.status}`);
      }
      if (order.status === OrderStatus.PROCESSING && updateOrderStatusDto.status === OrderStatus.SHIPPED) {
        throw new BadRequestException(`Order already ${order.status}`);
      }
      if (order.status === OrderStatus.SHIPPED && updateOrderStatusDto.status === OrderStatus.SHIPPED) {
        return order;
      }

      if (updateOrderStatusDto.status === OrderStatus.SHIPPED) {
        order.shippedAt = new Date();
      }
      if (updateOrderStatusDto.status === OrderStatus.DELIVERD) {
        order.deliveredAt = new Date();
      }
      order.status = updateOrderStatusDto.status;
      order.updatedBy = user
      const orderUpdated = await this.OrderRepository.save(order);
      return orderUpdated;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }


  async getSalesReport(startDate: Date, endDate: Date) {
    try {

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        throw new BadRequestException('Invalid date format. Please use a valid date string.');
      }

      const orders = await this.OrderRepository.createQueryBuilder('orders')
        .where('orders.orderAt BETWEEN :startDate AND :endDate', { startDate, endDate })
        .leftJoinAndSelect('orders.product', 'product')
        .getMany();

      let totalSales = 0;
      for (const order of orders) {
        for (const product of order.product) {
          totalSales += product.product_unit_price * product.product_quantity;
        }
      }

      const totalOrders = orders.length;

      return { totalOrders, totalSales, orders }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

}
