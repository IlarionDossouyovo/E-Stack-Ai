import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company, Contact, Deal, Activity, Ticket, Campaign } from '../../database/entities/crm.entity';

@Injectable()
export class CrmService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
    @InjectRepository(Deal)
    private dealRepository: Repository<Deal>,
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
    @InjectRepository(Campaign)
    private campaignRepository: Repository<Campaign>,
  ) {}

  // Companies
  async getCompanies() { return this.companyRepository.find(); }
  async getCompany(id: string) { return this.companyRepository.findOne({ where: { id } }); }
  async createCompany(data: Partial<Company>) { return this.companyRepository.save(data); }
  async updateCompany(id: string, data: Partial<Company>) { await this.companyRepository.update(id, data); return this.getCompany(id); }
  async deleteCompany(id: string) { return this.companyRepository.delete(id); }

  // Contacts
  async getContacts() { return this.contactRepository.find(); }
  async getContact(id: string) { return this.contactRepository.findOne({ where: { id } }); }
  async createContact(data: Partial<Contact>) { return this.contactRepository.save(data); }
  async updateContact(id: string, data: Partial<Contact>) { await this.contactRepository.update(id, data); return this.getContact(id); }
  async deleteContact(id: string) { return this.contactRepository.delete(id); }

  // Deals
  async getDeals() { return this.dealRepository.find(); }
  async getDeal(id: string) { return this.dealRepository.findOne({ where: { id } }); }
  async createDeal(data: Partial<Deal>) { return this.dealRepository.save(data); }
  async updateDeal(id: string, data: Partial<Deal>) { await this.dealRepository.update(id, data); return this.getDeal(id); }
  async deleteDeal(id: string) { return this.dealRepository.delete(id); }

  // Activities
  async getActivities() { return this.activityRepository.find(); }
  async createActivity(data: Partial<Activity>) { return this.activityRepository.save(data); }
  async updateActivity(id: string, data: Partial<Activity>) { await this.activityRepository.update(id, data); }

  // Tickets
  async getTickets() { return this.ticketRepository.find(); }
  async getTicket(id: string) { return this.ticketRepository.findOne({ where: { id } }); }
  async createTicket(data: Partial<Ticket>) { return this.ticketRepository.save(data); }
  async updateTicket(id: string, data: Partial<Ticket>) { await this.ticketRepository.update(id, data); return this.getTicket(id); }

  // Campaigns
  async getCampaigns() { return this.campaignRepository.find(); }
  async createCampaign(data: Partial<Campaign>) { return this.campaignRepository.save(data); }
  async updateCampaign(id: string, data: Partial<Campaign>) { await this.campaignRepository.update(id, data); }

  // Dashboard
  async getDashboardStats() {
    const totalCompanies = await this.companyRepository.count();
    const totalContacts = await this.contactRepository.count();
    const totalDeals = await this.dealRepository.count();
    const totalTickets = await this.ticketRepository.count();
    const pipelineValue = await this.dealRepository.query("SELECT COALESCE(SUM(value), 0) as total FROM deals WHERE stage NOT IN ('closed_won', 'closed_lost')");
    
    return {
      totalCompanies,
      totalContacts,
      totalDeals,
      totalTickets,
      pipelineValue: pipelineValue[0]?.total || 0,
    };
  }
}
