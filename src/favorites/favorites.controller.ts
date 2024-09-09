import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { AuthRequest, JwtAuthGuard } from "../auth/jwt-auth.guard";
import type { Favorite } from "./favorite.entity";
import { FavoritesService } from "./favorites.service";
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from "@nestjs/swagger";

@ApiTags("Favorites")
@UseGuards(JwtAuthGuard)
@Controller("favorites")
export class FavoritesController {
  public constructor(private readonly favoriteService: FavoritesService) {}

  @Get()
  @HttpCode(200)
  @ApiBearerAuth("JWT Token")
  @ApiOperation({ summary: "Obtener favoritos" })
  @ApiResponse({ status: 200, description: "Lista de favoritos" })
  @ApiResponse({ status: 400, description: "Error obteniendo los favoritos" })
  public async getFavorites(@Request() req: AuthRequest): Promise<Favorite[]> {
    try {
      return await this.favoriteService.findAllByUser(req.user.email!);
    } catch (error) {
      throw new HttpException("Error!", HttpStatus.BAD_GATEWAY);
    }
  }

  @HttpCode(200)
  @Post(":itemId")
  @ApiBearerAuth("JWT Token")
  @ApiOperation({ summary: "Agregar un nuevo favorito" })
  @ApiResponse({ status: 200, description: "Favorito agregado correctamente" })
  @ApiResponse({ status: 400, description: "Error registrando favorito" })
  public async addFavorites(
    @Request() req: AuthRequest,
    @Param("itemId") itemId: number,
  ): Promise<Favorite> {
    try {
      return await this.favoriteService.addFavorite(req.user.email!, itemId);
    } catch (error) {
      throw new HttpException("Error!", HttpStatus.BAD_GATEWAY);
    }
  }

  @HttpCode(200)
  @Delete(":itemId")
  @HttpCode(200)
  @ApiBearerAuth("JWT Token")
  @ApiOperation({ summary: "Eliminar un favorito" })
  @ApiResponse({ status: 200, description: "Favorito eliminado correctamente" })
  @ApiResponse({ status: 400, description: "Error eliminado favorito" })
  public async removeFavorites(
    @Request() req: AuthRequest,
    @Param("itemId") itemId: number,
  ): Promise<void> {
    try {
      await this.favoriteService.removeFavorite(req.user.email!, itemId);
    } catch (error) {
      throw new HttpException("Error!", HttpStatus.BAD_GATEWAY);
    }
  }
}
