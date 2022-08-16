import { AuthGuard } from '@nestjs/passport';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
}
