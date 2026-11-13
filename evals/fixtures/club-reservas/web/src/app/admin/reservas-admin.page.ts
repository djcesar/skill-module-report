import { Component, OnInit } from '@angular/core';
import { ReservasApi } from '../reservas.api';
import { SesionService } from '../sesion.service';

@Component({ selector: 'app-reservas-admin', templateUrl: './reservas-admin.page.html' })
export class ReservasAdminPage implements OnInit {
  pendientes: any[] = [];
  constructor(private api: ReservasApi, public sesion: SesionService) {}

  async ngOnInit() {
    this.pendientes = (await this.api.todas()).filter(r => r.estado === 'pendiente');
  }

  async confirmar(r: any) {
    await this.api.confirmar(r.id);
    this.pendientes = this.pendientes.filter(x => x.id !== r.id);
  }
}
