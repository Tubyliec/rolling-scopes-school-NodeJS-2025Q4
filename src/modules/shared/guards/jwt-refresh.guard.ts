import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt-refresh') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { refreshToken } = request.body;

    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token provided');
    }

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw new ForbiddenException('Invalid or expired refresh token');
    }
    return user;
  }
}
