# PropRank - Prop Trading Firm Comparison Platform

## Overview

PropRank is a comprehensive prop trading firm ranking and comparison website that helps traders find the best proprietary trading opportunities. The platform aggregates and compares prop firms based on their account sizes, pricing, discounts, payout terms, and trading rules. Built as a full-stack web application, it serves as a marketplace for prop trading challenges with affiliate tracking and real-time promotional data.

The system provides a multilingual experience (English, Korean, Japanese, Hindi) with SEO optimization for organic discovery. It includes both public-facing comparison tools and admin interfaces for content management, with data synchronization capabilities for external systems like Airflow.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client is built with React 18 using Vite as the build tool and TypeScript for type safety. The UI leverages shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling. The application uses Wouter for lightweight client-side routing and TanStack Query for server state management.

Key architectural decisions include:
- **Component Structure**: Modular component architecture with reusable UI components
- **State Management**: TanStack Query for server state, React Context for client state (i18n, SEO)
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **Type Safety**: Full TypeScript coverage with shared types between client and server

### Backend Architecture
The server is built with Express.js and follows a RESTful API design pattern. The application uses a layered architecture separating concerns between routes, storage, and database access.

Core backend components:
- **API Layer**: Express routes handling HTTP requests with HMAC validation for external integrations
- **Storage Layer**: Abstraction over database operations with comprehensive interfaces
- **Database Layer**: Drizzle ORM with Neon PostgreSQL for data persistence
- **Authentication**: Simple admin authentication for content management

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

### External Integrations
The system includes integration points for external data sources:
- **Trustpilot Integration**: Authentic review data integration with real ratings and review counts
- **Airflow Integration**: HMAC-secured endpoints for data synchronization
- **Analytics**: UTM parameter tracking for affiliate conversions
- **SEO Tools**: Structured data, meta tags, and sitemap generation

### Content Management System
**Guide and News Detail Pages (January 2025)**:
- Created comprehensive guide detail pages (`/[locale]/guides/[slug]`)
- Added news article detail pages (`/[locale]/news/[slug]`)
- Rich content with proper formatting, metadata, and navigation
- Sample content includes prop trading fundamentals, risk management strategies
- News articles cover industry updates, regulations, and firm announcements
- Proper SEO optimization and responsive design

**Navigation Enhancement**:
- Fixed navigation highlighting for reviews, guides, and news pages
- Navigation now properly highlights active section using `startsWith()` matching
- Improved user experience with clear visual indication of current page

**Dark Mode Improvements**:
- Fixed critical dark mode styling issues on firm detail pages
- Replaced all hardcoded gray colors with semantic Tailwind classes
- Added proper dark mode variants for all colored backgrounds and text
- Enhanced readability and contrast in dark theme

### Review System Architecture
The platform includes a comprehensive review system that integrates authentic Trustpilot data:

**Review Overview Page** (`/[locale]/reviews`):
- Displays all firms with their actual Trustpilot ratings and review counts
- Features search functionality, sorting by rating/reviews/trust score
- Shows summary statistics and recent review previews
- Uses authentic data: FTMO (4.8★, 25,710 reviews), Topstep (4.3★, 10,928 reviews), TopstepFX (4.9★, 467 reviews)

**Database Schema Extensions**:
- Added `trustpilotUrl` and `trustpilotBusinessId` fields to firms table
- Support for storing authentic review metadata and ratings
- Removed individual firm review functionality in favor of Trustpilot integration

### Performance Optimizations
- **Query Optimization**: Efficient database queries with proper indexing
- **Caching Strategy**: Client-side caching with TanStack Query
- **Bundle Optimization**: Code splitting and tree shaking with Vite
- **Image Optimization**: Support for optimized image loading

## External Dependencies

### Database and ORM
- **Neon PostgreSQL**: Serverless PostgreSQL database for production scalability
- **Drizzle ORM**: Type-safe database operations with migration support
- **Database Connection**: Connection pooling with @neondatabase/serverless

### Frontend Libraries
- **React Ecosystem**: React 18 with TypeScript and Vite for modern development
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with custom theming support
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing

### Development and Build Tools
- **TypeScript**: Full type safety across the entire application
- **ESBuild**: Fast bundling for production builds
- **PostCSS**: CSS processing with Tailwind and Autoprefixer
- **Vite Plugins**: Runtime error overlay and development tools

### Third-Party Services
- **Font Loading**: Google Fonts integration for typography
- **Development Environment**: Replit-specific tooling and banners
- **External APIs**: HMAC-secured integration with Airflow for data sync

### Utility Libraries
- **Date Manipulation**: date-fns for countdown timers and date formatting
- **Class Management**: clsx and tailwind-merge for dynamic styling
- **Validation**: Zod with Drizzle integration for schema validation
- **Session Management**: connect-pg-simple for PostgreSQL session storage