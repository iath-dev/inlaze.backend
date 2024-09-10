import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import type { User } from "./user.entity";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  public constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: "Crear un nuevo usuario" })
  @ApiResponse({ status: 200, description: "Usuario creado correctamente" })
  @ApiResponse({ status: 400, description: "Error creando usuario" })
  public create(@Body() user: CreateUserDto): Promise<User> {
    try {
      return this.usersService.create(user.email, user.password, user.name);
    } catch (error) {
      throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
    }
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: "Buscar todos los usuario" })
  @ApiResponse({ status: 200, description: "Lista de usuarios" })
  @ApiResponse({ status: 500 })
  public findAll(): Promise<User[]> {
    try {
      return this.usersService.findAll();
    } catch (error) {
      throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
    }
  }

  @Get(":id")
  @HttpCode(200)
  @ApiOperation({ summary: "Obtener un usuario especifico" })
  @ApiResponse({ status: 200, description: "Usuario" })
  @ApiResponse({ status: 400, description: "Usuario no encontrado" })
  public findOne(@Param("id") id: number): Promise<User> {
    try {
      return this.usersService.findOne(id);
    } catch (error) {
      throw new HttpException("NotFound", HttpStatus.NOT_FOUND);
    }
  }

  @Put(":id")
  @HttpCode(200)
  @ApiOperation({ summary: "Actualizar un Usuario" })
  @ApiResponse({ status: 200, description: "Usuario actualizado" })
  @ApiResponse({ status: 400, description: "Error actualizando usuario usuario" })
  public update(@Param("id") id: number, @Body() user: UpdateUserDto): Promise<User | null> {
    try {
      return this.usersService.update(id, user);
    } catch (error) {
      throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
    }
  }

  @Delete(":id")
  @HttpCode(200)
  @ApiOperation({ summary: "Eliminar usuario" })
  @ApiResponse({ status: 200, description: "Usuario eliminado correctamente" })
  @ApiResponse({ status: 400, description: "Error eliminando usuario" })
  public softDelete(@Param("id") id: number): Promise<void> {
    try {
      return this.usersService.delete(id);
    } catch (error) {
      throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
    }
  }
}
