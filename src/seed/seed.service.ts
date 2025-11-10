import { Injectable } from '@nestjs/common';


@Injectable()
export class SeedService {
 runSeed(){
  return "seed executed"
 }
}
