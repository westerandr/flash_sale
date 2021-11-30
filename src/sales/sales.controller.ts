import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Role } from '../auth/role.enum';
import { CurrentUser } from '../auth/current-user.decorator';
import { SalesDto } from './dto/sales.dto';
import { SalesService } from './sales.service';

@Controller('sales')
export class SalesController {
  constructor(private salesService: SalesService) {}

  @Get()
  getSales(@CurrentUser() user: { email: string; userId: number; role: Role }) {
    return this.salesService.findAll(user.userId, user.role);
  }

  @Get('/:id')
  getSale(
    @CurrentUser() user: { email: string; userId: number; role: Role },
    @Param('id') id: number,
  ) {
    return this.salesService.findOne(user.userId, id);
  }

  @Post()
  createSale(
    @CurrentUser() user: { userId: number; email: string },
    @Body() sale: SalesDto,
  ) {
    return this.salesService.create(user.userId, sale);
  }

  @Put(':id')
  updateSale(@Param('id') id: number, @Body() sale: SalesDto) {
    return this.salesService.update(id, sale);
  }

  @Delete(':id')
  deleteSale(@Param('id') id: number) {
    return this.salesService.delete(id);
  }
}
