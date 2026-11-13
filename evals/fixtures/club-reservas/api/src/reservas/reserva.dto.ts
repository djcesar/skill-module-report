import { IsBoolean, IsInt, IsOptional, IsString, Matches } from 'class-validator';

export class ReservaDto {
  @IsInt() canchaId: number;
  @Matches(/^\d{4}-\d{2}-\d{2}$/) fecha: string;
  @Matches(/^\d{2}:00$/) hora: string;
  @IsInt() socioId: number;
  @IsString() socioNombre: string;
  @IsString() socioDocumento: string;
  @Matches(/^3\d{9}$/) socioCelular: string;
  @IsOptional() @IsString() estado?: string;
  @IsOptional() @IsBoolean() pagada?: boolean;
}
