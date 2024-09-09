import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Favorite } from "./favorite.entity";
import { Repository } from "typeorm";
import { UsersService } from "../users/users.service";

@Injectable()
export class FavoritesService {
  public constructor(
    @InjectRepository(Favorite) private readonly favoriteRepository: Repository<Favorite>,
    private readonly userService: UsersService,
  ) {}

  /**
   * Método para obtener todos los favoritos del usuario.
   * @param email Correo del usuario
   * @returns Lista de los favoritos del usuario
   */
  public async findAllByUser(email: string): Promise<Favorite[]> {
    try {
      const user = await this.userService.findByEmail(email);

      return await this.favoriteRepository.find({ where: { user } });
    } catch (error) {
      throw new HttpException("Error", HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Método para agregar un favorito a la lista del usuario
   * @param email Correo del usuario
   * @param itemId Identificador del Item de TMDB
   * @returns Favorito recién creado
   */
  public async addFavorite(email: string, itemId: number): Promise<Favorite> {
    try {
      const user = await this.userService.findByEmail(email);

      const favorite = this.favoriteRepository.create({ user, itemId });

      return await this.favoriteRepository.save(favorite);
    } catch (error) {
      throw new HttpException("Error", HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Método para eliminar un favorito de la base de datos.
   * @param email Correo del usuario
   * @param itemId Identificador del Item de TMDB
   */
  public async removeFavorite(email: string, itemId: number): Promise<void> {
    try {
      const user = await this.userService.findByEmail(email);

      await this.favoriteRepository.delete({ user, itemId });
    } catch (error) {
      throw new HttpException("Error", HttpStatus.BAD_REQUEST);
    }
  }
}
