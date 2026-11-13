import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { Public } from '../auth/public.decorator';
import { ReservaDto } from './reserva.dto';
import { ReservasService } from './reservas.service';

@Controller('reservas')
export class ReservasController {
  constructor(private readonly service: ReservasService) {}

  // Crear reserva desde el portal (también la usan visitantes sin cuenta).
  @Public()
  @Post()
  crear(@Body() dto: ReservaDto) {
    return this.service.crear(dto);
  }

  // Ver el detalle de una reserva (enlace que llega por SMS).
  @Public()
  @Get(':id')
  detalle(@Param('id') id: number) {
    return this.service.buscar(id);
  }

  @Get('socio/mis-reservas')
  misReservas(@Req() req) {
    return this.service.delSocio(req.user.id);
  }

  @Put(':id')
  actualizar(@Param('id') id: number, @Body() dto: ReservaDto) {
    return this.service.actualizar(id, dto);
  }

  // Solo administradores (el botón solo se muestra a admins en el portal).
  @Post(':id/confirmar')
  confirmar(@Param('id') id: number) {
    return this.service.confirmar(id);
  }

  @Delete(':id')
  cancelar(@Param('id') id: number) {
    return this.service.cancelar(id);
  }
}
