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

  async createUserByManager(userData: UserDto): Promise<User> {
    return this.prismaService.user.create({
      data: {
        name: userData.name,
        status: userData.status,
        age: userData.age,
        email: userData.email,
        avatar: userData.avatar,
      },
    });
  }
  async createUser(userData: RegisterDto): Promise<User> {
    const passwordHash = await this.hashPassword(userData.password);
    return this.prismaService.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: passwordHash,
      },
    });
  }

  async hashPassword(password: string) {
    return bcrypt.hash(password, this.salt);
  }
  async create(userData: UserDto): Promise<User> {
    return this.prismaService.user.create({
      data: {
        name: userData.name,
        status: userData.status,
        age: userData.age,
        email: userData.email,
        avatar: userData.avatar,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return this.prismaService.user.findMany({
      orderBy: {
        name: 'asc',
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
    return this.prismaService.user.update({
      where: {
        id: parseInt(userId),
      },
      data: {
        name: user.name,
        status: user.status,
        age: user.age,
        email: user.email,
        avatar: user.avatar,
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
