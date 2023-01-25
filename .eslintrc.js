module.exports = {
	  extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
	  ],
	  plugins: ['@typescript-eslint'],
	  parser: '@typescript-eslint/parser',
	  rules: {
		
	  },
	  ignorePatterns: ['dist/**/*', 'tests/**/*', '**/*.js'],
};