# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.2] - 2025-01-28

### Fixed

- Fixed incorrect URL casing (/export/Cff2 -> /export/cff2) that was causing API calls to fail

## [1.1.0] - 2025-01-27

### Added

- Comprehensive JSDoc documentation for all methods and types
- Enhanced error handling with more descriptive error messages
- Improved README with better usage examples and code samples

### Improved

- Developer experience with better documentation and examples

## [1.0.0] - 2025-06-21

### Added

- Initial release of Phoenix API TypeScript SDK
- Complete Phoenix API coverage with 200+ methods
- Automatic retry logic for 503 errors with configurable timeouts
- Full TypeScript support with comprehensive type definitions
- Support for all Phoenix API endpoints:
  - Job and project management
  - Layout operations and automation
  - Product management and manipulation
  - Export functionality (PDF, JDF, DXF, etc.)
  - Library management (stocks, templates, scripts, etc.)
  - Imposition AI tools
- Convenience factory function `createPhoenixAPI()`
- Built-in error handling and retry mechanisms
- Tree-shakeable exports
- CommonJS and ESM support
- Complete documentation and examples

### Features

- 🔄 Automatic retry logic for Phoenix API concurrency limits
- 📝 Full TypeScript support with generated types from OpenAPI spec
- 🛡️ Robust error handling for production use
- 🎯 Complete API coverage - all endpoints implemented
- 🏗️ Production-ready job and layout management
- 🤖 AI integration for imposition, optimization, and planning
- 📊 Support for all export formats
- 📚 Complete library resource management
- 📦 Tree-shakeable for optimal bundle size
- 🎨 Clean, intuitive API design
