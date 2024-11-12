import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { OrderStatus } from "../enums/order-status.enum";
import { UserEntity } from "src/users/entities/user.entity";
import { ShippingEntity } from "./shipping.entity";
import { ProductEntity } from "src/products/entities/product.entity";
import { OrdersProductsEntity } from "./orders-products.entity";


@Entity('orders')

export class OrderEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    orderAt: Timestamp;


    @Column({ type: "enum", enum: OrderStatus, default: OrderStatus.PROCESSING })
    status: string;


    @Column({ nullable: true })
    shippedAt: Date;

    @Column({ nullable: true })
    deliveredAt: Date;

    @ManyToOne(() => UserEntity, (user) => user.ordersUpdateBy)
    updatedBy: UserEntity;

    @OneToOne(() => ShippingEntity, (ship) => ship.order, { cascade: true })
    @JoinColumn()
    shippingAddress: ShippingEntity;

    @OneToMany(() => OrdersProductsEntity, (op) => op.order, { cascade: true })
    product: OrdersProductsEntity[];

    @ManyToOne(() => UserEntity, (user) => user.orders)
    user: UserEntity;

}
