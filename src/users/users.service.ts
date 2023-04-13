import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { UserDto } from './dto/create-user.dto/create-user.dto'
import {PrismaService} from "../core/orm/prisma.service";
@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {
  }

  async create(usersData: UserDto): Promise<User> {
      return  this.prismaService.user.create({
        data: {
          firstName: usersData.firstName,
          lastName: usersData.lastName,
          age: usersData.age,
          status: usersData.status,
        }
      })
  }

  async findAll(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }
  async findOne(id: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });
  }
  async update(id: string, user: UserDto): Promise<User> {
    return this.prismaService.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        status: user.status,
      },
    });
  }
  async remove(id: string): Promise<User> {
    return this.prismaService.user.delete({
      where: {
        id: parseInt(id),
      },
    });
  }
}