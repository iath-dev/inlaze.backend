import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import type { User } from "../users/user.entity";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  public constructor(private readonly authService: AuthService) {}

  @Post("login")
  @HttpCode(200)
  @ApiOperation({ summary: "Iniciar sesión" })
  @ApiResponse({ status: 200, description: "Inicio de session exitoso" })
  @ApiResponse({ status: 400, description: "Error iniciando session" })
  public async login(
    @Body() body: { email: string; password: string },
  ): Promise<{ email: string; id: number; access_token: string; refresh_token: string }> {
    try {
      return await this.authService.login(body.email, body.password);
    } catch (error) {
      throw new HttpException("Error", HttpStatus.BAD_REQUEST);
    }
  }

  @Post("register")
  @HttpCode(200)
  @ApiOperation({ summary: "Registrar un nuevo" })
  @ApiResponse({ status: 200, description: "Usuario registrado correctamente" })
  @ApiResponse({ status: 400, description: "Error creando usuario" })
  public async register(
    @Body() body: { name: string; email: string; password: string },
  ): Promise<User> {
    try {
      return await this.authService.register(body.name, body.email, body.password);
    } catch (error) {
      throw new HttpException("Error", HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post("refresh")
  @HttpCode(200)
  @ApiBearerAuth("JWT Token")
  @ApiOperation({ summary: "Refrescar sesión" })
  @ApiResponse({ status: 200, description: "Nuevos tokens creados" })
  @ApiResponse({ status: 400, description: "Error iniciando sesión" })
  public async refresh(
    @Body() body: { refresh_token: string },
  ): Promise<{ access_token: string; refresh_token: string }> {
    try {
      return await this.authService.refresh(body.refresh_token);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException("Error", HttpStatus.BAD_REQUEST);
    }
  }
}
