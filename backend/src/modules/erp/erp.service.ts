import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product, Invoice, Quote, PurchaseOrder, Employee, Transaction, Account, InventoryMovement, Payroll } from '../../database/entities/erp.entity';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

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

  private paginate<T>(data: T[], total: number, page: number, limit: number): PaginatedResult<T> {
    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // Products
  async getProducts(page: number = 1, limit: number = 10) {
    const [data, total] = await this.productRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return this.paginate(data, total, page, limit);
  }
  async getProduct(id: string) { return this.productRepository.findOne({ where: { id } }); }
  async createProduct(data: Partial<Product>) { return this.productRepository.save(data); }
  async updateProduct(id: string, data: Partial<Product>) { await this.productRepository.update(id, data); return this.getProduct(id); }
  async deleteProduct(id: string) { return this.productRepository.delete(id); }

  // Invoices
  async getInvoices(page: number = 1, limit: number = 10) {
    const [data, total] = await this.invoiceRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return this.paginate(data, total, page, limit);
  }
  async getInvoice(id: string) { return this.invoiceRepository.findOne({ where: { id } }); }
  async createInvoice(data: Partial<Invoice>) { return this.invoiceRepository.save(data); }
  async updateInvoice(id: string, data: Partial<Invoice>) { await this.invoiceRepository.update(id, data); return this.getInvoice(id); }
  async deleteInvoice(id: string) { return this.invoiceRepository.delete(id); }

  // Quotes
  async getQuotes(page: number = 1, limit: number = 10) {
    const [data, total] = await this.quoteRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return this.paginate(data, total, page, limit);
  }
  async getQuote(id: string) { return this.quoteRepository.findOne({ where: { id } }); }
  async createQuote(data: Partial<Quote>) { return this.quoteRepository.save(data); }
  async updateQuote(id: string, data: Partial<Quote>) { await this.quoteRepository.update(id, data); return this.getQuote(id); }
  async deleteQuote(id: string) { return this.quoteRepository.delete(id); }

  // Purchase Orders
  async getPurchaseOrders(page: number = 1, limit: number = 10) {
    const [data, total] = await this.poRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return this.paginate(data, total, page, limit);
  }
  async getPurchaseOrder(id: string) { return this.poRepository.findOne({ where: { id } }); }
  async createPurchaseOrder(data: Partial<PurchaseOrder>) { return this.poRepository.save(data); }
  async updatePurchaseOrder(id: string, data: Partial<PurchaseOrder>) { await this.poRepository.update(id, data); return this.getPurchaseOrder(id); }
  async deletePurchaseOrder(id: string) { return this.poRepository.delete(id); }

  // Employees
  async getEmployees(page: number = 1, limit: number = 10) {
    const [data, total] = await this.employeeRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return this.paginate(data, total, page, limit);
  }
  async getEmployee(id: string) { return this.employeeRepository.findOne({ where: { id } }); }
  async createEmployee(data: Partial<Employee>) { return this.employeeRepository.save(data); }
  async updateEmployee(id: string, data: Partial<Employee>) { await this.employeeRepository.update(id, data); return this.getEmployee(id); }
  async deleteEmployee(id: string) { return this.employeeRepository.delete(id); }

  // Accounting
  async getAccounts(page: number = 1, limit: number = 10) {
    const [data, total] = await this.accountRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { accountNumber: 'ASC' },
    });
    return this.paginate(data, total, page, limit);
  }
  async getAccount(id: string) { return this.accountRepository.findOne({ where: { id } }); }
  async createAccount(data: Partial<Account>) { return this.accountRepository.save(data); }
  async updateAccount(id: string, data: Partial<Account>) { await this.accountRepository.update(id, data); return this.getAccount(id); }
  async deleteAccount(id: string) { return this.accountRepository.delete(id); }

  async getTransactions(page: number = 1, limit: number = 10) {
    const [data, total] = await this.transactionRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { date: 'DESC' },
    });
    return this.paginate(data, total, page, limit);
  }
  async getTransaction(id: string) { return this.transactionRepository.findOne({ where: { id } }); }
  async createTransaction(data: Partial<Transaction>) { return this.transactionRepository.save(data); }
  async deleteTransaction(id: string) { return this.transactionRepository.delete(id); }

  // Inventory
  async getInventoryMovements(page: number = 1, limit: number = 10) {
    const [data, total] = await this.inventoryMovementRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return this.paginate(data, total, page, limit);
  }
  async createInventoryMovement(data: Partial<InventoryMovement>) { return this.inventoryMovementRepository.save(data); }

  // Payroll
  async getPayrolls(page: number = 1, limit: number = 10) {
    const [data, total] = await this.payrollRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return this.paginate(data, total, page, limit);
  }
  async getPayroll(id: string) { return this.payrollRepository.findOne({ where: { id } }); }
  async createPayroll(data: Partial<Payroll>) { return this.payrollRepository.save(data); }
  async updatePayroll(id: string, data: Partial<Payroll>) { await this.payrollRepository.update(id, data); return this.getPayroll(id); }
  async deletePayroll(id: string) { return this.payrollRepository.delete(id); }

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
