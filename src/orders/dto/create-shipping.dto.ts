import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateShippingDto {

    @IsNotEmpty({ message: "Phone Number is required" })
    @IsString({ message: 'It should be string' })
    phone: string;

    @IsOptional()
    @IsString({ message: 'It should be string' })
    name: string;


    @IsNotEmpty({ message: "Address is required" })
    @IsString({ message: 'It should be string' })
    address: string;


    @IsNotEmpty({ message: "City is required" })
    @IsString({ message: 'It should be string' })
    city: string;

    @IsNotEmpty({ message: "PostCode is required" })
    @IsString({ message: 'It should be string' })
    postCode: string;

    @IsNotEmpty({ message: "State is required" })
    @IsString({ message: 'It should be string' })
    state: string;

    @IsNotEmpty({ message: "Country is required" })
    @IsString({ message: 'It should be string' })
    country: string;


}