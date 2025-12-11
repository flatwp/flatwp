# FlatWP - Modern Headless WordPress with Next.js

A high-performance, production-ready monorepo for building headless WordPress sites with Next.js 14+, TypeScript, and TailwindCSS.

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/flatwp/flatwp.git
cd flatwp

# Install dependencies
pnpm install

# Set up environment variables
cp apps/web/.env.example apps/web/.env.local
# Edit .env.local with your WordPress GraphQL endpoint

# Start development
pnpm dev:web   # Main website (port 3010)
pnpm dev:docs  # Documentation site (port 3001)
```

## 📁 Monorepo Structure

```
flatwp/
├── apps/
│   ├── web/                 # Main Next.js application
│   ├── docs/                # Documentation website
│   └── wordpress-plugin/    # WordPress companion plugin
├── packages/
│   ├── types/               # Shared TypeScript types
│   ├── config/              # Shared configurations
│   ├── ui/                  # Shared React components
│   └── wordpress-client/    # WordPress GraphQL client
├── documentation/           # Documentation source files
│   ├── development/         # Technical documentation
│   └── user/                # End-user documentation
└── scripts/                 # Build and utility scripts
```

## 🛠️ Technology Stack

- **Frontend**: Next.js 14+ (App Router), React 18, TypeScript
- **Styling**: TailwindCSS v3, Shadcn/ui components
- **CMS**: WordPress 6.4+ with WPGraphQL
- **Build**: Turborepo, pnpm workspaces
- **Deployment**: Vercel (recommended)

## 📦 Packages

| Package | Description |
|---------|-------------|
| `@flatwp/ui` | Shared React components and design system |
| `@flatwp/types` | TypeScript type definitions |
| `@flatwp/wordpress-client` | WordPress GraphQL client and adapters |
| `@flatwp/config` | Shared configuration files |

## 🔧 Available Scripts

```bash
# Development
pnpm dev           # Start all apps in development mode
pnpm dev:web       # Start web app only
pnpm dev:docs      # Start docs app only

# Building
pnpm build         # Build all apps
pnpm build:web     # Build web app only
pnpm build:docs    # Build docs app only

# Code Quality
pnpm lint          # Run ESLint
pnpm typecheck     # Run TypeScript type checking
pnpm format        # Format code with Prettier

# Documentation
pnpm generate:docs # Generate API documentation
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables:
   - `NEXT_PUBLIC_WORDPRESS_API_URL`: Your WordPress GraphQL endpoint
   - `FLATWP_SECRET`: Secret key for revalidation webhooks
3. Deploy

### Manual Deployment

```bash
pnpm build:web
# Deploy the .next directory to your hosting provider
```

## 📖 Documentation

- **Getting Started**: [/documentation/user/getting-started](./documentation/user/getting-started)
- **Guides**: [/documentation/user/guides](./documentation/user/guides)
- **API Reference**: [/documentation/development/api](./documentation/development/api)
- **Architecture**: [/documentation/development/architecture](./documentation/development/architecture)

Visit [docs.flatwp.com](https://docs.flatwp.com) for the full documentation.

## 🤝 Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- WordPress community for the powerful CMS
- Next.js team for the amazing framework
- Vercel for hosting and deployment
- All contributors and users of FlatWP

## 🔗 Links

- [Website](https://flatwp.com)
- [Documentation](https://docs.flatwp.com)
- [GitHub](https://github.com/flatwp/flatwp)
- [Discord Community](#)