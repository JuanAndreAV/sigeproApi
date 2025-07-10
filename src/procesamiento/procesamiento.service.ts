import {  Injectable } from '@nestjs/common';
import { CreateProcesamientoDto } from './dto/create-procesamiento.dto';
import { UpdateProcesamientoDto } from './dto/update-procesamiento.dto';
import { Repository } from 'typeorm';
import { Procesamiento } from './entities/procesamiento.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProcesamientoService {
  constructor(
    @InjectRepository(Procesamiento)
    private readonly procesamientoRepository: Repository<Procesamiento>
  ){

  }
  create(createProcesamientoDto: CreateProcesamientoDto) {
    return 'This action adds a new procesamiento';
  }

  findAll(): Promise<Procesamiento[]> {
    return this.procesamientoRepository.find() ;
  }

  findOne(id: number) {
    return `This action returns a #${id} procesamiento`;
  }

  update(id: number, updateProcesamientoDto: UpdateProcesamientoDto) {
    return `This action updates a #${id} procesamiento`;
  }

  remove(id: number) {
    return `This action removes a #${id} procesamiento`;
  }
}
