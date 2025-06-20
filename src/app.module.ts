import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LotesModule } from './lotes/lotes.module';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { Proveedore } from './proveedores/entities/proveedore.entity';
import { DataSource } from 'typeorm';
import { ProductosModule } from './productos/productos.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ProcesamientoModule } from './procesamiento/procesamiento.module';
import { Lote } from './lotes/entities/lote.entity';
import { Usuario } from './usuarios/entities/usuario.entity';
import { Procesamiento } from './procesamiento/entities/procesamiento.entity';
import { Producto } from './productos/entities/producto.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // O la IP de tu servidor de BD
      port: 5432, // Puerto por defecto de PostgreSQL
      username: 'postgres', // Tu usuario de PostgreSQL
      password: 'Ju@n1029', // ¡Cambia esto por tu contraseña!
      database: 'sigepro_db', // El nombre de la base de datos que creaste
      entities: [Proveedore, Lote, Usuario, Procesamiento, Producto], // Aquí irán tus entidades (tablas)
      autoLoadEntities: true, // Carga automáticamente las entidades definidas
      synchronize: true, // ¡Importante! Lee la nota de abajo.
    }),
    LotesModule,
    ProveedoresModule,
    ProductosModule,
    UsuariosModule,
    ProcesamientoModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
