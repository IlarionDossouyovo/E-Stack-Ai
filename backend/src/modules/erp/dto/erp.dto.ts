import { IsString, IsNotEmpty, IsNumber, IsOptional, Min, IsDateString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateInvoiceDto {
  @ApiProperty({ example: 'INV-2024-001' })
  @IsString()
  @IsNotEmpty()
  invoiceNumber: string;

  @ApiProperty({ example: 'uuid-of-client' })
  @IsString()
  @IsNotEmpty()
  clientId: string;

  @ApiProperty({ example: '2024-01-15' })
  @IsDateString()
  date: string;

  @ApiPropertyOptional({ example: '2024-02-15' })
  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @ApiPropertyOptional({ example: 'draft' })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiPropertyOptional({ example: 1000 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  subtotal?: number;

  @ApiPropertyOptional({ example: 200 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  tax?: number;

  @ApiPropertyOptional({ example: 1200 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  total?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiPropertyOptional({ example: [{ productId: 'uuid', quantity: 2, price: 500 }] })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Object)
  items?: Record<string, any>[];
}

export class CreateQuoteDto {
  @ApiProperty({ example: 'QT-2024-001' })
  @IsString()
  @IsNotEmpty()
  quoteNumber: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  clientId: string;

  @ApiProperty()
  @IsDateString()
  date: string;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  validUntil?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  status?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Min(0)
  total?: number;

  @ApiPropertyOptional()
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Object)
  items?: Record<string, any>[];
}

export class CreateEmployeeDto {
  @ApiProperty({ example: 'EMP-001' })
  @IsString()
  @IsNotEmpty()
  employeeNumber: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'john.doe@company.com' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  department?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  position?: string;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  hireDate?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Min(0)
  salary?: number;

  @ApiPropertyOptional({ default: 'active' })
  @IsString()
  @IsOptional()
  status?: string;
}

export class CreateTransactionDto {
  @ApiProperty()
  @IsDateString()
  date: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty({ example: 'debit' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  accountId: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  reference?: string;
}

export class CreateAccountDto {
  @ApiProperty({ example: '400000' })
  @IsString()
  @IsNotEmpty()
  accountNumber: string;

  @ApiProperty({ example: 'Caisse' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'asset' })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  parentId?: string;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  isActive?: boolean;
}

export class CreateInventoryMovementDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ example: 'in' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  reason?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  reference?: string;
}

export class CreatePayrollDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  employeeId: string;

  @ApiProperty({ example: '2024-01' })
  @IsString()
  @IsNotEmpty()
  period: string;

  @ApiProperty()
  @IsDateString()
  startDate: string;

  @ApiProperty()
  @IsDateString()
  endDate: string;

  @ApiProperty()
  @IsNumber()
  grossSalary: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Min(0)
  deductions?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Min(0)
  netSalary?: number;

  @ApiPropertyOptional({ default: 'pending' })
  @IsString()
  @IsOptional()
  status?: string;
}

export class CreatePurchaseOrderDto {
  @ApiProperty({ example: 'PO-2024-001' })
  @IsString()
  @IsNotEmpty()
  poNumber: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  supplierId: string;

  @ApiProperty()
  @IsDateString()
  date: string;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  expectedDate?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  status?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Min(0)
  total?: number;

  @ApiPropertyOptional()
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Object)
  items?: Record<string, any>[];
}
