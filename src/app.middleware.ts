import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AppMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    let allowedOrigins = ['http://localhost:3000'];
    console.log(req.header('Origin'));
    if (allowedOrigins.indexOf(req.header('Origin')) !== -1) {
      console.log('no Cors');
      res.header('Access-Control-Allow-Origin', req.header('Origin'));
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
      );

      res.header('Content-Type', 'application/json');
    }
    next();
  }
}
