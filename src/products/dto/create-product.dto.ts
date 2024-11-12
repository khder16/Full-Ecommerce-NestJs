import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString, Min } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty({ message: 'Title can not be blan' })
    @IsString()
    title: string;

    @IsNotEmpty({ message: 'Description can not be empty. ' })
    @IsString()
    description: string;

    @IsNotEmpty({ message: 'Price can not be empty. ' })
    @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Price sjould be number & max decimal precission 2 ' })
    @IsPositive({ message: 'Price should be positive number' })
    price: number;


    @IsNotEmpty({ message: 'Stock should not be empty. ' })
    @IsNumber({}, { message: 'stock sjould be number ' })
    @Min(0, { message: 'Stock can not be negative' })
    stock: number;


    @IsNotEmpty({ message: 'Images can not be empty. ' })
    @IsArray({ message: 'Images should be array format. ' })
    images: string[];

    @IsNotEmpty({ message: 'Category can not be empty' })
    @IsNumber({}, { message: 'Category id should be a number' })
    categoryId: number;
}
