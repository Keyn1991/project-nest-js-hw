import {
  Body,
  Controller,
  Delete,
  Get, HttpStatus,
  Param,
  Post,
  Put, Req, Res,
} from '@nestjs/common';
import {ApiCreatedResponse, ApiResponse, ApiTags} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserDto } from './dto/create-user.dto/create-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @ApiCreatedResponse({
  //   description: 'The record has been successfully created.',
  //   type: User,
  // })
  @Post()
  async create(
      @Req() req: any,
      @Res() res: any,
      @Body() createUserDto: UserDto
  ) {
    return res
        .status(HttpStatus.CREATED)
        .send(await this.usersService.create(createUserDto))
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put('/:id')
  async update(
      @Req() req: any,
      @Res() res: any,
      @Param('id') id: string,
      @Body() updateUserDto: UserDto) {
    console.log("user is update");
    return res
        .status(HttpStatus.OK)
        .send(await this.usersService.update(id, updateUserDto))
  }

  @Delete('/:id')
  async remove(
      @Req() req: any,
      @Res() res: any,
      @Param('id') id: string,
      ) {
    console.log("user is delete");
    return res
        .status(HttpStatus.OK)
        .send(await this.usersService.remove(id));

  }
}
