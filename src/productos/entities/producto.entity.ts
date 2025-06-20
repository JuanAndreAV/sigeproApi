import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { Lote } from '../../lotes/entities/lote.entity';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nombre_producto', unique: true })
  nombreProducto: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;
  
  @Column({ name: 'mermas_config', type: 'jsonb', nullable: true })
  mermasConfig: string[]; // ['Cordón', 'Bolsa', etc.]

  @CreateDateColumn({ name: 'creado_en', type: 'timestamptz' })
  creadoEn: Date;
}
