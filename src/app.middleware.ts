import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AppMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    let allowedOrigins = ['http://localhost:3000'];
    if (allowedOrigins.indexOf(req.header('Origin')) !== -1) {
      res.header('Access-Control-Allow-Origin', req.header('Origin'));
      res.header('Access-Control-Allow-Headers', 'content-type');
      res.header('Access-Control-Allow-Methods', 'POST');
    }
    next();
  }
}
