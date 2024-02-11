import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../auth.interface";


@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                RefreshJwtStrategy.extractJWT,
                ExtractJwt.fromAuthHeaderAsBearerToken()
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_REFRESH_SECRET,
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
