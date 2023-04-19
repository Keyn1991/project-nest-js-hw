import {forwardRef, Module} from '@nestjs/common';

import { PetsController } from "./pets.controller";
import { PetsService } from "./pets.service";
import { UsersModule } from "../users/users.module";
import { PrismaService } from "../core/orm/prisma.service";

@Module({
  imports: [forwardRef(() => UsersModule)],
  providers: [PetsService, PrismaService],
  controllers: [PetsController],
  exports: [PetsService],
})
export class PetsModule {}
