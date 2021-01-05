import { Injectable } from '@nestjs/common';

export interface User {
  id: string;
  username: string;
  password: string;
}

@Injectable()
export class UsersService {
  private users = [
    {
      id: '0',
      username: 'john',
      password: 'changeme',
    },
    {
      id: '1',
      username: 'maria',
      password: 'guess',
    },
  ];

  async findByUsername(username: string): Promise<User> {
    return this.users.find((user) => user.username === username);
  }

  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }

  async create(username: string, password: string): Promise<User> {
    const user: User = {
      id: `${this.users.length}`,
      username,
      password,
    };
    this.users.push(user);
    return user;
  }

  async remove(id): Promise<User | undefined> {
    const user = await this.findById(id);
    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    }
    return user;
  }

  async update(id, payload): Promise<User | undefined> {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users[index] = { id, ...payload };
    }
    return this.users[index];
  }

  async getAll() {
    return this.users.map((user) => ({
      id: user.id,
      username: user.username,
    }));
  }

  async getById(id: string) {
    const user = await this.findById(id);
    return {
      id: user.id,
      username: user.username,
    };
  }
}
