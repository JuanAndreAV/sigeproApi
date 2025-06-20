import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProveedorDto } from './dto/create-proveedore.dto';
import { Proveedore } from './entities/proveedore.entity';
@Injectable()
export class ProveedoresService {
 constructor(
    @InjectRepository(Proveedore)
    private readonly proveedorRepository: Repository<Proveedore>,
  ) {}

 // Método para crear un nuevo proveedor
  create(createProveedorDto: CreateProveedorDto): Promise<Proveedore> {
    const nuevoProveedor = this.proveedorRepository.create(createProveedorDto);
    return this.proveedorRepository.save(nuevoProveedor);
  }

  // Método para obtener todos los proveedores
  findAll(): Promise<Proveedore[]> {
    return this.proveedorRepository.find();
  }
}
