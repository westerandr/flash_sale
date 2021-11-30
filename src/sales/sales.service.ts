import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DevicesService } from '../devices/devices.service';
import { Repository } from 'typeorm';
import { SalesDto } from './dto/sales.dto';
import { Sale } from './sale.entity';
import { UsersService } from '../users/users.service';
import { Role } from '../auth/role.enum';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale) private repo: Repository<Sale>,
    private devicesService: DevicesService,
    private usersService: UsersService,
  ) {}

  async findAll(userId: number, role: Role): Promise<Sale[]> {
    if (role === Role.User) {
      return await this.repo.find({
        where: { user: { id: userId } },
        relations: ['device'],
      });
    }
    return await this.repo.find({ relations: ['device', 'user'] });
  }

  async findOne(userId: number, id: number): Promise<Sale> {
    const sale = await this.repo.findOne(id, { relations: ['device', 'user'] });
    if (!sale) {
      throw new ConflictException('Sale not found');
    }
    if (sale.user.id !== userId) {
      throw new ConflictException('Sale not found');
    }
    return sale;
  }

  async create(userId: number, sale: SalesDto) {
    const device = await this.devicesService.findOne(sale.deviceId);
    if (!device) {
      throw new ConflictException('Device not found');
    }

    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new ConflictException('User not found');
    }

    const saleEntity = this.repo.create({
      date: new Date(),
      ...sale,
      device,
      user,
    });

    await this.repo.save(saleEntity);
    await this.devicesService.purchaseOne(sale.deviceId);
    return await this.repo.findOne(saleEntity.id, {
      relations: ['device', 'user'],
    });
  }

  async update(id: number, sale: Partial<SalesDto>): Promise<Sale> {
    const saleEntity = await this.repo.findOne(id);
    if (!saleEntity) {
      throw new ConflictException('Sale not found');
    }
    const updatedSale = this.repo.merge(saleEntity, sale);
    return await this.repo.save(updatedSale);
  }

  async delete(id: number): Promise<void> {
    const sale = await this.repo.findOne(id, { relations: ['device'] });
    if (!sale) {
      throw new ConflictException('Sale not found');
    }
    await this.devicesService.addStock(sale.device.id, 1);
    await this.repo.remove(sale);
  }
}
