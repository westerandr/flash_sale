import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SalesDto {
  @IsString()
  @IsNotEmpty()
  store: string;

  @IsNotEmpty()
  @IsNumber()
  deviceId: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
