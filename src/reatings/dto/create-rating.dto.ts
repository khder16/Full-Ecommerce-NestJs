import { IsEmpty, IsNumber, IsString } from "class-validator";

export class CreateReatingDto {
    @IsEmpty()
    @IsString()
    comments: string;

    @IsEmpty()
    @IsNumber()
    stars: number;

    @IsEmpty()
    @IsNumber()
    productId: number

}
