import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Request } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
// import { Roles } from "../decorator/authorize.decorator";
import { verify } from "jsonwebtoken";
import { UsersService } from "../../users/users.service";
import { Roles } from "../common/user-roles.enum";

@Injectable()
export class AuthorizeGuard implements CanActivate {
    constructor(private reflector: Reflector, private usersService: UsersService) { }

    async canActivate(context: ExecutionContext) {
        try {
            // const allowedRoles = this.reflector.get(Roles, context.getHandler());
            const request = context.switchToHttp().getRequest();
            const token = request.cookies.token;
            if (!token) {
                throw new UnauthorizedException('Unauthorized');
            }

            const decoded = verify(token, 'Khder16') as { id: number; email: string };
            if (!decoded) {
                throw new UnauthorizedException();
            }

            const { id, email } = decoded;
            request.user = { id, email };
            const user = await this.usersService.findOne(id);

            if (user.roles[0] !== 'user') {
                throw new UnauthorizedException('Unauthorized only admins');
            }

            return true;
        } catch (error) {
            throw new UnauthorizedException('Unauthorized only admins');

        }
    }
}

