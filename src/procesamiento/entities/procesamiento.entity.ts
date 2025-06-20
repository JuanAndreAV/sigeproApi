import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Lote } from 'src/lotes/entities/lote.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity('procesamientos')
export class Procesamiento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'fecha_procesamiento', type: 'date' })
  fechaProcesamiento: Date;

  @Column({ name: 'mermas_detalle', type: 'jsonb', nullable: true })
  mermasDetalle: Record<string, number>; // Ej: { "cordon": 1.5, "bolsa": 0.2 }

  @Column({ name: 'peso_neto_final_kg', type: 'numeric', precision: 10, scale: 2 })
  pesoNetoFinalKg: number;

  @Column({ name: 'rendimiento_calculado', type: 'numeric', precision: 5, scale: 2 })
  rendimientoCalculado: number;

  @CreateDateColumn({ name: 'creado_en', type: 'timestamptz' })
  creadoEn: Date;

  // --- RELACIONES ---

  @OneToOne(() => Lote, lote => lote.procesamiento, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'lote_id' })
  lote: Lote;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'usuario_proceso_id' })
  usuarioProceso: Usuario;
}
