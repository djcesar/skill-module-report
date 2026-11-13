import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

const API = 'https://reservas.clubejemplo.org/api/reservas';

@Injectable({ providedIn: 'root' })
export class ReservasApi {
  constructor(private http: HttpClient) {}
  crear(body: any) { return firstValueFrom(this.http.post<any>(API, body)); }
  detalle(id: number) { return firstValueFrom(this.http.get<any>(`${API}/${id}`)); }
  misReservas() { return firstValueFrom(this.http.get<any[]>(`${API}/socio/mis-reservas`)); }
  todas() { return firstValueFrom(this.http.get<any[]>(`${API}/socio/mis-reservas`)); }
  confirmar(id: number) { return firstValueFrom(this.http.post<any>(`${API}/${id}/confirmar`, {})); }
  cancelar(id: number) { return firstValueFrom(this.http.delete<any>(`${API}/${id}`)); }
}
