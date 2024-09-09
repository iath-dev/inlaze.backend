import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "../users/users.module";
import { User } from "../users/user.entity";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "../auth/auth.module";
import { Favorite } from "../favorites/favorite.entity";
import { FavoritesModule } from "../favorites/favorites.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "../data/db.sqlite",
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
  controllers: [],
  providers: [],
})
export class AppModule {}
