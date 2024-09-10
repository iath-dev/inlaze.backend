import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "../users/users.module";
import { ConfigService } from "@nestjs/config";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "../auth/auth.module";
import { FavoritesModule } from "../favorites/favorites.module";
import { User } from "../users/user.entity";
import { Favorite } from "../favorites/favorite.entity";
import { AppController } from "./app.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        url: configService.get<string>("POSTGRES_URL"),
        entities: [User, Favorite],
        synchronize: true,
      }),
    }),
    UsersModule,
    AuthModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
