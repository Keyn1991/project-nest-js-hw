import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('login')
  async login(@Res() res: any, @Body() body: LoginDto) {
    try {
      if (!body.email && !body.password) {
        return res
          .status(HttpStatus.FORBIDDEN)
          .json({ message: 'Error.Check_request_params' });
      }
      const findUser = await this.userService.findUserByEmail(body.email);
      if (!findUser) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: 'Email or password is incorrect' });
      }
      if (
        await this.authService.compareHash(body.password, findUser.password)
      ) {
        const token = await this.authService.singIn(findUser.id.toString());
        return res.status(HttpStatus.OK).json({ token });
      }
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Email or password is incorrect' });
    } catch (error) {
      console.error(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Internal Server Error',
      });
    }
  }

  @Post('register')
  async registerUser(@Res() res: any, @Body() body: RegisterDto) {
    let findUser;
    try {
      findUser = await this.userService.findUserByEmail(body.email.trim());
    } catch (err) {
      console.log(err);
    }
    if (findUser) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: 'User with this email is already exist' });
    }
    const user = await this.userService.createUser({
      name: body.name ? body.name : 'User',
      email: body.email,
      password: body.password,
    });

    if (user) {
      const token = await this.authService.singIn(user.id.toString());
      return res.status(HttpStatus.OK).json({ token });
    }

    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: 'Error.Register_user_failed' });
  }
}
