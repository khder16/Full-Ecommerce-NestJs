import { Exclude, Expose } from "class-transformer";
import { CategoryEntity } from "src/categories/entities/category.entity";
import { OrderEntity } from "src/orders/entities/order.entity";
import { ProductEntity } from "src/products/entities/product.entity";
import { Roles } from "src/utility/common/user-roles.enum";
import { Timestamp, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from "typeorm";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Exclude()
    @Column()
    password: string;

    @Column({ type: 'enum', enum: Roles, array: true, default: [Roles.USER] })
    roles: Roles[];

    @CreateDateColumn()
    createdAt: Timestamp;

    @UpdateDateColumn()
    updatedAt: Timestamp;


    @OneToMany(() => CategoryEntity, (cat) => cat.addedBy)
    categories: CategoryEntity[];


    @OneToMany(() => ProductEntity, (product) => product.addedBy)
    products: ProductEntity[];


    @OneToMany(() => OrderEntity, (order) => order.updatedBy)
    ordersUpdateBy: OrderEntity[];

    @OneToMany(() => OrderEntity, (order) => order.user)
    orders: OrderEntity[];

}
