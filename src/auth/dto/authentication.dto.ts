import { IsEmail, IsNotEmpty, IsString, Min, MinLength } from "class-validator";

export class Authentecation {


    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;
}