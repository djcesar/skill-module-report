import { Component, OnInit } from '@angular/core';
import { ReservasApi } from '../reservas.api';

@Component({ selector: 'app-mis-reservas', templateUrl: './mis-reservas.page.html' })
export class MisReservasPage implements OnInit {
  reservas: any[] = [];
  constructor(private api: ReservasApi) {}

  async ngOnInit() {
    const todas = await this.api.misReservas();
    this.reservas = todas.filter(r => r.estado !== 'cancelada');
  }

  async cancelar(r: any) {
    await this.api.cancelar(r.id);
    this.reservas = this.reservas.filter(x => x.id !== r.id);
  }
}
