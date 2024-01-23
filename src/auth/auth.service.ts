import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async register(registerDto: RegisterDto) {
    const user = await this.usersService.findOne(registerDto.email);
    if (user) {
      throw new BadRequestException('User already exists');
    }
    return await this.usersService.create(registerDto);
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findOnebyPassword(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('User is wrong');
    }
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    console.log(isPasswordValid);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Passord is wrong');
    }
    const payload = { email: user.email, role: user.role, id: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
      email: user.email,
    };
  }
  async profile(_userPayload) {
    const user = await this.usersService.findOne(_userPayload.email);
    if (!user) {
      throw new BadRequestException('User does not exists');
    }
    return user;
  }
}
