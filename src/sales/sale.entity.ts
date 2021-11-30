import { Device } from '../devices/device.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  store: string;

  @Column()
  date: Date;

  @Column()
  price: number;

  @ManyToOne((_) => Device, (device) => device.sales, { onDelete: 'CASCADE' })
  device: Device;

  @ManyToOne((_) => User, (user) => user.sales, { onDelete: 'CASCADE' })
  user: User;
}
