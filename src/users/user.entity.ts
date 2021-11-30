import { Exclude } from 'class-transformer';
import { Sale } from '../sales/sale.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  role: string;

  @Exclude()
  @Column()
  password: string;

  @OneToMany((_) => Sale, (sale) => sale.user)
  sales: Sale[];
}
