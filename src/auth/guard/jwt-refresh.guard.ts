import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GqlExecutionContext } from "@nestjs/graphql";


@Injectable()
export class RefreshJwtGuard extends AuthGuard('jwt-refresh') {
    constructor() {
        super()
    }

    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        const request = ctx.getContext().req;
        return request
    }
}
