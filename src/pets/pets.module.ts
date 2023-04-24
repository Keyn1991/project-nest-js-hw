import { forwardRef, Module } from '@nestjs/common';

import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';
import { UsersModule } from '../users/users.module';
import { PrismaService } from '../core/orm/prisma.service';
import { UsersService } from '../users/users.service';

@Module({
  imports: [PetsModule, forwardRef(() => UsersModule)],
  providers: [PetsService, PrismaService, UsersService],
  controllers: [PetsController],
  exports: [PetsService],
})
export class PetsModule {}
