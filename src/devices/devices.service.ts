import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from './device.entity';
import { DeviceDto } from './dto/device.dto';
import * as fs from 'fs';

@Injectable()
export class DevicesService {
  constructor(@InjectRepository(Device) private repo: Repository<Device>) {}

  async findAll(name?: string): Promise<Device[]> {
    if (!name) {
      return await this.repo.find();
    }
    return await this.repo.find({ name });
  }

  async findOne(id: number): Promise<Device> {
    return await this.repo.findOne(id);
  }

  async create(deviceDto: DeviceDto): Promise<Device> {
    const { name, price, stock } = deviceDto;
    const alreadyExists = await this.repo.findOne({ name, price });
    if (alreadyExists) {
      throw new ConflictException('Device with name and price already exists');
    }
    const device = this.repo.create({ name, price, stock, totalStock: stock });
    return await this.repo.save(device);
  }

  async update(id: number, deviceDto: Partial<DeviceDto>): Promise<Device> {
    const device = await this.repo.findOne(id);
    if (!device) {
      throw new ConflictException('Device not found');
    }
    await this.repo.update(id, deviceDto);
    return await this.repo.findOne(id);
  }

  async purchaseOne(id: number): Promise<Device> {
    const device = await this.repo.findOne(id);
    if (!device) {
      throw new ConflictException('Device not found');
    }
    if (device.stock === 0) {
      throw new ConflictException('Device out of stock');
    }
    device.stock--;
    return await this.repo.save(device);
  }

  async addStock(id: number, stock: number): Promise<Device> {
    const device = await this.repo.findOne(id);
    if (!device) {
      throw new ConflictException('Device not found');
    }
    if (device.stock + stock > device.totalStock) {
      throw new ConflictException('Cannot add more stock than total stock');
    }
    device.stock += stock;
    return await this.repo.save(device);
  }

  async delete(id: number): Promise<Device> {
    const device = await this.repo.findOne(id);
    return await this.repo.remove(device);
  }

  async getDisplayDevice(): Promise<Device> {
    // read from json file from same directory
    const file = fs.readFileSync('display.json', 'utf8');

    if (!file) throw new ConflictException('No display device set');
    const deviceName = JSON.parse(file).name;
    return await this.repo.findOne({ name: deviceName });
  }

  async setDisplayDevice(name: string): Promise<void> {
    // write to json file from same directory
    fs.writeFileSync('display.json', JSON.stringify({ name }));
  }
}
