module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'plugin:react/recommended',
		'standard-with-typescript',
		'eslint-config-prettier',
	],
	overrides: [],
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: ['./tsconfig.json'],
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', 'plugin:react/jsx-runtime'],
	rules: {
		'@typescript-eslint/explicit-function-return-type': 'warn',
	},
	ignorePatterns: [
		'.eslintrc.cjs',
		'node_modules',
		'dist',
		'build',
		'coverage',
		'public',
	],
};
