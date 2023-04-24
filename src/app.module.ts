import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PetsModule } from './pets/pets.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

import { PrismaModule } from './core/orm/prisma.module';

@Module({
  imports: [UsersModule, PetsModule, PrismaModule],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService, PrismaModule],
})
export class AppModule {}
