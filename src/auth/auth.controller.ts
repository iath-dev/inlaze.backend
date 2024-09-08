import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import type { User } from "../users/user.entity";
import { JwtAuthGuard } from "./jwt-auth.guard";

@Controller("auth")
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  public constructor(private readonly authService: AuthService) {}

  @Post("login")
  public async login(
    @Body() body: { email: string; password: string },
  ): Promise<{ access_token: string; refresh_token: string }> {
    try {
      return await this.authService.login(body.email, body.password);
    } catch (error) {
      throw new HttpException("Error", HttpStatus.BAD_REQUEST);
    }
  }

  @Post("register")
  public async register(@Body() body: { email: string; password: string }): Promise<User> {
    try {
      return await this.authService.register(body.email, body.password);
    } catch (error) {
      throw new HttpException("Error", HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post("refresh")
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
