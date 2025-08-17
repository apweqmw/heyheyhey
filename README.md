# PropRank - Prop Trading Firm Comparison Platform

A comprehensive prop trading firm ranking and comparison website that helps traders find the best proprietary trading opportunities. The platform aggregates and compares prop firms based on their account sizes, pricing, discounts, payout terms, and trading rules with authentic Trustpilot review integration.

## 🚀 Features

### Core Functionality
- **Comprehensive Firm Comparison**: Compare 6+ legitimate prop trading firms with real-time pricing
- **Authentic Review Integration**: Real Trustpilot ratings and review counts (FTMO: 4.8★/25,710 reviews, Topstep: 4.3★/10,928 reviews)
- **Advanced Search**: Real-time firm search with dropdown suggestions
- **Discount Tracking**: Live discount codes and promotional offers with countdown timers
- **Multi-language Support**: English, Korean, Japanese, and Hindi localization

### User Experience
- **Mobile-First Design**: Fully responsive design optimized for all devices
- **Dark Mode Support**: Complete light/dark theme switching
- **SEO Optimized**: Structured data, meta tags, and multilingual SEO
- **Performance Optimized**: Fast loading with efficient caching strategies

### Content Management
- **Trading Guides**: Educational content for traders
- **Industry News**: Latest prop trading industry updates
- **Review System**: Detailed firm reviews with filtering and sorting
- **Affiliate Tracking**: UTM parameter tracking for conversions

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript for type safety
- **Vite** for fast development and building
- **Tailwind CSS** for styling with shadcn/ui components
- **Wouter** for lightweight client-side routing
- **TanStack Query** for server state management
- **Framer Motion** for animations

### Backend
- **Express.js** REST API with TypeScript
- **Drizzle ORM** with Neon PostgreSQL
- **Session Management** with PostgreSQL storage
- **HMAC Security** for external integrations

### Infrastructure
- **PostgreSQL Database** (Neon serverless)
- **Replit Deployments** ready
- **Environment Variables** for configuration

## 📦 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd proprank
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env` file with:
```env
DATABASE_URL=your_postgresql_url
NODE_ENV=development
```

4. **Initialize database**
```bash
npm run db:push
```

5. **Start development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## 🏗 Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utilities (i18n, SEO, etc.)
│   │   └── hooks/         # Custom React hooks
├── server/                # Backend Express application
│   ├── routes.ts          # API route definitions
│   ├── storage.ts         # Database layer abstraction
│   └── index.ts           # Server entry point
├── shared/                # Shared types and schemas
│   └── schema.ts          # Database schema and types
└── attached_assets/       # Static assets and images
```

## 🎯 Key Features Detail

### Firm Comparison
- Real-time pricing from 6 legitimate prop firms
- Account sizes from $10,000 to $200,000
- Live discount tracking with expiration timers
- Payout split comparisons (80/20 to 90/10)
- Platform support (MT4, MT5, NinjaTrader, etc.)

### Review System
- Authentic Trustpilot integration
- Real review counts and ratings
- Star rating distribution
- Recent review previews
- Business reply functionality

### Multilingual Support
- English (default)
- Korean (한국어)
- Japanese (日本語)
- Hindi (हिन्दी)
- SEO-optimized URLs for each language

### Mobile Optimization
- Responsive card layouts
- Touch-friendly interfaces
- Optimized typography scaling
- Mobile-specific navigation

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Drizzle Studio

### Database Management
The project uses Drizzle ORM with PostgreSQL. Schema changes should be made in `shared/schema.ts` and pushed using:
```bash
npm run db:push
```

### Adding New Firms
1. Add firm data to the database via the storage interface
2. Include authentic Trustpilot data (URL and business ID)
3. Add promotional offers and account configurations
4. Test across all supported languages

### Internationalization
Translations are managed in `client/src/lib/i18n.tsx`. To add new languages:
1. Add language code to supported locales
2. Add translations for all existing keys
3. Test URL routing and SEO metadata

## 🚦 API Endpoints

### Public Endpoints
- `GET /api/firms` - List all firms with accounts and promotions
- `GET /api/firms/:slug` - Get specific firm details
- `GET /api/reviews/overview` - Get firm review summaries

### Data Sync (HMAC Protected)
- `POST /api/sync/firms` - Sync firm data from external sources
- `POST /api/sync/accounts` - Sync account configurations
- `POST /api/sync/promotions` - Sync promotional offers

## 🌐 Deployment

The application is configured for Replit Deployments:

1. **Environment Setup**: Ensure all environment variables are configured
2. **Database**: Verify PostgreSQL connection and schema
3. **Deploy**: Use Replit's deploy button or CI/CD integration

### Production Considerations
- Enable HTTPS for secure data transmission
- Configure CDN for static assets
- Set up monitoring and error tracking
- Implement rate limiting for API endpoints

## 📊 Analytics & Tracking

### Affiliate Tracking
- UTM parameters for conversion tracking
- Coupon code usage analytics
- Click-through rate monitoring

### SEO Analytics
- Structured data for search engines
- Multilingual sitemap generation
- Meta tag optimization per locale

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- TypeScript for all new code
- Tailwind CSS for styling
- React Query for API calls
- ESLint/Prettier for code formatting

## 🔒 Security

- HMAC validation for external API integrations
- Environment variable management for sensitive data
- HTTPS enforcement in production
- Input validation and sanitization

## 📝 License

This project is proprietary software. All rights reserved.

## 🆘 Support

For questions or issues:
1. Check existing documentation in `replit.md`
2. Review console logs for debugging information
3. Test across multiple browsers and devices
4. Verify database connectivity and schema

---

**Built with ❤️ for the prop trading community**