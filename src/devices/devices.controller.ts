import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Role } from '../auth/role.enum';
import { Roles } from '../auth/roles.decorator';
import { Device } from './device.entity';
import { DevicesService } from './devices.service';
import { DeviceDto } from './dto/device.dto';
import { Public } from '../auth/public.decorator';

@Controller('devices')
export class DevicesController {
  constructor(private devicesService: DevicesService) {}

  @Public()
  @Get('/displayDevice')
  getDisplayDevice() {
    return this.devicesService.getDisplayDevice();
  }

  @Roles(Role.Admin)
  @Post('/displayDevice')
  setDisplayDevice(@Body('name') name: string) {
    return this.devicesService.setDisplayDevice(name);
  }

  @Public()
  @Get()
  findAll(@Query('name') name?: string): Promise<Device[]> {
    return this.devicesService.findAll(name);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Device> {
    return this.devicesService.findOne(id);
  }

  @Post()
  @Roles(Role.Advanced)
  create(@Body() device: DeviceDto) {
    return this.devicesService.create(device);
  }

  @Put(':id')
  @Roles(Role.Advanced)
  update(@Param('id') id: number, @Body() device: Partial<DeviceDto>) {
    return this.devicesService.update(id, device);
  }

  @Roles(Role.Admin)
  @Post(':id/addStock')
  addStock(@Param('id') id: number, @Body('stock') stock: number) {
    return this.devicesService.addStock(id, stock);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  delete(@Param('id') id: number) {
    return this.devicesService.delete(id);
  }
}
