import { execSync } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

describe('CLI Version Flag', () => {
	let executable: string;
	let packageVersion: string;

	beforeAll(() => {
		// Build the project before running tests
		execSync('npm run build', { stdio: 'pipe' });
		
		// Path to the built executable
		executable = path.join(process.cwd(), 'dist', 'index.js');
		
		// Get the package version from package.json
		const packageJson = JSON.parse(
			fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8')
		);
		packageVersion = packageJson.version;
	});

	it('should output the correct version when --version flag is used', () => {
		// Execute the CLI with --version flag
		const output = execSync(`node ${executable} --version`).toString().trim();
		
		// Verify the output contains the version from package.json
		expect(output).toContain(packageVersion);
	});
}); 