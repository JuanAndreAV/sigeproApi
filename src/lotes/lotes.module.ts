import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LotesService } from './lotes.service';
import { LotesController } from './lotes.controller';
import { Lote } from './entities/lote.entity';
import { Procesamiento } from 'src/procesamiento/entities/procesamiento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lote, Procesamiento])],
  controllers: [LotesController],
  providers: [LotesService],
})
export class LotesModule {}
