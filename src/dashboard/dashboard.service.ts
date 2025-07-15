import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lote } from 'src/lotes/entities/lote.entity';
import { Procesamiento } from 'src/procesamiento/entities/procesamiento.entity';
import { Proveedore } from 'src/proveedores/entities/proveedore.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Lote)
    private readonly loteRepository: Repository<Lote>,
    @InjectRepository(Procesamiento)
    private readonly procesamientoRepository: Repository<Procesamiento>,
    @InjectRepository(Proveedore)
    private readonly proveedorRepository: Repository<Proveedore>,
  ) {}

  async getDashboardData() {
    // 1. Rendimiento Promedio General
    const avgResult = await this.procesamientoRepository
      .createQueryBuilder('p')
      .select('AVG(p.rendimientoCalculado)', 'promedio')
      .getRawOne();
    const rendimientoPromedioGeneral = parseFloat(avgResult.promedio || 0).toFixed(2);

    // 2. Total de Lotes Ingresados
    const totalLotes = await this.loteRepository.count();

    // 3. Total de Proveedores Activos
    const totalProveedores = await this.proveedorRepository.count();
    
    // 4. Rendimiento Promedio por Proveedor (para la gráfica)
    const rendimientoPorProveedor = await this.loteRepository.createQueryBuilder('lote')
        .innerJoin('lote.proveedor', 'proveedor')
        .innerJoin('lote.procesamiento', 'procesamiento')
        .select('proveedor.nombre', 'nombre')
        .addSelect('AVG(procesamiento.rendimientoCalculado)', 'rendimiento')
        .where('lote.estado = :estado', { estado: 'Finalizado' })
        .groupBy('proveedor.nombre')
        .orderBy('rendimiento', 'DESC')
        .getRawMany();

    return {
      rendimientoPromedioGeneral,
      totalLotes,
      totalProveedores,
      rendimientoPorProveedor: rendimientoPorProveedor.map(item => ({
          nombre: item.nombre,
          rendimiento: parseFloat(item.rendimiento).toFixed(2)
      }))
    };
  }
}
