// types/express.d.ts
import 'express';

declare global {
  namespace Express {
    interface Response {
      helmet: any;
    }
  }
}