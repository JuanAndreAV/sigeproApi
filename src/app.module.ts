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
import { DashboardModule } from './dashboard/dashboard.module';
import { ConfigModule } from '@nestjs/config';
import { SeedModule } from './seed/seed.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST, // O la IP de tu servidor de BD
      port: Number(process.env.DB_PORT), // Puerto por defecto de PostgreSQL
      username: process.env.DB_USERNAME, // Tu usuario de PostgreSQL
      password: process.env.DB_PASSWORD, // ¡Cambia esto por tu contraseña!
      database: process.env.DB_DATABASE, // El nombre de la base de datos que creaste
      entities: [Proveedore, Lote, Usuario, Procesamiento, Producto], // Aquí irán tus entidades (tablas)
      //autoLoadEntities: true, // Carga automáticamente las entidades definidas
      //synchronize: true, // ¡Importante! Lee la nota de abajo.
       synchronize: process.env.NODE_ENV !== 'production', // Desactivado en producción
        logging: process.env.NODE_ENV === 'development', // Logs solo en desarrollo
        ssl: process.env.NODE_ENV === 'production' 
          ? { rejectUnauthorized: false } // Para servicios como Railway, Render, etc.
          : false,
    }),
    LotesModule,
    ProveedoresModule,
    ProductosModule,
    UsuariosModule,
    ProcesamientoModule,
    DashboardModule,
    SeedModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
