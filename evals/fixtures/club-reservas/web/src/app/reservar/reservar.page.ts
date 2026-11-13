import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ReservasApi } from '../reservas.api';
import { SesionService } from '../sesion.service';

@Component({ selector: 'app-reservar', templateUrl: './reservar.page.html' })
export class ReservarPage {
  canchas = [{ id: 1, nombre: 'Fútbol 5 — Cancha 1' }, { id: 2, nombre: 'Tenis — Cancha A' }];
  horas = ['07:00', '08:00', '09:00', '17:00', '18:00', '19:00', '20:00'];

  form = this.fb.group({
    canchaId: [null, Validators.required],
    fecha: ['', Validators.required],
    hora: ['', Validators.required],
    socioNombre: ['', Validators.required],
    socioDocumento: ['', Validators.required],
    socioCelular: ['', [Validators.required, Validators.pattern(/^3\d{9}$/)]],
  });

  constructor(private fb: FormBuilder, private api: ReservasApi, private sesion: SesionService, private toast: ToastController) {}

  async reservar() {
    try {
      await this.api.crear({ ...this.form.value, socioId: this.sesion.socioId ?? 0 });
      (await this.toast.create({ message: '¡Reserva creada! Te enviamos un SMS con el detalle.', duration: 3000 })).present();
      this.form.reset();
    } catch {
      (await this.toast.create({ message: 'Ocurrió un error', duration: 3000, color: 'danger' })).present();
    }
  }
}
