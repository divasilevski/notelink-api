import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AppMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    let allowedOrigins = ['http://localhost:3000'];
    if (allowedOrigins.indexOf(req.header('Origin')) !== -1) {
      res.header('Access-Control-Allow-Origin', req.header('Origin'));
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
      );

      res.header('Content-Type', 'application/json');
    }
    next();
  }
}
