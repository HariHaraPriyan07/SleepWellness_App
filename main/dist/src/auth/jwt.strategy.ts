import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.OKTA_ISSUER}/v1/keys`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: process.env.OKTA_AUDIENCE,
      issuer: process.env.OKTA_ISSUER,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: any) {
    return { 
      sub: payload.sub, 
      email: payload.email,
      name: payload.name 
    };
  }
}