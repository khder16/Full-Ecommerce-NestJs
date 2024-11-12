import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { configDotenv } from 'dotenv';
import { UserEntity } from 'src/users/entities/user.entity';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import { OrderEntity } from 'src/orders/entities/order.entity';
import { OrdersProductsEntity } from 'src/orders/entities/orders-products.entity';


export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin',
    database: 'ecommerce',
    entities: ['dist/**/*.entity{.ts,.js}', UserEntity, CategoryEntity, ProductEntity, OrderEntity, OrdersProductsEntity],
    migrations: ['dist/db/migrations/*{.ts,.js}'],
    synchronize: true,
    logging: false
}
const dataSource = new DataSource(dataSourceOptions);
export default dataSource