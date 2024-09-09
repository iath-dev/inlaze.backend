import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "../users/users.module";
import { User } from "../users/user.entity";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "../auth/auth.module";
import { Favorite } from "src/favorites/favorite.entity";
import { FavoritesModule } from "../favorites/favorites.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "db.sqlite",
      entities: [User, Favorite],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    FavoritesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
