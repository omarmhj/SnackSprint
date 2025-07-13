import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    const accessToken = req.headers.accesstoken as string;
    const refreshToken = req.headers.refreshtoken as string;

    if (!accessToken || !refreshToken) {
      return false;
    }

    try {
      const decoded = this.jwtService.verify(accessToken, {
        secret: this.configService.get<string>("ACCESS_TOKEN_SECRET"),
      });

      const restaurant = await this.prisma.restaurant.findUnique({
        where: {
          id: decoded.id,
        },
      });

      if (!restaurant) {
        return false;
      }

      req.restaurant = restaurant;
      req.accesstoken = accessToken;
      req.refreshtoken = refreshToken;

      return true;
    } catch (error) {
      return false;
    }
  }
} 