import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GqlExecutionContext } from "@nestjs/graphql";


@Injectable()
export class GqlAuthGuard extends AuthGuard('local') {
    constructor() {
        super()
    }

    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        const request = ctx.getContext() ;
        const arg = ctx.getArgs() as { loginInput: { email: string, passport: string } };
        request.body = arg.loginInput;
        return request
    }
}
