import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class UserSignInDto {

    @IsNotEmpty({ message: 'Name can not be null' })
    @IsEmail({}, { message: 'Enter a valid email' })
    email: string;


    @IsNotEmpty({ message: 'Password is not empty' })
    @MinLength(6, { message: 'Password atleast 6 character' })
    password: string;

}