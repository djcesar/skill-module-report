import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SmsService } from '../notificaciones/sms.service';
import { ReservaDto } from './reserva.dto';
import { Reserva } from './reserva.entity';

@Injectable()
export class ReservasService {
  constructor(
    @InjectRepository(Reserva) private repo: Repository<Reserva>,
    private sms: SmsService,
  ) {}

  async crear(dto: ReservaDto) {
    const reserva = await this.repo.save(this.repo.create(dto));
    await this.sms.enviar(
      dto.socioCelular,
      `Club Deportivo Ejemplo: tu reserva #${reserva.id} quedó pendiente. Detalle: https://reservas.clubejemplo.org/reserva/${reserva.id}`,
    );
    return reserva;
  }

  async buscarReservaDelHorario(dto: ReservaDto) {
    const existente = await this.repo.findOne({
      where: { canchaId: dto.canchaId, fecha: dto.fecha, hora: dto.hora },
    });
    if (existente) {
      throw new ConflictException('El horario ya está reservado');
    }
    return existente;
  }

  async buscar(id: number) {
    const reserva = await this.repo.findOne({ where: { id } });
    if (!reserva) throw new NotFoundException();
    return reserva;
  }

  delSocio(socioId: number) {
    return this.repo.find({ where: { socioId }, order: { fecha: 'DESC' } });
  }

  async actualizar(id: number, dto: ReservaDto) {
    const actual = await this.buscar(id);
    return this.repo.save({ ...actual, ...dto });
  }

  async confirmar(id: number) {
    const reserva = await this.buscar(id);
    reserva.estado = 'confirmada';
    await this.repo.save(reserva);
    this.sms.enviar(reserva.socioCelular, `Club Deportivo Ejemplo: tu reserva #${reserva.id} fue confirmada.`);
    return reserva;
  }

  async cancelar(id: number) {
    const reserva = await this.buscar(id);
    reserva.cancelada = true;
    return this.repo.save(reserva);
  }
}
