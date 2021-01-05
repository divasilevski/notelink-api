import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: any) {
    const find = await this.usersService.findByUsername(user.username);
    if (!find) {
      const created = await this.usersService.create(
        user.username,
        user.password,
      );
      return created;
    } else {
      return {
        status: 400,
        message: 'Пользователь с таким username уже существует',
      };
    }
  }
}

/** TO DO:
 * 1. Регистрация
 * 2. Вывод всех пользователей
 * 3. Вывод пользователей по id
 * 4. Поиск пользователей
 * 5. Проверка жизни аксесс токена
 * 6. Попробовать залить на Glitch и протестить там рботу
 * 7. Закодировать пароли пользователей
 * 8. Валидация и обработка ошибок (проверка на уникальность пользователя)
 * 9. Залить пользователей в базу данных
 * 10. Разделение ролей обычный пользователь и премиум пользователь
 */
