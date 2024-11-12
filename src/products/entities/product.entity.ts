import { Timestamp } from "mongodb";
import { CategoryEntity } from "src/categories/entities/category.entity";
import { OrdersProductsEntity } from "src/orders/entities/orders-products.entity";
import { RatingEntity } from "src/reatings/entities/rating.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'products' })
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    price: number;

    @Column()
    stock: number;

    @Column('simple-array')
    images: string[];

    @CreateDateColumn()
    createdAt: Timestamp;

    @CreateDateColumn()
    updatedAt: Timestamp;



    @ManyToOne(() => UserEntity, (user) => user.products)
    addedBy: UserEntity;

    @ManyToOne(() => CategoryEntity, (category) => category.products)
    category: CategoryEntity;

    @OneToMany(() => RatingEntity, (rating) => rating.product)
    ratings: RatingEntity[];

    @OneToMany(() => OrdersProductsEntity, (op) => op.product)
    product: OrdersProductsEntity[];
}
