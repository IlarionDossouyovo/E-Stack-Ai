import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company, Contact, Deal, Activity, Ticket, Campaign } from '../../database/entities/crm.entity';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

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

  private paginate<T>(data: T[], total: number, page: number, limit: number): PaginatedResult<T> {
    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // Companies
  async getCompanies(page: number = 1, limit: number = 10) {
    const [data, total] = await this.companyRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return this.paginate(data, total, page, limit);
  }
  async getCompany(id: string) { return this.companyRepository.findOne({ where: { id } }); }
  async createCompany(data: Partial<Company>) { return this.companyRepository.save(data); }
  async updateCompany(id: string, data: Partial<Company>) { await this.companyRepository.update(id, data); return this.getCompany(id); }
  async deleteCompany(id: string) { return this.companyRepository.delete(id); }

  // Contacts
  async getContacts(page: number = 1, limit: number = 10) {
    const [data, total] = await this.contactRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return this.paginate(data, total, page, limit);
  }
  async getContact(id: string) { return this.contactRepository.findOne({ where: { id } }); }
  async createContact(data: Partial<Contact>) { return this.contactRepository.save(data); }
  async updateContact(id: string, data: Partial<Contact>) { await this.contactRepository.update(id, data); return this.getContact(id); }
  async deleteContact(id: string) { return this.contactRepository.delete(id); }

  // Deals
  async getDeals(page: number = 1, limit: number = 10) {
    const [data, total] = await this.dealRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return this.paginate(data, total, page, limit);
  }
  async getDeal(id: string) { return this.dealRepository.findOne({ where: { id } }); }
  async createDeal(data: Partial<Deal>) { return this.dealRepository.save(data); }
  async updateDeal(id: string, data: Partial<Deal>) { await this.dealRepository.update(id, data); return this.getDeal(id); }
  async deleteDeal(id: string) { return this.dealRepository.delete(id); }

  // Activities
  async getActivities(page: number = 1, limit: number = 10) {
    const [data, total] = await this.activityRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return this.paginate(data, total, page, limit);
  }
  async getActivity(id: string) { return this.activityRepository.findOne({ where: { id } }); }
  async createActivity(data: Partial<Activity>) { return this.activityRepository.save(data); }
  async updateActivity(id: string, data: Partial<Activity>) { await this.activityRepository.update(id, data); return this.getActivity(id); }
  async deleteActivity(id: string) { return this.activityRepository.delete(id); }

  // Tickets
  async getTickets(page: number = 1, limit: number = 10) {
    const [data, total] = await this.ticketRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return this.paginate(data, total, page, limit);
  }
  async getTicket(id: string) { return this.ticketRepository.findOne({ where: { id } }); }
  async createTicket(data: Partial<Ticket>) { return this.ticketRepository.save(data); }
  async updateTicket(id: string, data: Partial<Ticket>) { await this.ticketRepository.update(id, data); return this.getTicket(id); }
  async deleteTicket(id: string) { return this.ticketRepository.delete(id); }

  // Campaigns
  async getCampaigns(page: number = 1, limit: number = 10) {
    const [data, total] = await this.campaignRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return this.paginate(data, total, page, limit);
  }
  async getCampaign(id: string) { return this.campaignRepository.findOne({ where: { id } }); }
  async createCampaign(data: Partial<Campaign>) { return this.campaignRepository.save(data); }
  async updateCampaign(id: string, data: Partial<Campaign>) { await this.campaignRepository.update(id, data); return this.getCampaign(id); }
  async deleteCampaign(id: string) { return this.campaignRepository.delete(id); }

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
