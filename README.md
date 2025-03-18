# @aashari/boilerplate-npm-package

A simple TypeScript npm package boilerplate with automated publishing to npm using GitHub Actions.

## Installation

```bash
npm install @aashari/boilerplate-npm-package
```

## Usage

```javascript
// ES Modules
import { greet } from '@aashari/boilerplate-npm-package';

// CommonJS
const { greet } = require('@aashari/boilerplate-npm-package');

// Call the function
greet(); // Outputs "Hello World"
```

## Testing

This package uses integration testing over mocking, running actual commands and verifying their output.

To run tests:

```bash
npm test
```

### Test types:

1. **Basic unit tests** - Simple verification of function behavior
2. **CLI integration tests** - Test the CLI by executing the actual compiled command
3. **Version flag tests** - Ensure the version flag returns the correct version from package.json

## Development

1. Clone this repository
2. Install dependencies: `npm install`
3. Make your changes
4. Build the package: `npm run build`
5. Run tests: `npm test`

## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

## License

MIT 