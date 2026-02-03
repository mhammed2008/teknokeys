import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Projects
export const projectSchema = z.object({
  id: z.string(),
  title: z.object({
    en: z.string(),
    ar: z.string(),
  }),
  description: z.object({
    en: z.string(),
    ar: z.string(),
  }),
  images: z.array(z.string()),
  websiteUrl: z.string().optional(),
  playStoreUrl: z.string().optional(),
  appStoreUrl: z.string().optional(),
});

export type Project = z.infer<typeof projectSchema>;

// Services
export const serviceSchema = z.object({
  id: z.string(),
  title: z.object({
    en: z.string(),
    ar: z.string(),
  }),
  description: z.object({
    en: z.string(),
    ar: z.string(),
  }),
  features: z.array(z.object({
    en: z.string(),
    ar: z.string(),
  })),
  image: z.string(),
});

export type Service = z.infer<typeof serviceSchema>;

// Pricing Plans
export const pricingSchema = z.object({
  id: z.string(),
  name: z.object({
    en: z.string(),
    ar: z.string(),
  }),
  price: z.number(),
  renewalPrice: z.number(),
  features: z.array(z.object({
    en: z.string(),
    ar: z.string(),
  })),
  isPopular: z.boolean().optional(),
});

export type PricingPlan = z.infer<typeof pricingSchema>;

// Blogs
export const blogSchema = z.object({
  id: z.string(),
  title: z.object({
    en: z.string(),
    ar: z.string(),
  }),
  excerpt: z.object({
    en: z.string(),
    ar: z.string(),
  }),
  image: z.string(),
  url: z.string(),
});

export type Blog = z.infer<typeof blogSchema>;

// Clients/Partners
export const partnerSchema = z.object({
  id: z.string(),
  name: z.string(),
  logo: z.string(),
  type: z.enum(["client", "partner"]),
});

export type Partner = z.infer<typeof partnerSchema>;

// Testimonials
export const testimonialSchema = z.object({
  id: z.string(),
  name: z.object({
    en: z.string(),
    ar: z.string(),
  }),
  company: z.object({
    en: z.string(),
    ar: z.string(),
  }),
  content: z.object({
    en: z.string(),
    ar: z.string(),
  }),
});

export type Testimonial = z.infer<typeof testimonialSchema>;

// Contact Form
export const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export type ContactForm = z.infer<typeof contactFormSchema>;

// Company Stats
export const statsSchema = z.object({
  cybersecurityProjects: z.number(),
  mobileWebProjects: z.number(),
  serviceGuarantee: z.string(),
  totalDevelopment: z.string(),
});

export type CompanyStats = z.infer<typeof statsSchema>;
