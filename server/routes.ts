import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Get all projects
  app.get("/api/projects", async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  // Get all services
  app.get("/api/services", async (req, res) => {
    const services = await storage.getServices();
    res.json(services);
  });

  // Get pricing plans
  app.get("/api/prices", async (req, res) => {
    const prices = await storage.getPrices();
    res.json(prices);
  });

  // Get blogs
  app.get("/api/blogs", async (req, res) => {
    const blogs = await storage.getBlogs();
    res.json(blogs);
  });

  // Get partners
  app.get("/api/partners", async (req, res) => {
    const partners = await storage.getPartners();
    res.json(partners);
  });

  // Get clients
  app.get("/api/clients", async (req, res) => {
    const clients = await storage.getClients();
    res.json(clients);
  });

  // Get testimonials
  app.get("/api/testimonials", async (req, res) => {
    const testimonials = await storage.getTestimonials();
    res.json(testimonials);
  });

  // Get stats
  app.get("/api/stats", async (req, res) => {
    const stats = await storage.getStats();
    res.json(stats);
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, message } = req.body;
      
      if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required" });
      }
      
      await storage.saveContactMessage({ name, email, message });
      res.json({ success: true, message: "Message sent successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to send message" });
    }
  });

  return httpServer;
}
