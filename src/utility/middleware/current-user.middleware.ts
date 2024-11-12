import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { isArray } from "class-validator";
import { error } from "console";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { UsersService } from "src/users/users.service";
@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(private usersService: UsersService) { }
    async use(req: Request, res: Response, next: NextFunction) {
        try {
            // const token = req.cookies.token;
            // if (!token) {
            //     throw new UnauthorizedException()
            // }
            // const decoded = verify(token, 'Khder16')
            // if (!decoded) {
            //     throw new UnauthorizedException();
            // }
            // const { id, email } = decoded;
            // const user = await this.usersService.findOne(id)
            next();
        } catch (error) {
            console.log(error);
        }
    }
}