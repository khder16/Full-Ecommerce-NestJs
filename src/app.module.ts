import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from 'db/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
// import { CurrentUserMiddleware } from './utility/middleware/current-user.middleware';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { ReatingsModule } from './reatings/ratings.module';
import { MulterModule } from '@nestjs/platform-express';
@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), UsersModule, AuthModule, CategoriesModule, ProductsModule, OrdersModule, ReatingsModule,
  MulterModule.register({
    dest: './images',
    limits: { fileSize: 1000 * 1000 * 10 },
  })],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }

