import { greet, createCli } from './index';

// Mock console.log to capture output
const originalConsoleLog = console.log;
let consoleOutput: string[] = [];

// Store action handlers for testing
let defaultActionHandler: () => void;
let greetActionHandler: () => void;

// Mock commander
jest.mock('commander', () => {
	// Create mock objects for command
	const greetCommand = {
		description: jest.fn().mockReturnThis(),
		action: jest.fn().mockImplementation((fn) => {
			greetActionHandler = fn;
			return greetCommand;
		}),
	};

	// Create mock program instance
	const mockProgram = {
		name: jest.fn().mockReturnThis(),
		description: jest.fn().mockReturnThis(),
		version: jest.fn().mockReturnThis(),
		command: jest.fn().mockImplementation((cmd) => {
			if (cmd === 'greet') {
				return greetCommand;
			}
			return mockProgram;
		}),
		action: jest.fn().mockImplementation((fn) => {
			defaultActionHandler = fn;
			return mockProgram;
		}),
		parse: jest.fn().mockReturnThis(),
	};

	return {
		Command: jest.fn().mockImplementation(() => mockProgram),
	};
});

beforeEach(() => {
	consoleOutput = [];
	console.log = jest.fn((message) => {
		consoleOutput.push(message);
	});
});

afterEach(() => {
	console.log = originalConsoleLog;
	jest.clearAllMocks();
});

describe('CLI commands', () => {
	it('should call greet() when the greet command is executed', () => {
		// Set up CLI
		createCli();

		// Execute the greet command action
		greetActionHandler();

		// Verify greet was called
		expect(consoleOutput).toContain('Hello World');
	});

	it('should call greet() when the default command is executed', () => {
		// Set up CLI
		createCli();

		// Execute the default action
		defaultActionHandler();

		// Verify greet was called
		expect(consoleOutput).toContain('Hello World');
	});
});
