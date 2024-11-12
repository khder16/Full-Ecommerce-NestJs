import { PartialType } from '@nestjs/mapped-types';
import { CreateReatingDto } from './create-rating.dto';
import { IsString, IsNumber } from 'class-validator';

export class UpdateReatingDto extends PartialType(CreateReatingDto) {

    // @IsString()
    // comments: string;

    // @IsNumber()
    // stars: number;
}
