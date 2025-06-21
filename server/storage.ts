import { users, campaigns, contacts, analytics, type User, type InsertUser, type Campaign, type InsertCampaign, type Contact, type InsertContact, type Analytics, type InsertAnalytics } from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User | undefined>;

  // Campaign operations
  getCampaigns(userId: number): Promise<Campaign[]>;
  getCampaign(id: number): Promise<Campaign | undefined>;
  createCampaign(campaign: InsertCampaign): Promise<Campaign>;
  updateCampaign(id: number, updates: Partial<Campaign>): Promise<Campaign | undefined>;
  deleteCampaign(id: number): Promise<boolean>;

  // Contact operations
  getContacts(userId: number): Promise<Contact[]>;
  getContact(id: number): Promise<Contact | undefined>;
  createContact(contact: InsertContact): Promise<Contact>;
  updateContact(id: number, updates: Partial<Contact>): Promise<Contact | undefined>;
  deleteContact(id: number): Promise<boolean>;

  // Analytics operations
  getAnalytics(userId: number): Promise<Analytics[]>;
  createAnalytics(analytics: InsertAnalytics): Promise<Analytics>;
  getAnalyticsByPlatform(userId: number, platform: string): Promise<Analytics[]>;
  getAnalyticsByCampaign(campaignId: number): Promise<Analytics[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private campaigns: Map<number, Campaign>;
  private contacts: Map<number, Contact>;
  private analytics: Map<number, Analytics>;
  private currentUserId: number;
  private currentCampaignId: number;
  private currentContactId: number;
  private currentAnalyticsId: number;

  constructor() {
    this.users = new Map();
    this.campaigns = new Map();
    this.contacts = new Map();
    this.analytics = new Map();
    this.currentUserId = 1;
    this.currentCampaignId = 1;
    this.currentContactId = 1;
    this.currentAnalyticsId = 1;

    // Initialize with demo data
    this.initializeDemoData();
  }

  private initializeDemoData() {
    // Create demo user
    const demoUser: User = {
      id: 1,
      username: "demo",
      email: "demo@marketpro.com",
      password: "password",
      firstName: "Demo",
      lastName: "User",
      company: "MarketPro Inc",
      plan: "professional",
      isActive: true,
      createdAt: new Date(),
    };
    this.users.set(1, demoUser);
    this.currentUserId = 2;

    // Create demo campaigns
    const demoCampaigns: Campaign[] = [
      {
        id: 1,
        userId: 1,
        name: "Summer Sale WhatsApp Campaign",
        platform: "whatsapp",
        status: "active",
        targetAudience: "Premium customers",
        message: "🌟 Exclusive Summer Sale! Get 50% off on all premium products. Limited time offer!",
        scheduledAt: new Date(),
        sentAt: new Date(),
        stats: { sent: 1250, delivered: 1200, opened: 980, clicked: 245 },
        createdAt: new Date(),
      },
      {
        id: 2,
        userId: 1,
        name: "Instagram Story Promotion",
        platform: "instagram",
        status: "completed",
        targetAudience: "Young professionals",
        message: "Check out our latest collection! Swipe up for exclusive deals.",
        scheduledAt: new Date(),
        sentAt: new Date(),
        stats: { sent: 5000, delivered: 4800, opened: 3200, clicked: 640 },
        createdAt: new Date(),
      },
      {
        id: 3,
        userId: 1,
        name: "Facebook Lead Generation",
        platform: "facebook",
        status: "draft",
        targetAudience: "Business owners",
        message: "Transform your business with our marketing automation platform.",
        scheduledAt: new Date(Date.now() + 86400000),
        sentAt: null,
        stats: {},
        createdAt: new Date(),
      },
    ];

    demoCampaigns.forEach(campaign => {
      this.campaigns.set(campaign.id, campaign);
    });
    this.currentCampaignId = 4;

    // Create demo contacts
    const demoContacts: Contact[] = [
      {
        id: 1,
        userId: 1,
        firstName: "John",
        lastName: "Smith",
        email: "john.smith@example.com",
        phone: "+1234567890",
        platform: "whatsapp",
        platformId: "1234567890",
        tags: ["premium", "active"],
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: 2,
        userId: 1,
        firstName: "Sarah",
        lastName: "Johnson",
        email: "sarah.johnson@example.com",
        phone: "+1234567891",
        platform: "instagram",
        platformId: "sarah_johnson_insta",
        tags: ["influencer", "partnership"],
        isActive: true,
        createdAt: new Date(),
      },
    ];

    demoContacts.forEach(contact => {
      this.contacts.set(contact.id, contact);
    });
    this.currentContactId = 3;

    // Create demo analytics
    const demoAnalytics: Analytics[] = [
      {
        id: 1,
        userId: 1,
        campaignId: 1,
        platform: "whatsapp",
        metric: "sent",
        value: 1250,
        date: new Date(),
      },
      {
        id: 2,
        userId: 1,
        campaignId: 1,
        platform: "whatsapp",
        metric: "delivered",
        value: 1200,
        date: new Date(),
      },
      {
        id: 3,
        userId: 1,
        campaignId: 2,
        platform: "instagram",
        metric: "impressions",
        value: 15000,
        date: new Date(),
      },
    ];

    demoAnalytics.forEach(analytics => {
      this.analytics.set(analytics.id, analytics);
    });
    this.currentAnalyticsId = 4;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = {
      ...insertUser,
      id,
      company: insertUser.company || null,
      plan: insertUser.plan || "starter",
      isActive: insertUser.isActive !== undefined ? insertUser.isActive : true,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getCampaigns(userId: number): Promise<Campaign[]> {
    return Array.from(this.campaigns.values()).filter(campaign => campaign.userId === userId);
  }

  async getCampaign(id: number): Promise<Campaign | undefined> {
    return this.campaigns.get(id);
  }

  async createCampaign(insertCampaign: InsertCampaign): Promise<Campaign> {
    const id = this.currentCampaignId++;
    const campaign: Campaign = {
      ...insertCampaign,
      id,
      status: insertCampaign.status || "draft",
      targetAudience: insertCampaign.targetAudience || null,
      scheduledAt: insertCampaign.scheduledAt || null,
      stats: {},
      sentAt: null,
      createdAt: new Date(),
    };
    this.campaigns.set(id, campaign);
    return campaign;
  }

  async updateCampaign(id: number, updates: Partial<Campaign>): Promise<Campaign | undefined> {
    const campaign = this.campaigns.get(id);
    if (!campaign) return undefined;
    
    const updatedCampaign = { ...campaign, ...updates };
    this.campaigns.set(id, updatedCampaign);
    return updatedCampaign;
  }

  async deleteCampaign(id: number): Promise<boolean> {
    return this.campaigns.delete(id);
  }

  async getContacts(userId: number): Promise<Contact[]> {
    return Array.from(this.contacts.values()).filter(contact => contact.userId === userId);
  }

  async getContact(id: number): Promise<Contact | undefined> {
    return this.contacts.get(id);
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const contact: Contact = {
      ...insertContact,
      id,
      email: insertContact.email || null,
      phone: insertContact.phone || null,
      isActive: insertContact.isActive !== undefined ? insertContact.isActive : true,
      tags: insertContact.tags || [],
      createdAt: new Date(),
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async updateContact(id: number, updates: Partial<Contact>): Promise<Contact | undefined> {
    const contact = this.contacts.get(id);
    if (!contact) return undefined;
    
    const updatedContact = { ...contact, ...updates };
    this.contacts.set(id, updatedContact);
    return updatedContact;
  }

  async deleteContact(id: number): Promise<boolean> {
    return this.contacts.delete(id);
  }

  async getAnalytics(userId: number): Promise<Analytics[]> {
    return Array.from(this.analytics.values()).filter(analytics => analytics.userId === userId);
  }

  async createAnalytics(insertAnalytics: InsertAnalytics): Promise<Analytics> {
    const id = this.currentAnalyticsId++;
    const analytics: Analytics = {
      ...insertAnalytics,
      id,
      campaignId: insertAnalytics.campaignId || null,
      date: new Date(),
    };
    this.analytics.set(id, analytics);
    return analytics;
  }

  async getAnalyticsByPlatform(userId: number, platform: string): Promise<Analytics[]> {
    return Array.from(this.analytics.values()).filter(
      analytics => analytics.userId === userId && analytics.platform === platform
    );
  }

  async getAnalyticsByCampaign(campaignId: number): Promise<Analytics[]> {
    return Array.from(this.analytics.values()).filter(
      analytics => analytics.campaignId === campaignId
    );
  }
}

export const storage = new MemStorage();
