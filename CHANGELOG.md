# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.7.0] - 2024-12-11

### Added
- Complete monorepo reorganization with Turborepo
- GitHub Actions for CI/CD
- Vercel deployment configurations
- WordPress plugin with React admin UI
- Documentation site with Docusaurus
- Shared packages for types, configs, and UI components
- Comprehensive release and deployment strategy
- Comprehensive icon system for navigation and footer
- Semantic icons for all navigation dropdowns
- Icon support in header and footer components

### Changed
- Migrated to pnpm workspaces
- Improved project structure and organization
- Enhanced TypeScript configuration
- Optimized build process
- Updated navigation dropdowns with contextual icons
- Improved footer link organization with icons

### Fixed
- Icon rendering issues in navigation and footer
- Configuration file usage (migrated to saas-layout-client.config.tsx)
- External link icon overuse replaced with semantic icons

### Security
- Added security headers in Vercel configuration
- Implemented webhook secret validation

## [0.1.0] - 2024-12-10

### Added
- Initial release
- Next.js 14+ application with App Router
- WordPress integration via GraphQL
- ACF Flexible Content support
- Blog functionality
- ISR and on-demand revalidation
- Preview mode support

[Unreleased]: https://github.com/flatwp/flatwp/compare/v0.7.0...HEAD
[0.7.0]: https://github.com/flatwp/flatwp/compare/v0.1.0...v0.7.0
[0.1.0]: https://github.com/flatwp/flatwp/releases/tag/v0.1.0