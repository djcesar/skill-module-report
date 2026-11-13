import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SesionService {
  socioId: number | null = null;
  rol: 'socio' | 'admin' | null = null;
}
