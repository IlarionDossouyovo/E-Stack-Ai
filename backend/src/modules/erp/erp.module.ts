import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product, Invoice, Quote, PurchaseOrder, Employee, Transaction, Account, InventoryMovement, Payroll } from '../../database/entities/erp.entity';
import { ErpService } from './erp.service';
import { ErpController } from './erp.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product, Invoice, Quote, PurchaseOrder, Employee,
      Transaction, Account, InventoryMovement, Payroll
    ]),
  ],
  controllers: [ErpController],
  providers: [ErpService],
  exports: [ErpService],
})
export class ErpModule {}
