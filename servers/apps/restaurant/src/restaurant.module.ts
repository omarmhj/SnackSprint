import { Module } from '@nestjs/common';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { RestaurantResolver } from './restaurant.resolver';
import { ConfigModule } from '@nestjs/config';
import { MenuModule } from './menu/menu.module';
import { EmailService } from './email/email.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { SharedModule } from './shared/shared.module';
import { configuration, getEnvFilePath } from 'libs/config/configuration.util';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvFilePath(),
      load: [configuration],
      isGlobal: true,
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
    SharedModule,
    MenuModule,
  ],
  controllers: [RestaurantController],
  providers: [
    RestaurantService,
    RestaurantResolver,
    EmailService,
  ],
})
export class RestaurantModule {}
