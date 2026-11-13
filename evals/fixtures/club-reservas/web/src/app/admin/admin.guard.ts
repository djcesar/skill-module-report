import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { SesionService } from '../sesion.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private sesion: SesionService) {}
  canActivate() { return this.sesion.rol === 'admin'; }
}
