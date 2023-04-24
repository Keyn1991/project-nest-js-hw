import { Response } from 'express';
import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {
  editFileName,
  imageFileFilter,
} from '../core/file-uploade/file-uploade';
import { PetDto } from './dto/pet.dto';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  async createPet(
    @Body() petDto: PetDto,
    @Param('userId') userId: string,
    @Res() res: Response,
  ) {
    try {
      const pet = await this.petsService.createAnimal(petDto, userId);
      return res.status(201).json({ data: pet });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Something went wrong.' });
    }
  }

  @Patch()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 },
        { name: 'logo', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './public/animals',
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      },
    ),
  )
  async updatePet(
    @Req() req: any,
    @Res() res: any,
    @Body() body: any,
    @UploadedFile()
    files: { image?: Express.Multer.File[]; logo?: Express.Multer.File[] },
  ) {
    if (files?.image) {
      body.image = `/public/animals/${files.image[0].filename}`;
    }
    if (files?.logo) {
      body.logo = `/public/animals/${files.logo[0].filename}`;
    }
    return res
      .status(HttpStatus.OK)
      .json(await this.petsService.updateAnimal(body));
  }
  // @Patch(':id')
  // async updatePet(req: Request, res: Response, @Param('id') id: number) {
  //     try {
  //         const pet = await this.petsService.update(id, req.body);
  //         return res.status(200).json({ data: pet });
  //     } catch (error) {
  //         console.error(error);
  //         return res.status(500).json({ error: 'Something went wrong.' });
  //     }
  // }

  // @Get(':id')
  // async findOnePet(req: Request, res: Response, @Param('id') id: number) {
  //     try {
  //         const pet = await this.petsService.findOne(id);
  //         if (!pet) return res.status(404).json({ error: 'Pet not found' });
  //         return res.status(200).json({ data: pet });
  //     } catch (error) {
  //         console.error(error);
  //         return res.status(500).json({ error: 'Something went wrong.' });
  //     }
  // }

  // @Get()
  // async findManyPets(req: Request, res: Response) {
  //     try {
  //         const pets = await this.petsService.findMany();
  //         return res.status(200).json({ data: pets });
  //     } catch (error) {
  //         console.error(error);
  //         return res.status(500).json({ error: 'Something went wrong.' });
  //     }
  // }
  //
  // @Delete(':id')
  // async deletePet(req: Request, res: Response, @Param('id') id: number) {
  //     try {
  //         const pet = await this.petsService.delete(id);
  //         return res.status(200).json({ data: pet });
  //     } catch (error) {
  //         console.error(error);
  //         return res.status(500).json({ error: 'Something went wrong.' });
  //     }
  // }
}
