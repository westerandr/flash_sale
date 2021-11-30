import { Sale } from '../sales/sale.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['name', 'price'])
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({ default: 0 })
  stock: number;

  @Column()
  totalStock: number;

  @OneToMany((_) => Sale, (sale) => sale.device)
  sales: Sale[];
}
