import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product, Invoice, Quote, PurchaseOrder, Employee, Transaction, Account, InventoryMovement, Payroll } from '../../database/entities/erp.entity';

@Injectable()
export class ErpService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
    @InjectRepository(Quote)
    private quoteRepository: Repository<Quote>,
    @InjectRepository(PurchaseOrder)
    private poRepository: Repository<PurchaseOrder>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    @InjectRepository(InventoryMovement)
    private inventoryMovementRepository: Repository<InventoryMovement>,
    @InjectRepository(Payroll)
    private payrollRepository: Repository<Payroll>,
  ) {}

  // Products
  async getProducts() { return this.productRepository.find(); }
  async getProduct(id: string) { return this.productRepository.findOne({ where: { id } }); }
  async createProduct(data: Partial<Product>) { return this.productRepository.save(data); }
  async updateProduct(id: string, data: Partial<Product>) { await this.productRepository.update(id, data); return this.getProduct(id); }
  async deleteProduct(id: string) { return this.productRepository.delete(id); }

  // Invoices
  async getInvoices() { return this.invoiceRepository.find(); }
  async getInvoice(id: string) { return this.invoiceRepository.findOne({ where: { id } }); }
  async createInvoice(data: Partial<Invoice>) { return this.invoiceRepository.save(data); }
  async updateInvoice(id: string, data: Partial<Invoice>) { await this.invoiceRepository.update(id, data); return this.getInvoice(id); }

  // Quotes
  async getQuotes() { return this.quoteRepository.find(); }
  async createQuote(data: Partial<Quote>) { return this.quoteRepository.save(data); }

  // Purchase Orders
  async getPurchaseOrders() { return this.poRepository.find(); }
  async createPurchaseOrder(data: Partial<PurchaseOrder>) { return this.poRepository.save(data); }

  // Employees
  async getEmployees() { return this.employeeRepository.find(); }
  async getEmployee(id: string) { return this.employeeRepository.findOne({ where: { id } }); }
  async createEmployee(data: Partial<Employee>) { return this.employeeRepository.save(data); }
  async updateEmployee(id: string, data: Partial<Employee>) { await this.employeeRepository.update(id, data); return this.getEmployee(id); }

  // Accounting
  async getAccounts() { return this.accountRepository.find(); }
  async createAccount(data: Partial<Account>) { return this.accountRepository.save(data); }
  async getTransactions() { return this.transactionRepository.find(); }
  async createTransaction(data: Partial<Transaction>) { return this.transactionRepository.save(data); }

  // Inventory
  async getInventoryMovements() { return this.inventoryMovementRepository.find(); }
  async createInventoryMovement(data: Partial<InventoryMovement>) { return this.inventoryMovementRepository.save(data); }

  // Payroll
  async getPayrolls() { return this.payrollRepository.find(); }
  async createPayroll(data: Partial<Payroll>) { return this.payrollRepository.save(data); }

  // Dashboard Stats
  async getDashboardStats() {
    const totalProducts = await this.productRepository.count();
    const totalInvoices = await this.invoiceRepository.count();
    const totalEmployees = await this.employeeRepository.count();
    const totalRevenue = await this.invoiceRepository.query("SELECT COALESCE(SUM(total), 0) as total FROM invoices WHERE status = 'paid'");
    
    return {
      totalProducts,
      totalInvoices,
      totalEmployees,
      totalRevenue: totalRevenue[0]?.total || 0,
    };
  }
}
