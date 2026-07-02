import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CrmService } from './crm.service';

@ApiTags('CRM')
@Controller('crm')
export class CrmController {
  constructor(private readonly crmService: CrmService) {}

  @Get('dashboard')
  getDashboard() { return this.crmService.getDashboardStats(); }

  // Companies
  @Get('companies')
  getCompanies() { return this.crmService.getCompanies(); }
  @Get('companies/:id')
  getCompany(@Param('id') id: string) { return this.crmService.getCompany(id); }
  @Post('companies')
  createCompany(@Body() data: any) { return this.crmService.createCompany(data); }
  @Patch('companies/:id')
  updateCompany(@Param('id') id: string, @Body() data: any) { return this.crmService.updateCompany(id, data); }
  @Delete('companies/:id')
  deleteCompany(@Param('id') id: string) { return this.crmService.deleteCompany(id); }

  // Contacts
  @Get('contacts')
  getContacts() { return this.crmService.getContacts(); }
  @Get('contacts/:id')
  getContact(@Param('id') id: string) { return this.crmService.getContact(id); }
  @Post('contacts')
  createContact(@Body() data: any) { return this.crmService.createContact(data); }
  @Patch('contacts/:id')
  updateContact(@Param('id') id: string, @Body() data: any) { return this.crmService.updateContact(id, data); }
  @Delete('contacts/:id')
  deleteContact(@Param('id') id: string) { return this.crmService.deleteContact(id); }

  // Deals
  @Get('deals')
  getDeals() { return this.crmService.getDeals(); }
  @Get('deals/:id')
  getDeal(@Param('id') id: string) { return this.crmService.getDeal(id); }
  @Post('deals')
  createDeal(@Body() data: any) { return this.crmService.createDeal(data); }
  @Patch('deals/:id')
  updateDeal(@Param('id') id: string, @Body() data: any) { return this.crmService.updateDeal(id, data); }
  @Delete('deals/:id')
  deleteDeal(@Param('id') id: string) { return this.crmService.deleteDeal(id); }

  // Activities
  @Get('activities')
  getActivities() { return this.crmService.getActivities(); }
  @Post('activities')
  createActivity(@Body() data: any) { return this.crmService.createActivity(data); }
  @Patch('activities/:id')
  updateActivity(@Param('id') id: string, @Body() data: any) { return this.crmService.updateActivity(id, data); }

  // Tickets
  @Get('tickets')
  getTickets() { return this.crmService.getTickets(); }
  @Get('tickets/:id')
  getTicket(@Param('id') id: string) { return this.crmService.getTicket(id); }
  @Post('tickets')
  createTicket(@Body() data: any) { return this.crmService.createTicket(data); }
  @Patch('tickets/:id')
  updateTicket(@Param('id') id: string, @Body() data: any) { return this.crmService.updateTicket(id, data); }

  // Campaigns
  @Get('campaigns')
  getCampaigns() { return this.crmService.getCampaigns(); }
  @Post('campaigns')
  createCampaign(@Body() data: any) { return this.crmService.createCampaign(data); }
  @Patch('campaigns/:id')
  updateCampaign(@Param('id') id: string, @Body() data: any) { return this.crmService.updateCampaign(id, data); }
}
