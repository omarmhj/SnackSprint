import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGuard } from '../guards/auth.guard';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: '3d',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [PrismaService, AuthGuard],
  exports: [JwtModule, PrismaService, AuthGuard],
})
export class SharedModule {} 