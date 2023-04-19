import {forwardRef, HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';

import { Pets } from '@prisma/client';
import { PrismaService } from '../core/orm/prisma.service';
import {PetDto} from "./dto/pet.dto";
import {UsersService} from "../users/users.service";

@Injectable()
export class PetsService {

  constructor(
      @Inject(forwardRef(() => UsersService))
      private readonly prismaService: PrismaService,
      private readonly userService: UsersService,
  ) {
  }

  async createAnimal(data: PetDto, userId: string) {
    const user = await this.checkUser(userId)

    return this.prismaService.pets.create({
      data: {
        name: data.name,
        type: data.type,
        status: data.status,
        ownerId: user.id,
        image: data.image,
        logo: data.logo,
      },
    });
  }


  async checkUser(userId: string) {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      return null;
    }
    return user;
  }

  async updateAnimal(data: any): Promise<Pets> {


    return this.prismaService.pets.create({
      data: {
        name: data.name,
        type: data.type,
        status: data.status,
        ownerId: data.ownerId,
        image: data.image,
        logo: data.logo,
      },
    });
  }
}
//   async findAll(): Promise<Pets[]> {
//     return this.prismaService.pets.findMany({
//       include: { owner: true },
//     });
//   }
//
//   async findOne(id: number) {
//     return this.prismaService.pets.findUnique({
//       where: { id },
//       include: { owner: true },
//     });
//   }
//
// }