import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertFirmSchema, insertAccountSchema, insertPromotionSchema } from "@/shared/schema";
import { z } from "zod";
import crypto from "crypto";

export async function registerRoutes(app: Express): Promise<Server> {
  // Middleware for HMAC validation (for Airflow sync)
  const validateHMAC = (req: any, res: any, next: any) => {
    const signature = req.headers['x-hmac-signature'];
    const secret = process.env.AIRFLOW_HMAC_SECRET || 'default-secret';
    
    if (!signature) {
      return res.status(401).json({ message: 'Missing HMAC signature' });
    }

    const body = JSON.stringify(req.body);
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex');

    if (signature !== `sha256=${expectedSignature}`) {
      return res.status(401).json({ message: 'Invalid HMAC signature' });
    }

    next();
  };

  // Public API endpoints
  
  // GET /api/firms - Get firms with filtering and sorting
  app.get('/api/firms', async (req, res) => {
    try {
      const {
        locale = 'en',
        sort = 'discount_desc',
        size,
        minDiscount,
        maxPayoutDays,
        platform,
        limit = '50',
        offset = '0'
      } = req.query;

      const options = {
        locale: String(locale),
        sort: String(sort),
        accountSize: size ? parseInt(String(size)) : undefined,
        minDiscount: minDiscount ? parseFloat(String(minDiscount)) : undefined,
        maxPayoutDays: maxPayoutDays ? parseInt(String(maxPayoutDays)) : undefined,
        platform: platform ? String(platform) : undefined,
        limit: parseInt(String(limit)),
        offset: parseInt(String(offset)),
      };

      const firms = await storage.getFirms(options);
      
      res.set({
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        'Content-Type': 'application/json',
      });
      
      res.json(firms);
    } catch (error) {
      console.error('Error fetching firms:', error);
      res.status(500).json({ message: 'Failed to fetch firms' });
    }
  });

  // GET /api/firms/:slug - Get firm details
  app.get('/api/firms/:slug', async (req, res) => {
    try {
      const { slug } = req.params;
      const { locale = 'en' } = req.query;

      const firm = await storage.getFirmBySlug(slug, String(locale));
      
      if (!firm) {
        return res.status(404).json({ message: 'Firm not found' });
      }

      res.set({
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        'Content-Type': 'application/json',
      });
      
      res.json(firm);
    } catch (error) {
      console.error('Error fetching firm:', error);
      res.status(500).json({ message: 'Failed to fetch firm' });
    }
  });

  // GET /api/promotions - Get active promotions
  app.get('/api/promotions', async (req, res) => {
    try {
      const promotions = await storage.getActivePromotions();
      
      res.set({
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
        'Content-Type': 'application/json',
      });
      
      res.json(promotions);
    } catch (error) {
      console.error('Error fetching promotions:', error);
      res.status(500).json({ message: 'Failed to fetch promotions' });
    }
  });

  // Admin API endpoints (basic auth would be implemented here)
  
  // POST /api/admin/firms
  app.post('/api/admin/firms', async (req, res) => {
    try {
      const firmData = insertFirmSchema.parse(req.body);
      const firm = await storage.createFirm(firmData);
      res.status(201).json(firm);
    } catch (error) {
      console.error('Error creating firm:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Validation error', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to create firm' });
    }
  });

  // PUT /api/admin/firms/:id
  app.put('/api/admin/firms/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const firmData = insertFirmSchema.partial().parse(req.body);
      const firm = await storage.updateFirm(id, firmData);
      res.json(firm);
    } catch (error) {
      console.error('Error updating firm:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Validation error', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to update firm' });
    }
  });

  // DELETE /api/admin/firms/:id
  app.delete('/api/admin/firms/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteFirm(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting firm:', error);
      res.status(500).json({ message: 'Failed to delete firm' });
    }
  });

  // POST /api/admin/accounts
  app.post('/api/admin/accounts', async (req, res) => {
    try {
      const accountData = insertAccountSchema.parse(req.body);
      const account = await storage.createAccount(accountData);
      res.status(201).json(account);
    } catch (error) {
      console.error('Error creating account:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Validation error', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to create account' });
    }
  });

  // PUT /api/admin/accounts/:id
  app.put('/api/admin/accounts/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const accountData = insertAccountSchema.partial().parse(req.body);
      const account = await storage.updateAccount(id, accountData);
      res.json(account);
    } catch (error) {
      console.error('Error updating account:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Validation error', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to update account' });
    }
  });

  // DELETE /api/admin/accounts/:id
  app.delete('/api/admin/accounts/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteAccount(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting account:', error);
      res.status(500).json({ message: 'Failed to delete account' });
    }
  });

  // POST /api/admin/promotions
  app.post('/api/admin/promotions', async (req, res) => {
    try {
      const promotionData = insertPromotionSchema.parse(req.body);
      const promotion = await storage.createPromotion(promotionData);
      res.status(201).json(promotion);
    } catch (error) {
      console.error('Error creating promotion:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Validation error', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to create promotion' });
    }
  });

  // PUT /api/admin/promotions/:id
  app.put('/api/admin/promotions/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const promotionData = insertPromotionSchema.partial().parse(req.body);
      const promotion = await storage.updatePromotion(id, promotionData);
      res.json(promotion);
    } catch (error) {
      console.error('Error updating promotion:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Validation error', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to update promotion' });
    }
  });

  // DELETE /api/admin/promotions/:id
  app.delete('/api/admin/promotions/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deletePromotion(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting promotion:', error);
      res.status(500).json({ message: 'Failed to delete promotion' });
    }
  });

  // Airflow sync endpoints
  
  // POST /api/admin/firms/sync
  app.post('/api/admin/firms/sync', validateHMAC, async (req, res) => {
    try {
      const firmsData = req.body;
      if (!Array.isArray(firmsData)) {
        return res.status(400).json({ message: 'Expected array of firms' });
      }

      const result = await storage.syncFirms(firmsData);
      res.json(result);
    } catch (error) {
      console.error('Error syncing firms:', error);
      res.status(500).json({ message: 'Failed to sync firms' });
    }
  });

  // POST /api/admin/promotions/sync
  app.post('/api/admin/promotions/sync', validateHMAC, async (req, res) => {
    try {
      const promotionsData = req.body;
      if (!Array.isArray(promotionsData)) {
        return res.status(400).json({ message: 'Expected array of promotions' });
      }

      const result = await storage.syncPromotions(promotionsData);
      res.json(result);
    } catch (error) {
      console.error('Error syncing promotions:', error);
      res.status(500).json({ message: 'Failed to sync promotions' });
    }
  });

  // SEO endpoints
  
  // GET /sitemap.xml
  app.get('/sitemap.xml', async (req, res) => {
    try {
      const firms = await storage.getFirms({ limit: 1000 });
      const locales = ['en', 'ko', 'ja', 'hi'];
      const baseUrl = process.env.BASE_URL || 'https://proprank.com';
      
      let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

      // Homepage
      locales.forEach(locale => {
        sitemap += `
  <url>
    <loc>${baseUrl}/${locale}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>1.0</priority>`;
    
        locales.forEach(altLocale => {
          sitemap += `
    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${baseUrl}/${altLocale}" />`;
        });
        
        sitemap += `
  </url>`;
      });

      // Firm pages
      firms.forEach(firm => {
        locales.forEach(locale => {
          sitemap += `
  <url>
    <loc>${baseUrl}/${locale}/firms/${firm.slug}</loc>
    <lastmod>${firm.updatedAt?.toISOString()}</lastmod>
    <priority>0.8</priority>`;
          
          locales.forEach(altLocale => {
            sitemap += `
    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${baseUrl}/${altLocale}/firms/${firm.slug}" />`;
          });
          
          sitemap += `
  </url>`;
        });
      });

      sitemap += `
</urlset>`;

      res.set({
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=86400',
      });
      res.send(sitemap);
    } catch (error) {
      console.error('Error generating sitemap:', error);
      res.status(500).send('Error generating sitemap');
    }
  });

  // GET /robots.txt
  app.get('/robots.txt', (req, res) => {
    const baseUrl = process.env.BASE_URL || 'https://proprank.com';
    const robots = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml`;

    res.set({
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, s-maxage=86400',
    });
    res.send(robots);
  });

  const httpServer = createServer(app);
  return httpServer;
}
