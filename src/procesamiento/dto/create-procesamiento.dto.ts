import { IsNotEmpty, IsNumber, IsObject } from 'class-validator';

export class CreateProcesamientoDto {
  @IsObject()
  @IsNotEmpty()
  mermasDetalle: Record<string, number>;

 
  @IsNumber()
  @IsNotEmpty()
  usuarioProcesoId: number;
}