import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { matchRoles } from '../../utils';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log(roles);
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userRole = request.user.type;
    console.log(userRole);
    return matchRoles(roles, userRole);
  }
}
