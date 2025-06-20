import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProcesamientoService } from './procesamiento.service';
import { CreateProcesamientoDto } from './dto/create-procesamiento.dto';
import { UpdateProcesamientoDto } from './dto/update-procesamiento.dto';

@Controller('procesamiento')
export class ProcesamientoController {
  constructor(private readonly procesamientoService: ProcesamientoService) {}

  @Post()
  create(@Body() createProcesamientoDto: CreateProcesamientoDto) {
    return this.procesamientoService.create(createProcesamientoDto);
  }

  @Get()
  findAll() {
    return this.procesamientoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.procesamientoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProcesamientoDto: UpdateProcesamientoDto) {
    return this.procesamientoService.update(+id, updateProcesamientoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.procesamientoService.remove(+id);
  }
}
