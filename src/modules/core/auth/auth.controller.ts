import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './models/dto/login.dto';
import { AuthResponseDto } from './models/dto/auth-response.dto';
import { RefreshTokenDto } from './models/dto/refresh-token.dto';
import { Public } from '../../shared/decorators/is-public.decorator';
import { JwtRefreshGuard } from '../../shared/guards/jwt-refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(
    @Body(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    signUpRequest: LoginDto,
  ): Promise<AuthResponseDto> {
    return this.authService.signUp(signUpRequest);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    loginRequest: LoginDto,
  ): Promise<AuthResponseDto> {
    return this.authService.login(loginRequest);
  }

  @Public()
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() body: { refreshToken: string }) {
    return this.authService.refreshTokens(body.refreshToken);
  }
}