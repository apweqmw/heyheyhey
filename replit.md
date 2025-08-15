# PropFirmMentor - Next.js Prop Trading Firm Comparison Platform

## Overview

PropFirmMentor is a comprehensive prop trading firm ranking and comparison website built with Next.js that helps traders find the best proprietary trading opportunities. The platform aggregates and compares prop firms based on their account sizes, pricing, discounts, payout terms, and trading rules. Built as a full-stack Next.js application with Server-Side Rendering (SSR), it serves as a marketplace for prop trading challenges with affiliate tracking and real-time promotional data.

The system provides a multilingual experience (English, Korean, Japanese, Hindi) with comprehensive SEO optimization for organic discovery, including robots.txt, sitemaps, structured data, and meta tags. It includes both public-facing comparison tools and admin interfaces for content management, with data synchronization capabilities for external systems.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application is built with Next.js 15 using the App Router for modern React patterns and TypeScript for type safety. The UI leverages shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling. The application uses Next.js built-in routing and TanStack Query for server state management.

Key architectural decisions include:
- **SSR/SSG**: Server-Side Rendering with static generation for optimal SEO performance
- **App Router**: Next.js 15 App Router for file-based routing and layout management
- **Component Structure**: Modular component architecture with reusable UI components
- **State Management**: TanStack Query for server state, React Context for client state (i18n, theming)
- **Styling**: Tailwind CSS with CSS custom properties for theming and dark mode
- **Type Safety**: Full TypeScript coverage with shared types between client and server

### Backend Architecture
The server is built with Next.js API Routes following a RESTful API design pattern. The application uses a layered architecture separating concerns between API routes, storage, and database access.

Core backend components:
- **API Layer**: Next.js API routes handling HTTP requests with built-in request/response handling
- **Storage Layer**: Abstraction over database operations with comprehensive interfaces
- **Database Layer**: Drizzle ORM with Neon PostgreSQL for data persistence
- **SEO Layer**: Built-in Next.js SEO with robots.txt, sitemaps, and structured data

### Database Design
The system uses PostgreSQL with a schema designed around three main entities:

**Firms Table**: Stores prop firm information with multilingual content support
- Localized descriptions and trading rules stored as JSONB
- Platform support, payout terms, and rating information
- SEO-friendly slugs and referral tracking data

**Accounts Table**: Represents different account sizes for each firm
- Flexible pricing structure with base and current pricing
- Support for multiple account sizes per firm

**Promotions Table**: Manages time-limited offers and discounts
- Discount percentages with expiration dates
- Landing page URLs for conversion tracking

### Data Architecture Patterns
- **Localization**: Content stored in multiple languages within the same records using JSONB fields
- **Pricing Flexibility**: Separate current pricing from base pricing to support dynamic discounts
- **Referral Tracking**: Built-in affiliate link and coupon code management
- **SEO Optimization**: Slug-based URLs with comprehensive metadata support

### SEO Optimization
The Next.js migration includes comprehensive SEO features:
- **Meta Tags**: Dynamic meta titles, descriptions, and Open Graph tags per page
- **Robots.txt**: Search engine crawling directives
- **Sitemap**: Automated XML sitemap generation for all pages and firms
- **Structured Data**: JSON-LD for rich snippets
- **Server-Side Rendering**: Full SSR for optimal search engine indexing
- **Performance**: Static generation where possible for fast page loads

### External Integrations
The system includes integration points for external data sources:
- **Analytics**: UTM parameter tracking for affiliate conversions
- **Social Media**: Open Graph and Twitter card optimization

### Performance Optimizations
- **Server-Side Rendering**: Full SSR for optimal initial page loads
- **Static Generation**: Pre-built pages where possible
- **Query Optimization**: Efficient database queries with proper indexing
- **Caching Strategy**: Client-side caching with TanStack Query and Next.js built-in caching
- **Bundle Optimization**: Automatic code splitting and tree shaking with Next.js
- **Image Optimization**: Next.js built-in Image component for optimized loading

## External Dependencies

### Database and ORM
- **Neon PostgreSQL**: Serverless PostgreSQL database for production scalability
- **Drizzle ORM**: Type-safe database operations with migration support
- **Database Connection**: Connection pooling with @neondatabase/serverless

### Frontend Libraries
- **Next.js Ecosystem**: Next.js 15 with TypeScript for modern full-stack development
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with custom theming and dark mode support
- **State Management**: TanStack Query for server state management
- **Routing**: Next.js App Router for file-based routing and layouts

### Development and Build Tools
- **TypeScript**: Full type safety across the entire application
- **Next.js Build**: Optimized production builds with automatic code splitting
- **PostCSS**: CSS processing with Tailwind and Autoprefixer
- **Next.js Dev Tools**: Built-in development server with hot reloading

### Third-Party Services
- **Font Loading**: Next.js optimized Google Fonts integration
- **Development Environment**: Replit-specific tooling and banners
- **SEO Services**: Built-in Next.js SEO optimization tools

### Utility Libraries
- **Date Manipulation**: date-fns for countdown timers and date formatting
- **Class Management**: clsx and tailwind-merge for dynamic styling
- **Validation**: Zod with Drizzle integration for schema validation
- **Session Management**: connect-pg-simple for PostgreSQL session storage