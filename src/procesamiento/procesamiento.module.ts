import { Module } from '@nestjs/common';
import { ProcesamientoService } from './procesamiento.service';
import { ProcesamientoController } from './procesamiento.controller';

@Module({
  controllers: [ProcesamientoController],
  providers: [ProcesamientoService],
})
export class ProcesamientoModule {}
