import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:'I9fpX8/p1tkqqnpwsdK2imk3SPC+1MTPOkHqT+ewIYk='
        })
    }

    async validate(payload){
        return {email: payload.email, password: payload.password, role:payload.role}
    }
}