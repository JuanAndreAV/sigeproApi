import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lote } from 'src/lotes/entities/lote.entity';
import { Procesamiento } from 'src/procesamiento/entities/procesamiento.entity';
import { Proveedore } from 'src/proveedores/entities/proveedore.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lote, Procesamiento, Proveedore])],
  controllers: [DashboardController],
  providers: [DashboardService]
})
export class DashboardModule {}
