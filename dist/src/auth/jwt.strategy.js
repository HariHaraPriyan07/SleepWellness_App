"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../prisma/prisma.service");
const jwksClient = require("jwks-rsa");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(configService, prisma) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKeyProvider: (request, rawJwtToken, done) => {
                const client = jwksClient({
                    jwksUri: `${configService.get('OKTA_DOMAIN')}/oauth2/default/v1/keys`,
                });
                const decoded = JSON.parse(Buffer.from(rawJwtToken.split('.')[0], 'base64').toString());
                client.getSigningKey(decoded.kid, (err, key) => {
                    if (err) {
                        return done(err, null);
                    }
                    const signingKey = key.getPublicKey();
                    done(null, signingKey);
                });
            },
            audience: configService.get('OKTA_AUDIENCE'),
            issuer: `${configService.get('OKTA_DOMAIN')}/oauth2/default`,
        });
        this.configService = configService;
        this.prisma = prisma;
    }
    async validate(payload) {
        const { sub: oktaId, email } = payload;
        if (!oktaId) {
            throw new common_1.UnauthorizedException('Invalid token payload');
        }
        let user = await this.prisma.user.findUnique({
            where: { oktaId },
        });
        if (!user) {
            user = await this.prisma.user.create({
                data: {
                    oktaId,
                    email: email || `${oktaId}@unknown.com`,
                },
            });
        }
        return user;
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, prisma_service_1.PrismaService])
], JwtStrategy);
//# sourceMappingURL=jwt.strategy.js.map