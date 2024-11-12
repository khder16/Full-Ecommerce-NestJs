import { ProductEntity } from "src/products/entities/product.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";


@Entity('ratings')
export class RatingEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    stars: number;

    @Column()
    comments: string;

    @CreateDateColumn()
    createdAt: Timestamp;

    @CreateDateColumn()
    updatedAt: Timestamp;

    @Column()
    addedBy: number;


    @ManyToOne(() => ProductEntity, (product) => product.ratings)
    @JoinColumn({ name: 'productId' })
    product: ProductEntity;



}
