import { greet, createCli } from './index';

// Mock console.log to capture output
const originalConsoleLog = console.log;
let consoleOutput: string[] = [];

// Mock commander
jest.mock('commander', () => {
	// Mock program instance
	const mockProgramInstance = {
		name: jest.fn().mockReturnThis(),
		description: jest.fn().mockReturnThis(),
		version: jest.fn().mockReturnThis(),
		command: jest.fn().mockReturnThis(),
		action: jest.fn().mockReturnThis(),
		parse: jest.fn(),
	};

	// Mock Command constructor
	const MockCommand = jest.fn().mockImplementation(() => mockProgramInstance);

	// Mock command method to return an object with action method
	mockProgramInstance.command.mockImplementation(() => ({
		description: jest.fn().mockReturnThis(),
		action: jest.fn(),
	}));

	return { Command: MockCommand };
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

describe('greet function', () => {
	it('should output "Hello World"', () => {
		greet();
		expect(consoleOutput).toContain('Hello World');
	});
});

describe('createCli function', () => {
	it('should create and configure a CLI program', () => {
		const program = createCli();

		// Verify program configuration
		expect(program.name).toHaveBeenCalled();
		expect(program.description).toHaveBeenCalled();
		expect(program.version).toHaveBeenCalled();
		expect(program.command).toHaveBeenCalledWith('greet');
		expect(program.action).toHaveBeenCalled();
	});
});
