import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { AuthRequest, JwtAuthGuard } from "../auth/jwt-auth.guard";
import type { Favorite } from "./favorite.entity";
import { FavoritesService } from "./favorites.service";

@UseGuards(JwtAuthGuard)
@Controller("favorites")
export class FavoritesController {
  public constructor(private readonly favoriteService: FavoritesService) {}

  @Get()
  public async getFavorites(@Request() req: AuthRequest): Promise<Favorite[]> {
    try {
      return await this.favoriteService.findAllByUser(req.user.email!);
    } catch (error) {
      throw new HttpException("Error!", HttpStatus.BAD_GATEWAY);
    }
  }

  @Post()
  public async addFavorites(
    @Request() req: AuthRequest,
    @Body("itemId") itemId: number,
  ): Promise<Favorite> {
    try {
      return await this.favoriteService.addFavorite(req.user.email!, itemId);
    } catch (error) {
      throw new HttpException("Error!", HttpStatus.BAD_GATEWAY);
    }
  }

  @HttpCode(200)
  @Delete()
  public async removeFavorites(
    @Request() req: AuthRequest,
    @Body("itemId") itemId: number,
  ): Promise<void> {
    try {
      await this.favoriteService.removeFavorite(req.user.email!, itemId);
    } catch (error) {
      throw new HttpException("Error!", HttpStatus.BAD_GATEWAY);
    }
  }
}
