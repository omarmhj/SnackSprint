import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

export class TokenSender {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  async sendToken(restaurant: any) {
    const accessToken = this.jwtService.sign(
      { id: restaurant.id },
      {
        secret: this.configService.get<string>("JWT_SECRET_KEY"),
        expiresIn: "5m",
      }
    );

    const refreshToken = this.jwtService.sign(
      { id: restaurant.id },
      {
        secret: this.configService.get<string>("JWT_REFRESH_TOKEN"),
        expiresIn: "3d",
      }
    );

    return {
      restaurant,
      accessToken,
      refreshToken,
    };
  }
} 