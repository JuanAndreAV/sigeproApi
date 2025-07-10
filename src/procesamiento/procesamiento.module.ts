import { Module } from '@nestjs/common';
import { ProcesamientoService } from './procesamiento.service';
import { ProcesamientoController } from './procesamiento.controller';
import { Procesamiento } from './entities/procesamiento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Procesamiento])],
  controllers: [ProcesamientoController],
  providers: [ProcesamientoService],
})
export class ProcesamientoModule {}
