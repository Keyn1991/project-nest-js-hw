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

  findOne(id: number) {
    return this.users[id];
  }

  update(id: number, user: any) {
    this.users[id] = user;
  }

  remove(id: number) {
    this.users.splice(id, 1);
  }
}
