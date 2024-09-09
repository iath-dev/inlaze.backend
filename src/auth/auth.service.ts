import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcryptjs";
import type { User } from "../users/user.entity";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  public constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(email: string, password: string): Promise<Partial<User> | null> {
    const user = await this.userService.findByEmail(email);
    if (await bcrypt.compare(password, user.password)) {
      const { email, id } = user;

      return { email, id };
    }

    return null;
  }

  public async login(
    email: string,
    password: string,
  ): Promise<{ email: string; id: number; access_token: string; refresh_token: string }> {
    const user = await this.validateUser(email, password);

    if (!user) throw new HttpException("Error", HttpStatus.BAD_REQUEST);

    return {
      id: user.id!,
      email: user.email!,
      access_token: this.jwtService.sign(user),
      refresh_token: this.jwtService.sign(user, { expiresIn: "7d" }),
    };
  }

  public async register(name: string, email: string, password: string): Promise<User> {
    return this.userService.create(email, password, name);
  }

  public async refresh(
    refreshToken: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    try {
      const payload = this.jwtService.verify(refreshToken) as { email: string; id: number };
      const user = await this.userService.findByEmail(payload.email);

      return {
        access_token: this.jwtService.sign({ email: user.email }, { expiresIn: "60m" }),
        refresh_token: this.jwtService.sign({ email: user.email }, { expiresIn: "7d" }),
      };
    } catch (error) {
      this.logger.error(error);
      throw new UnauthorizedException("Invalid refresh token");
    }
  }
}
