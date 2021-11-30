import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class DeviceDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNumber()
  @IsNotEmpty()
  price: number;
  @IsNotEmpty()
  @IsNumber()
  stock: number;
}
