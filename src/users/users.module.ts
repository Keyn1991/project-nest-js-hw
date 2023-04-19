import {forwardRef, Module} from '@nestjs/common';
import { PrismaService } from '../core/orm/prisma.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { PetsModule } from '../pets/pets.module';


@Module({
  imports: [forwardRef(() => PetsModule)],
  providers: [UsersService, PrismaService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
