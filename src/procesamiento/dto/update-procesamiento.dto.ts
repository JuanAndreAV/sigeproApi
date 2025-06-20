import { PartialType } from '@nestjs/mapped-types';
import { CreateProcesamientoDto } from './create-procesamiento.dto';

export class UpdateProcesamientoDto extends PartialType(CreateProcesamientoDto) {}
