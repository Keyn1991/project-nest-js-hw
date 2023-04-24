import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

import { UserDto } from './dto/create-user.dto/create-user.dto';
import { PrismaService } from '../core/orm/prisma.service';
import { RegisterDto } from '../auth/dto/auth.dto';
@Injectable()
export class UsersService {
  private salt = 10;
  constructor(private readonly prismaService: PrismaService) {}

  async createUserByManager(usersData: UserDto): Promise<User> {
    const age = parseInt(usersData.age);
    const status = Boolean(usersData.status);
    return this.prismaService.user.create({
      data: {
        age,
        status,
        email: usersData.email,
        avatar: usersData.avatar,
      },
    });
  }
  async createUser(usersData: RegisterDto): Promise<User> {
    const passwordHash = await this.hashPassword(usersData.password);
    return this.prismaService.user.create({
      data: {
        email: usersData.email,
        password: passwordHash,
      },
    });
  }

  async hashPassword(password: string) {
    return bcrypt.hash(password, this.salt);
  }
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
        name: usersData.name,
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
    });
  }
  async findByUsername(userEmail: string) {
    return this.prismaService.user.findFirst({
      where: { email: userEmail },
    });
  }
  async findUserByEmail(userEmail: string) {
    return this.prismaService.user.findFirst({
      where: { email: userEmail },
    });
  }
}
