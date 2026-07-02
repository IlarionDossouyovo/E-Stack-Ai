import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

// CRM Module - Contacts & Companies
@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  industry: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  country: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  annualRevenue: number;

  @Column({ default: 'lead' })
  status: string; // lead, prospect, customer, inactive

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity('contacts')
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  companyId: string;

  @Column({ nullable: true })
  position: string;

  @Column({ default: 'lead' })
  status: string;

  @Column({ type: 'jsonb', nullable: true })
  tags: string[];

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

// CRM - Sales Pipeline
@Entity('deals')
export class Deal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  companyId: string;

  @Column({ nullable: true })
  contactId: string;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  value: number;

  @Column({ default: 'qualification' })
  stage: string; // qualification, proposal, negotiation, closed_won, closed_lost

  @Column({ nullable: true })
  expectedCloseDate: Date;

  @Column({ nullable: true })
  probability: number;

  @Column({ nullable: true })
  assignedTo: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

// CRM - Activities
@Entity('activities')
export class Activity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string; // call, meeting, email, task, note

  @Column()
  subject: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'timestamp', nullable: true })
  dueDate: Date;

  @Column({ default: 'pending' })
  status: string; // pending, completed, cancelled

  @Column({ nullable: true })
  companyId: string;

  @Column({ nullable: true })
  contactId: string;

  @Column({ nullable: true })
  dealId: string;

  @Column({ nullable: true })
  assignedTo: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

// CRM - Support Tickets
@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  ticketNumber: string;

  @Column()
  subject: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ default: 'open' })
  status: string; // open, in_progress, pending, resolved, closed

  @Column({ default: 'low' })
  priority: string; // low, medium, high, urgent

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  companyId: string;

  @Column({ nullable: true })
  contactId: string;

  @Column({ nullable: true })
  assignedTo: string;

  @Column({ type: 'jsonb', nullable: true })
  messages: Record<string, any>[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

// CRM - Campaigns
@Entity('campaigns')
export class Campaign {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  type: string; // email, social, ads, event

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @Column({ default: 'draft' })
  status: string; // draft, active, paused, completed

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  budget: number;

  @Column({ type: 'jsonb', nullable: true })
  metrics: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
