import type { ExecutionContext } from "@nestjs/common";
import { Injectable, Logger } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import type { User } from "../users/user.entity";
import type { Observable } from "rxjs";

export interface AuthRequest extends Request {
  user: Partial<User>;
}

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  private readonly logger = new Logger(JwtAuthGuard.name);

  public override canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    this.logger.log(`Logger Headers: ${JSON.stringify(request.headers)}`);
    this.logger.log(`Logger Method: ${JSON.stringify(request.method)}`);
    this.logger.log(`Logger URL: ${JSON.stringify(request.url)}`);

    return super.canActivate(context) as boolean;
  }
}
