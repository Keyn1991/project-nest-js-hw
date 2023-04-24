import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { UserDto } from './dto/create-user.dto/create-user.dto';
import { PrismaService } from '../core/orm/prisma.service';
@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(usersData: UserDto): Promise<User> {
    const age = parseInt(usersData.age);
    const status = Boolean(usersData.status);
    return this.prismaService.user.create({
      data: {
        firstName: usersData.firstName,
        lastName: usersData.lastName,
        age,
        status,
        avatar: usersData.avatar,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return this.prismaService.user.findMany({
      orderBy: {
        firstName: 'asc',
      },
      take: 5,
    });
  }
  async findOne(userId: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: {
        id: parseInt(userId),
      },
    });
  }
  async update(userId: string, user: UserDto): Promise<User> {
    const age = parseInt(user.age);
    const status = Boolean(user.status);
    return this.prismaService.user.update({
      where: {
        id: parseInt(userId),
      },
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        age,
        status,
      },
    });
  }
  async remove(userId: string): Promise<User> {
    return this.prismaService.user.delete({
      where: {
        id: parseInt(userId),
      },
    });
  }

  async getUserById(userId: string) {
    return this.prismaService.user.findFirst({
      where: { id: Number(userId) },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        age: true,
      },
    });
  }
}
