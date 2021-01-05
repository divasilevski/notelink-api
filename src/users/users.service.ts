import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

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

  // users.controller
  async getAll() {
    return this.users.map((user) => ({
      id: user.id,
      username: user.username,
      password: user.password,
    }));
  }

  async getById(id: string) {
    const user = await this.findById(id);
    if (!user) return new NotFoundException();
    return {
      id: user.id,
      username: user.username,
    };
  }

  async update(id, payload) {
    const index = this.users.findIndex((user) => user.id === id);

    for (const key of Object.keys(payload)) {
      if (key === 'username') {
        const user = await this.findByUsername(payload.username);
        if (!user) this.users[index].username = payload.username;
        else return new ConflictException();
      } else if (key === 'password') {
        this.users[index].password = payload.password;
      }
    }

    return this.users[index];
  }
}
