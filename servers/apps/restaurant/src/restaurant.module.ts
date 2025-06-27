import { Module } from '@nestjs/common';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { RestaurantResolver } from './restaurant.resolver';
import { PrismaService } from "../prisma/prisma.service"
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MenuModule } from './menu/menu.module';
import { EmailService } from './email/email.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: '3d',
        },
      }),
      inject: [ConfigService],
    }),
    MenuModule,
  ],
  controllers: [RestaurantController],
  providers: [
    RestaurantService,
    RestaurantResolver,
    PrismaService,
    EmailService,
  ],
})
export class RestaurantModule {}
