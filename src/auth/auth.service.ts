import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    const match = bcrypt.compare(pass, user.password);
    if (user && match) {
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
      const hash = await bcrypt.hash(user.password, 10);
      return this.usersService.create(user.username, hash);
    } else {
      return new ConflictException();
    }
  }
}

/** TO DO:
 * 1. Регистрация +
 * 2. Вывод всех пользователей +
 * 3. Вывод пользователей по id +
 * 4. Апдейт пользователя +
 * 5. Изменить жизнь аксесс токена
 * 6. Попробовать залить на Glitch и протестить там рботу
 * 7. Закодировать пароли пользователей +
 * 8. Валидация и обработка ошибок (проверка на уникальность пользователя)
 * 9. Залить пользователей в базу данных
 * 10. Разделение ролей обычный пользователь и премиум пользователь
 */
