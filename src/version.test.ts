import { createCli } from './index';

// Mock the Command class
jest.mock('commander', () => {
	const versionMock = jest.fn().mockReturnThis();
	const mockCommand = {
		name: jest.fn().mockReturnThis(),
		description: jest.fn().mockReturnThis(),
		version: versionMock,
		command: jest.fn().mockReturnThis(),
		action: jest.fn().mockReturnThis(),
		parse: jest.fn(),
	};

	return {
		Command: jest.fn().mockImplementation(() => mockCommand),
	};
});

describe('CLI version handling', () => {
	let originalEnv: NodeJS.ProcessEnv;
	let Command: any;

	beforeEach(() => {
		// Save original environment
		originalEnv = process.env;

		// Get the mocked Command constructor
		Command = require('commander').Command;
	});

	afterEach(() => {
		// Restore original environment
		process.env = originalEnv;
		jest.clearAllMocks();
	});

	it('should use package version when available', () => {
		// Set environment variable
		process.env = { ...process.env, npm_package_version: '2.0.0-test' };

		// Create CLI
		createCli();

		// Verify version was called with the mocked version
		expect(Command.mock.results[0].value.version).toHaveBeenCalledWith(
			'2.0.0-test',
		);
	});

	it('should fall back to default version when npm_package_version is not available', () => {
		// Remove npm_package_version from environment
		process.env = { ...process.env };
		delete process.env.npm_package_version;

		// Create CLI
		createCli();

		// Verify version was called with the fallback version
		expect(Command.mock.results[0].value.version).toHaveBeenCalledWith(
			'1.1.0',
		);
	});
});
