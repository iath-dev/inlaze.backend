import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import type { User } from "../users/user.entity";

@Controller("auth")
export class AuthController {
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

  @Post("refresh")
  public async refresh(
    @Body() body: { refresh_token: string },
  ): Promise<{ access_token: string; refresh_token: string }> {
    try {
      return await this.authService.refresh(body.refresh_token);
    } catch (error) {
      throw new HttpException("Error", HttpStatus.BAD_REQUEST);
    }
  }
}
