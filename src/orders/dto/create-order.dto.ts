import { ValidateNested } from "class-validator";
import { CreateShippingDto } from "./create-shipping.dto";
import { Type } from "class-transformer";
import { OrderdProductsDto } from "./order-product.dto";

export class CreateOrderDto {
    @Type(() => CreateOrderDto)
    @ValidateNested()
    shippingAddress: CreateShippingDto;


    @Type(() => OrderdProductsDto)
    @ValidateNested()
    orderdProducts: OrderdProductsDto[];
}
