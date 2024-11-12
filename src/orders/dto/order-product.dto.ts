import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";
import { IsNull } from "typeorm";

export class OrderdProductsDto {

    @IsNotEmpty({ message: 'Product can not be empty' })
    id: number;

    @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Price should be number' })
    @IsPositive({ message: 'Price can not be negative.' })
    product_unit_price: number;


    @IsNumber({}, { message: 'Quantity should be number' })
    @IsPositive({ message: 'Quantity can not be negative.' })
    product_quantity: number;
}
