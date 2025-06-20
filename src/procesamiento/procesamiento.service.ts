import { Injectable } from '@nestjs/common';
import { CreateProcesamientoDto } from './dto/create-procesamiento.dto';
import { UpdateProcesamientoDto } from './dto/update-procesamiento.dto';

@Injectable()
export class ProcesamientoService {
  create(createProcesamientoDto: CreateProcesamientoDto) {
    return 'This action adds a new procesamiento';
  }

  findAll() {
    return `This action returns all procesamiento`;
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
