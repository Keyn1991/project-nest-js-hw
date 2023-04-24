import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserDto } from './dto/create-user.dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {
  editFileName,
  imageFileFilter,
} from '../core/file-uploade/file-uploade';
import { PetsService } from '../pets/pets.service';
import { PetDto } from '../pets/dto/pet.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => PetsService))
    private readonly petsService: PetsService,
  ) {}

  @Get()
  async findAll(@Req() req: any, @Res() res: any) {
    return res.status(HttpStatus.OK).json(await this.usersService.findAll());
  }
  @UseGuards(AuthGuard())
  @Get()
  async getUsersList(@Req() req: any, @Res() res: any) {
    console.log(req);
    return res.status(HttpStatus.OK).json(await this.usersService.findAll());
  }
  @ApiParam({ name: 'userId', required: true })
  @Get('/:userId')
  async findOne(
    @Param('userId') userId: string,
    @Req() req: any,
    @Res() res: any,
  ) {
    return res
      .status(HttpStatus.OK)
      .json(await this.usersService.findOne(userId));
  }
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async create(
    @Req() req: any,
    @Res() res: any,
    @Body() body: UserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      body.avatar = `public/${file.filename}`;
    }
    return res
      .status(HttpStatus.CREATED)
      .json(await this.usersService.create(body));
  }
  @ApiParam({ name: 'userId', required: true })
  @Put('/:userId')
  async update(
    @Req() req: any,
    @Res() res: any,
    @Param('userId') userId: string,
    @Body() updateUserDto: UserDto,
  ) {
    console.log('user is update');
    return res
      .status(HttpStatus.OK)
      .json(await this.usersService.update(userId, updateUserDto));
  }

  @Delete('/:userId')
  async remove(
    @Req() req: any,
    @Res() res: any,
    @Param('userId') userId: string,
  ) {
    console.log('user is delete');
    return res
      .status(HttpStatus.OK)
      .send(await this.usersService.remove(userId));
  }
  @Post('/animals/:userId')
  async addNewPet(
    @Req() req: any,
    @Res() res: any,
    @Body() body: PetDto,
    @Param('userId') userId: string,
  ) {
    const user = await this.usersService.getUserById(userId);
    if (!user) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ massage: `User with id ${userId} not fount` });
    }
    return res
      .status(HttpStatus.OK)
      .json(await this.petsService.createAnimal(body, userId));
  }
}
