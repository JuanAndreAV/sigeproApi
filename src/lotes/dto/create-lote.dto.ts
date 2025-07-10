import { IsString, IsNumber, IsNotEmpty, IsOptional } from "class-validator";

export class CreateLoteDto {
  @IsNumber()
  @IsNotEmpty()
  proveedorId: number;

  @IsNumber()
  @IsNotEmpty()
  productoId: number;

  @IsNumber()
  @IsNotEmpty()
  usuarioRegistroId: number;

  @IsString()
  @IsNotEmpty()
  fechaIngreso: string;

  @IsNumber()
  @IsNotEmpty()
  pesoIngresoKg: number;

  @IsNumber()
  @IsNotEmpty()
  precioPorKg: number;

  @IsString()
  @IsOptional()
  loteProveedorRef?: string;
}
