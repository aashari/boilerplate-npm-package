import { greet } from './index';

// Mock console.log to capture output
const originalConsoleLog = console.log;
let consoleOutput: string[] = [];

beforeEach(() => {
	consoleOutput = [];
	console.log = jest.fn((message) => {
		consoleOutput.push(message);
	});
});

afterEach(() => {
	console.log = originalConsoleLog;
});

describe('greet function', () => {
	it('should output "Hello World"', () => {
		greet();
		expect(consoleOutput).toContain('Hello World');
	});
}); 