import { forwardRef, Module } from '@nestjs/common';
import { PrismaService } from '../core/orm/prisma.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { PetsModule } from '../pets/pets.module';
import { PrismaModule } from '../core/orm/prisma.module';
import { PetsService } from '../pets/pets.service';

@Module({
  imports: [PrismaModule, forwardRef(() => PetsModule)],
  controllers: [UsersController],
  providers: [UsersService, PetsService, PrismaService],
})
export class UsersModule {}
