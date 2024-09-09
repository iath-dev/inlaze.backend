import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import type { User } from "../users/user.entity";

export interface AuthRequest extends Request {
  user: Partial<User>;
}

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {}
