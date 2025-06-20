import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Proveedore } from 'src/proveedores/entities/proveedore.entity';
import { Producto } from '../../productos/entities/producto.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Procesamiento } from 'src/procesamiento/entities/procesamiento.entity';

export type EstadoLote = 'Pendiente de Procesar' | 'Finalizado';

@Entity('lotes')
export class Lote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'fecha_ingreso', type: 'date' })
  fechaIngreso: string;

  @Column({ name: 'peso_ingreso_kg', type: 'numeric', precision: 10, scale: 2 })
  pesoIngresoKg: number;

  @Column({ name: 'precio_por_kg', type: 'numeric', precision: 10, scale: 2 })
  precioPorKg: number;

  @Column({ name: 'lote_proveedor_ref', nullable: true })
  loteProveedorRef: string;

  @Column({
    type: 'enum',
    enum: ['Pendiente de Procesar', 'Finalizado'],
    default: 'Pendiente de Procesar',
  })
  estado: EstadoLote;

  @CreateDateColumn({ name: 'creado_en', type: 'timestamptz' })
  creadoEn: Date;

  // --- RELACIONES ---

  @ManyToOne(() => Proveedore, { eager: true }) // eager: true carga el proveedor automáticamente
  @JoinColumn({ name: 'proveedor_id' })
  proveedor: Proveedore;

  @ManyToOne(() => Producto, { eager: true })
  @JoinColumn({ name: 'producto_id' })
  producto: Producto;

  @ManyToOne(() => Usuario, { eager: true })
  @JoinColumn({ name: 'usuario_registro_id' })
  usuarioRegistro: Usuario;

  @OneToOne(() => Procesamiento, procesamiento => procesamiento.lote)
  procesamiento: Procesamiento;
}

