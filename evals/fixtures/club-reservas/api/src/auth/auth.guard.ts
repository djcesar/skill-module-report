import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC } from './public.decorator';
import { verifyToken } from './token';

// Guard global: exige un token válido salvo en rutas marcadas con @Public().
// Solo autentica: no revisa el rol del usuario.
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [ctx.getHandler(), ctx.getClass()]);
    if (isPublic) return true;
    const req = ctx.switchToHttp().getRequest();
    const token = (req.headers.authorization || '').replace('Bearer ', '');
    const user = await verifyToken(token);
    if (!user) throw new UnauthorizedException();
    req.user = user; // { id, rol: 'socio' | 'admin' }
    return true;
  }
}
