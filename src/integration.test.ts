import { execSync } from 'child_process';
import * as path from 'path';

describe('CLI Integration', () => {
	let executable: string;

	beforeAll(() => {
		// Build the project before running tests
		execSync('npm run build', { stdio: 'pipe' });
		
		// Path to the built executable
		executable = path.join(process.cwd(), 'dist', 'index.js');
	});

	it('should output "Hello World" when executed', () => {
		// Execute the CLI directly using node
		const output = execSync(`node ${executable}`).toString().trim();
		
		// Verify the output
		expect(output).toBe('Hello World');
	});
}); 