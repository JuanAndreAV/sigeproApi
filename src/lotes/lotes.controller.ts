import { Controller, Get, Post, Body, Param, Patch, ParseIntPipe } from '@nestjs/common';
import { LotesService } from './lotes.service';
import { CreateLoteDto } from './dto/create-lote.dto';
import { CreateProcesamientoDto } from 'src/procesamiento/dto/create-procesamiento.dto';


@Controller('lotes')
export class LotesController {
  constructor(private readonly lotesService: LotesService) {}

  @Post()
  create(@Body() createLoteDto: CreateLoteDto) {
    return this.lotesService.create(createLoteDto);
  }

  @Get()
  findAll() {
    return this.lotesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lotesService.findOne(+id);
  }

  // Endpoint especial para procesar un lote
  @Post(':id/procesar')
procesarLote(
  @Param('id', ParseIntPipe) id: number,
  @Body() createProcesamientoDto: CreateProcesamientoDto,
) {
  return this.lotesService.procesarLote(id, createProcesamientoDto);
}
}