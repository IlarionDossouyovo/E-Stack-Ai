import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ErpService } from './erp.service';

@ApiTags('ERP')
@Controller('erp')
export class ErpController {
  constructor(private readonly erpService: ErpService) {}

  // Dashboard
  @Get('dashboard')
  @ApiOperation({ summary: 'Get ERP dashboard statistics' })
  getDashboard() {
    return this.erpService.getDashboardStats();
  }

  // Products
  @Get('products')
  getProducts() { return this.erpService.getProducts(); }
  
  @Get('products/:id')
  getProduct(@Param('id') id: string) { return this.erpService.getProduct(id); }
  
  @Post('products')
  createProduct(@Body() data: any) { return this.erpService.createProduct(data); }
  
  @Patch('products/:id')
  updateProduct(@Param('id') id: string, @Body() data: any) { return this.erpService.updateProduct(id, data); }
  
  @Delete('products/:id')
  deleteProduct(@Param('id') id: string) { return this.erpService.deleteProduct(id); }

  // Invoices
  @Get('invoices')
  getInvoices() { return this.erpService.getInvoices(); }
  
  @Get('invoices/:id')
  getInvoice(@Param('id') id: string) { return this.erpService.getInvoice(id); }
  
  @Post('invoices')
  createInvoice(@Body() data: any) { return this.erpService.createInvoice(data); }
  
  @Patch('invoices/:id')
  updateInvoice(@Param('id') id: string, @Body() data: any) { return this.erpService.updateInvoice(id, data); }

  // Quotes
  @Get('quotes')
  getQuotes() { return this.erpService.getQuotes(); }
  
  @Post('quotes')
  createQuote(@Body() data: any) { return this.erpService.createQuote(data); }

  // Purchase Orders
  @Get('purchase-orders')
  getPurchaseOrders() { return this.erpService.getPurchaseOrders(); }
  
  @Post('purchase-orders')
  createPurchaseOrder(@Body() data: any) { return this.erpService.createPurchaseOrder(data); }

  // Employees
  @Get('employees')
  getEmployees() { return this.erpService.getEmployees(); }
  
  @Get('employees/:id')
  getEmployee(@Param('id') id: string) { return this.erpService.getEmployee(id); }
  
  @Post('employees')
  createEmployee(@Body() data: any) { return this.erpService.createEmployee(data); }
  
  @Patch('employees/:id')
  updateEmployee(@Param('id') id: string, @Body() data: any) { return this.erpService.updateEmployee(id, data); }

  // Accounting
  @Get('accounts')
  getAccounts() { return this.erpService.getAccounts(); }
  
  @Post('accounts')
  createAccount(@Body() data: any) { return this.erpService.createAccount(data); }
  
  @Get('transactions')
  getTransactions() { return this.erpService.getTransactions(); }
  
  @Post('transactions')
  createTransaction(@Body() data: any) { return this.erpService.createTransaction(data); }

  // Inventory
  @Get('inventory-movements')
  getInventoryMovements() { return this.erpService.getInventoryMovements(); }
  
  @Post('inventory-movements')
  createInventoryMovement(@Body() data: any) { return this.erpService.createInventoryMovement(data); }

  // Payroll
  @Get('payroll')
  getPayrolls() { return this.erpService.getPayrolls(); }
  
  @Post('payroll')
  createPayroll(@Body() data: any) { return this.erpService.createPayroll(data); }
}
