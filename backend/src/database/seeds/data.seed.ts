import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { Product, Invoice, Quote, Employee, Account, Transaction, PurchaseOrder, Payroll, InventoryMovement } from '../entities/erp.entity';
import { Company, Contact, Deal, Ticket, Campaign } from '../entities/crm.entity';

export async function seedDatabase(dataSource: DataSource): Promise<void> {
  console.log('🌱 Starting database seeding...');

  const userRepository = dataSource.getRepository(User);
  const productRepository = dataSource.getRepository(Product);
  const invoiceRepository = dataSource.getRepository(Invoice);
  const quoteRepository = dataSource.getRepository(Quote);
  const employeeRepository = dataSource.getRepository(Employee);
  const accountRepository = dataSource.getRepository(Account);
  const transactionRepository = dataSource.getRepository(Transaction);
  const companyRepository = dataSource.getRepository(Company);
  const contactRepository = dataSource.getRepository(Contact);
  const dealRepository = dataSource.getRepository(Deal);
  const ticketRepository = dataSource.getRepository(Ticket);
  const campaignRepository = dataSource.getRepository(Campaign);

  // ===== USERS =====
  console.log('👤 Seeding users...');
  
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const founder = userRepository.create({
    email: 'founder@electron-ai.com',
    password: hashedPassword,
    firstName: 'Ilarion',
    lastName: 'Dossouyovo',
    role: 'founder',
    isActive: true,
    department: 'Direction',
  });
  await userRepository.save(founder);

  const admin = userRepository.create({
    email: 'admin@electron-ai.com',
    password: hashedPassword,
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    isActive: true,
    department: 'IT',
  });
  await userRepository.save(admin);

  const user = userRepository.create({
    email: 'user@electron-ai.com',
    password: hashedPassword,
    firstName: 'Jean',
    lastName: 'Dupont',
    role: 'user',
    isActive: true,
    department: 'Sales',
  });
  await userRepository.save(user);

  // ===== PRODUCTS =====
  console.log('📦 Seeding products...');
  
  const products = [
    { sku: 'PRD-001', name: 'Ordinateur Portable Pro', price: 1299.99, quantity: 50, category: 'Electronics', cost: 800 },
    { sku: 'PRD-002', name: 'Souris Sans Fil', price: 29.99, quantity: 200, category: 'Accessories', cost: 15 },
    { sku: 'PRD-003', name: 'Clavier Mécanique', price: 89.99, quantity: 100, category: 'Accessories', cost: 45 },
    { sku: 'PRD-004', name: 'Écran 27 pouces', price: 349.99, quantity: 30, category: 'Electronics', cost: 200 },
    { sku: 'PRD-005', name: 'Webcam HD', price: 79.99, quantity: 75, category: 'Electronics', cost: 40 },
    { sku: 'PRD-006', name: 'Casque Audio', price: 149.99, quantity: 60, category: 'Electronics', cost: 70 },
    { sku: 'PRD-007', name: 'Disque Dur Externe 1To', price: 89.99, quantity: 80, category: 'Storage', cost: 50 },
    { sku: 'PRD-008', name: 'Clé USB 64Go', price: 14.99, quantity: 300, category: 'Storage', cost: 5 },
    { sku: 'PRD-009', name: 'Hub USB-C', price: 49.99, quantity: 120, category: 'Accessories', cost: 25 },
    { sku: 'PRD-010', name: 'Support Laptop', price: 39.99, quantity: 90, category: 'Accessories', cost: 18 },
  ];

  for (const product of products) {
    await productRepository.save(productRepository.create(product));
  }

  // ===== INVOICES =====
  console.log('📄 Seeding invoices...');
  
  const invoices = [
    { invoiceNumber: 'INV-2024-001', clientId: 'company-1', date: new Date('2024-01-15'), status: 'paid', total: 2599.98, subtotal: 2400, tax: 199.98 },
    { invoiceNumber: 'INV-2024-002', clientId: 'company-2', date: new Date('2024-01-20'), status: 'paid', total: 899.97, subtotal: 830, tax: 69.97 },
    { invoiceNumber: 'INV-2024-003', clientId: 'company-1', date: new Date('2024-02-01'), status: 'pending', total: 1749.97, subtotal: 1615, tax: 134.97 },
    { invoiceNumber: 'INV-2024-004', clientId: 'company-3', date: new Date('2024-02-10'), status: 'draft', total: 449.98, subtotal: 415, tax: 34.98 },
    { invoiceNumber: 'INV-2024-005', clientId: 'company-2', date: new Date('2024-02-15'), status: 'paid', total: 699.99, subtotal: 645, tax: 54.99 },
  ];

  for (const invoice of invoices) {
    await invoiceRepository.save(invoiceRepository.create(invoice));
  }

  // ===== QUOTES =====
  console.log('📝 Seeding quotes...');
  
  const quotes = [
    { quoteNumber: 'QT-2024-001', clientId: 'company-1', date: new Date('2024-02-01'), validUntil: new Date('2024-03-01'), status: 'sent', total: 5000 },
    { quoteNumber: 'QT-2024-002', clientId: 'company-3', date: new Date('2024-02-10'), validUntil: new Date('2024-03-10'), status: 'accepted', total: 3200 },
    { quoteNumber: 'QT-2024-003', clientId: 'company-4', date: new Date('2024-02-15'), validUntil: new Date('2024-03-15'), status: 'draft', total: 7500 },
    { quoteNumber: 'QT-2024-004', clientId: 'company-2', date: new Date('2024-02-20'), validUntil: new Date('2024-03-20'), status: 'sent', total: 2100 },
  ];

  for (const quote of quotes) {
    await quoteRepository.save(quoteRepository.create(quote));
  }

  // ===== EMPLOYEES =====
  console.log('👥 Seeding employees...');
  
  const employees = [
    { employeeNumber: 'EMP-001', firstName: 'Jean', lastName: 'Dupont', email: 'jean.dupont@company.com', phone: '+33123456789', department: 'IT', position: 'Developer', hireDate: new Date('2022-01-15'), salary: 55000, status: 'active' },
    { employeeNumber: 'EMP-002', firstName: 'Marie', lastName: 'Martin', email: 'marie.martin@company.com', phone: '+33123456790', department: 'Sales', position: 'Manager', hireDate: new Date('2021-06-01'), salary: 65000, status: 'active' },
    { employeeNumber: 'EMP-003', firstName: 'Pierre', lastName: 'Durand', email: 'pierre.durand@company.com', phone: '+33123456791', department: 'HR', position: 'Recruiter', hireDate: new Date('2022-03-01'), salary: 45000, status: 'active' },
    { employeeNumber: 'EMP-004', firstName: 'Sophie', lastName: 'Bernard', email: 'sophie.bernard@company.com', phone: '+33123456792', department: 'Finance', position: 'Accountant', hireDate: new Date('2021-09-01'), salary: 50000, status: 'active' },
    { employeeNumber: 'EMP-005', firstName: 'Lucas', lastName: 'Moreau', email: 'lucas.moreau@company.com', phone: '+33123456793', department: 'Marketing', position: 'SEO Specialist', hireDate: new Date('2023-01-15'), salary: 42000, status: 'active' },
    { employeeNumber: 'EMP-006', firstName: 'Emma', lastName: 'Petit', email: 'emma.petit@company.com', phone: '+33123456794', department: 'IT', position: 'DevOps', hireDate: new Date('2022-07-01'), salary: 58000, status: 'active' },
    { employeeNumber: 'EMP-007', firstName: 'Nicolas', lastName: 'Robert', email: 'nicolas.robert@company.com', phone: '+33123456795', department: 'Sales', position: 'Sales Rep', hireDate: new Date('2023-03-01'), salary: 40000, status: 'active' },
    { employeeNumber: 'EMP-008', firstName: 'Laura', lastName: 'Lefebvre', email: 'laura.lefebvre@company.com', phone: '+33123456796', department: 'Support', position: 'Support Agent', hireDate: new Date('2023-06-01'), salary: 38000, status: 'active' },
  ];

  for (const employee of employees) {
    await employeeRepository.save(employeeRepository.create(employee));
  }

  // ===== ACCOUNTS =====
  console.log('🏦 Seeding accounts...');
  
  const accounts = [
    { accountNumber: '400000', name: 'Clients', type: 'receivable', balance: 50000 },
    { accountNumber: '401000', name: 'Fournisseurs', type: 'liability', balance: 25000 },
    { accountNumber: '512000', name: 'Banque', type: 'asset', balance: 150000 },
    { accountNumber: '411000', name: 'Créances clients', type: 'asset', balance: 35000 },
    { accountNumber: '601000', name: 'Achats marchandises', type: 'expense', balance: 80000 },
    { accountNumber: '701000', name: 'Ventes', type: 'revenue', balance: 250000 },
    { accountNumber: '602000', name: 'Achats fournitures', type: 'expense', balance: 15000 },
    { accountNumber: '641000', name: 'Salaires', type: 'expense', balance: 180000 },
  ];

  for (const account of accounts) {
    await accountRepository.save(accountRepository.create(account));
  }

  // ===== COMPANIES =====
  console.log('🏢 Seeding companies...');
  
  const companies = [
    { name: 'Tech Solutions Inc', industry: 'Technology', website: 'https://techsolutions.com', phone: '+33123456700', email: 'contact@techsolutions.com', city: 'Paris', country: 'France', annualRevenue: 5000000, status: 'customer' },
    { name: 'Global Trading SARL', industry: 'Trading', website: 'https://globaltrading.fr', phone: '+33123456701', email: 'info@globaltrading.fr', city: 'Lyon', country: 'France', annualRevenue: 2500000, status: 'customer' },
    { name: 'StartupXYZ', industry: 'Technology', website: 'https://startupxyz.io', phone: '+33123456702', email: 'hello@startupxyz.io', city: 'Paris', country: 'France', annualRevenue: 500000, status: 'prospect' },
    { name: 'Enterprise Corp', industry: 'Manufacturing', website: 'https://enterprisecorp.com', phone: '+33123456703', email: 'contact@enterprisecorp.com', city: 'Marseille', country: 'France', annualRevenue: 10000000, status: 'customer' },
    { name: 'Digital Agency', industry: 'Marketing', website: 'https://digitalagency.fr', phone: '+33123456704', email: 'hello@digitalagency.fr', city: 'Paris', country: 'France', annualRevenue: 800000, status: 'lead' },
  ];

  for (const company of companies) {
    await companyRepository.save(companyRepository.create(company));
  }

  // ===== CONTACTS =====
  console.log('👤 Seeding contacts...');
  
  const contacts = [
    { firstName: 'Thomas', lastName: 'Anderson', email: 'tanderson@techsolutions.com', phone: '+33123456800', companyId: '1', position: 'CTO', status: 'active' },
    { firstName: 'Sarah', lastName: 'Connor', email: 'sconnor@globaltrading.fr', phone: '+33123456801', companyId: '2', position: 'Director', status: 'active' },
    { firstName: 'John', lastName: 'Smith', email: 'jsmith@startupxyz.io', phone: '+33123456802', companyId: '3', position: 'CEO', status: 'active' },
    { firstName: 'Emily', lastName: 'Johnson', email: 'ejohnson@enterprisecorp.com', phone: '+33123456803', companyId: '4', position: 'Procurement Manager', status: 'active' },
    { firstName: 'Michael', lastName: 'Brown', email: 'mbrown@digitalagency.fr', phone: '+33123456804', companyId: '5', position: 'Director', status: 'lead' },
  ];

  for (const contact of contacts) {
    await contactRepository.save(contactRepository.create(contact));
  }

  // ===== DEALS =====
  console.log('💼 Seeding deals...');
  
  const deals = [
    { title: 'Contrat Tech Solutions - Annuel', value: 120000, stage: 'negotiation', expectedCloseDate: new Date('2024-03-15'), status: 'active' },
    { title: 'Global Trading - Équipement IT', value: 45000, stage: 'proposal', expectedCloseDate: new Date('2024-03-01'), status: 'active' },
    { title: 'StartupXYZ - Pack Premium', value: 15000, stage: 'closed_won', expectedCloseDate: new Date('2024-01-15'), status: 'active' },
    { title: 'Enterprise Corp - Expansion', value: 250000, stage: 'discovery', expectedCloseDate: new Date('2024-04-30'), status: 'active' },
    { title: 'Digital Agency - Abonnement', value: 8000, stage: 'qualified', expectedCloseDate: new Date('2024-02-28'), status: 'active' },
  ];

  for (const deal of deals) {
    await dealRepository.save(dealRepository.create(deal));
  }

  // ===== TICKETS =====
  console.log('🎫 Seeding tickets...');
  
  const tickets = [
    { subject: 'Problème de connexion', description: 'Impossible de se connecter au dashboard', priority: 'high', status: 'open', category: 'technical' },
    { subject: 'Demande de fonctionnalité', description: 'Ajouter un module d\'export PDF', priority: 'low', status: 'pending', category: 'feature' },
    { subject: 'Bug sur les factures', description: 'Les totaux ne correspondent pas', priority: 'high', status: 'in_progress', category: 'bug' },
    { subject: 'Question sur la facturation', description: 'Comment modifier une facture ?', priority: 'low', status: 'closed', category: 'question' },
    { subject: 'Demande de formation', description: 'Formation sur le module CRM', priority: 'medium', status: 'pending', category: 'training' },
  ];

  for (const ticket of tickets) {
    await ticketRepository.save(ticketRepository.create(ticket));
  }

  // ===== CAMPAIGNS =====
  console.log('📢 Seeding campaigns...');
  
  const campaigns = [
    { name: 'Black Friday 2024', type: 'promotion', status: 'completed', startDate: new Date('2024-11-20'), endDate: new Date('2024-11-30'), budget: 10000 },
    { name: 'Lancement Produit Printemps', type: 'product_launch', status: 'active', startDate: new Date('2024-03-01'), endDate: new Date('2024-04-30'), budget: 15000 },
    { name: 'Webinar IA', type: 'webinar', status: 'planning', startDate: new Date('2024-05-15'), endDate: new Date('2024-05-15'), budget: 5000 },
    { name: 'Campagne LinkedIn B2B', type: 'social_media', status: 'active', startDate: new Date('2024-02-01'), endDate: new Date('2024-03-31'), budget: 8000 },
  ];

  for (const campaign of campaigns) {
    await campaignRepository.save(campaignRepository.create(campaign));
  }

  console.log('✅ Database seeding completed!');
  console.log('');
  console.log('📧 Default login credentials:');
  console.log('   Founder: founder@electron-ai.com / password123');
  console.log('   Admin:   admin@electron-ai.com / password123');
  console.log('   User:    user@electron-ai.com / password123');
}

// Run seeding if called directly
if (require.main === module) {
  const { AppDataSource } = require('../app.module');
  
  AppDataSource.initialize()
    .then(async (dataSource) => {
      await seedDatabase(dataSource);
      await dataSource.destroy();
      process.exit(0);
    })
    .catch((error) => {
      console.error('Error seeding database:', error);
      process.exit(1);
    });
}
