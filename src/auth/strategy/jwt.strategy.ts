import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../auth.interface";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                JwtStrategy.extractJWT,
                ExtractJwt.fromAuthHeaderAsBearerToken()
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_ACCESS_SECRET,
        })
    }

    async validate(payload: JwtPayload) {
        return {
            userId: payload.userId,
            email: payload.email,
            role: payload.role,
        }
    }

    private static extractJWT(req: any): string | null {

        if (req.body.refreshToken) {
          return req.body.refreshToken;
        }
        return null;
    }
}
