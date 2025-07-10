import { IsString, IsNotEmpty, Length, IsOptional, IsArray, ArrayMinSize } from 'class-validator';


export class CreateProductoDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  nombreProducto: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(0)
  @IsOptional()
  mermasConfig?: string[]; // Ejemplo: ["Cordón", "Bolsa", "Desgorde"]
}

