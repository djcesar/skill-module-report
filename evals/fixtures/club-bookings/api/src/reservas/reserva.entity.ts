import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reservas')
export class Reserva {
  @PrimaryGeneratedColumn()
  id: number; // autoincremental

  @Column() canchaId: number;
  @Column() fecha: string; // 'AAAA-MM-DD'
  @Column() hora: string;  // 'HH:00'

  @Column() socioId: number;
  @Column() socioNombre: string;
  @Column() socioDocumento: string;
  @Column() socioCelular: string;

  // 'pendiente' | 'confirmada' | 'cancelada'
  @Column({ default: 'pendiente' }) estado: string;
  @Column({ default: false }) cancelada: boolean;
  @Column({ default: false }) pagada: boolean;

  @CreateDateColumn() creadaEn: Date;
}
