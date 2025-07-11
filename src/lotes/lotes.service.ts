import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lote } from './entities/lote.entity';
import { Procesamiento } from 'src/procesamiento/entities/procesamiento.entity';
import { CreateLoteDto } from './dto/create-lote.dto';
import { CreateProcesamientoDto } from 'src/procesamiento/dto/create-procesamiento.dto';

@Injectable()
export class LotesService {
  constructor(
    @InjectRepository(Lote)
    private readonly loteRepository: Repository<Lote>,
    @InjectRepository(Procesamiento)
    private readonly procesamientoRepository: Repository<Procesamiento>,
  ) {}

  async create(createLoteDto: CreateLoteDto): Promise<Lote> {
    const nuevoLote = this.loteRepository.create({
        ...createLoteDto,
        proveedor: { id: createLoteDto.proveedorId },
        producto: { id: createLoteDto.productoId },
        usuarioRegistro: { id: createLoteDto.usuarioRegistroId },
    });
    return this.loteRepository.save(nuevoLote);
  }

  findAll(): Promise<Lote[]> {
    // Usamos 'relations' para cargar el procesamiento si existe
    return this.loteRepository.find({ relations: ['procesamiento'] });
  }

  async findOne(id: number): Promise<Lote> {
    const lote = await this.loteRepository.findOne({ where: { id }, relations: ['procesamiento'] });
    if (!lote) {
      throw new NotFoundException(`Lote con ID ${id} no encontrado`);
    }
    return lote;
  }

  async procesarLote(id: number, createProcesamientoDto: CreateProcesamientoDto): Promise<Lote> {
    const lote = await this.findOne(id);

    if (lote.estado === 'Finalizado') {
        throw new Error('Este lote ya ha sido procesado.');
    }

    // --- Cálculos (se mantienen igual) ---
    const totalMermas = Object.values(createProcesamientoDto.mermasDetalle).reduce((sum, current) => sum + current, 0);
    const pesoNeto = lote.pesoIngresoKg - totalMermas;
    const rendimiento = (pesoNeto / lote.pesoIngresoKg) * 100;

    // 1. Crea la instancia de Procesamiento, pero NO la guardes todavía.
    const nuevoProcesamiento = this.procesamientoRepository.create({
        ...createProcesamientoDto,
        usuarioProceso: { id: createProcesamientoDto.usuarioProcesoId },
        fechaProcesamiento: new Date(),
        pesoNetoFinalKg: pesoNeto,
        rendimientoCalculado: rendimiento,
    });
    
    // 2. Asigna el nuevo procesamiento directamente al lote.
    lote.procesamiento = nuevoProcesamiento;
    
    // 3. Actualiza el estado del lote.
    lote.estado = 'Finalizado';

    // 4. Guarda el LOTE. Gracias a "cascade: true", TypeORM hará dos cosas:
    //    a) Insertará el nuevo registro en la tabla "procesamientos" (con el lote_id correcto).
    //    b) Actualizará el registro existente en la tabla "lotes" (cambiando el estado).
    return this.loteRepository.save(lote);
}
}

