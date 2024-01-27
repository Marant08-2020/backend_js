import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-users';
import { AccessTokenInterface } from 'src/common/interfaces/acces-token.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @ApiBody({ type: CreateUserDto })
  @Post('register/users')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
  @Post('/users/login')
  login(@Body() loginDto: LoginDto): Promise<AccessTokenInterface> {
    return this.authService.login(loginDto);
  }
}
