import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservasApi } from '../reservas.api';

// Página a la que lleva el enlace del SMS. No requiere iniciar sesión.
@Component({
  selector: 'app-detalle',
  template: `
    <ion-content *ngIf="r">
      <h1>Reserva #{{ r.id }}</h1>
      <p>{{ r.socioNombre }} — documento {{ r.socioDocumento }}</p>
      <p>Cancha {{ r.canchaId }}, {{ r.fecha }} a las {{ r.hora }}</p>
      <p>Estado: {{ r.estado }}</p>
    </ion-content>`,
})
export class DetallePage implements OnInit {
  r: any;
  constructor(private route: ActivatedRoute, private api: ReservasApi) {}
  async ngOnInit() {
    this.r = await this.api.detalle(Number(this.route.snapshot.paramMap.get('id')));
  }
}
