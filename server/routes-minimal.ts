import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Simple test route
  app.get('/api/test', (req, res) => {
    res.json({ message: 'Test route working' });
  });

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

  const httpServer = createServer(app);
  return httpServer;
}