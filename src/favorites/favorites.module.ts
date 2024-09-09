import { Module } from "@nestjs/common";
import { FavoritesController } from "./favorites.controller";
import { FavoritesService } from "./favorites.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Favorite } from "./favorite.entity";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [TypeOrmModule.forFeature([Favorite]), UsersModule],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
