import { IsString, IsOptional, IsEmail, Length, IsNotEmpty } from 'class-validator';

/**
 * DTO (Data Transfer Object) para la creación de un nuevo proveedor.
 * Define la forma de los datos que se esperan en el cuerpo de una petición POST.
 * Incluye validaciones básicas.
 */
export class CreateProveedorDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  nombre: string;

  @IsString()
  @IsOptional()
  @Length(3, 255)
  contactoNombre?: string;

  @IsString()
  @IsOptional()
  @Length(7, 50)
  telefono?: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}
