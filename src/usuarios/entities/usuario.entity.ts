import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';

@Entity('usuarios')
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'nombre_completo' })
    nombreCompleto: string;

    @Column({ unique: true })
    email: string;

    @Column({ name: 'password_hash' })
    passwordHash: string;

    @Column()
    rol: string;

    @CreateDateColumn({ name: 'creado_en', type: 'timestamptz' })
    creadoEn: Date;
    
}

