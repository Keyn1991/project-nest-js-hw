import { Injectable } from '@nestjs/common';
@Injectable()
export class UsersService {
  private readonly users: any[] = [];

  create(user: any) {
    this.users.push(user);
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    return this.users[id];
  }

  update(id: string, user: any) {
    this.users[id] = user;
  }

  remove(id: string) {
    this.users.splice(Number(id), 1);
  }
}
