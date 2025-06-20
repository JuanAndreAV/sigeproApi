export class CreateLoteDto {
  proveedorId: number;
  productoId: number;
  usuarioRegistroId: number;
  fechaIngreso: string;
  pesoIngresoKg: number;
  precioPorKg: number;
  loteProveedorRef?: string;
}
