module.exports = {
	  extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
	  ],
	  plugins: ['@typescript-eslint'],
	  parser: '@typescript-eslint/parser',
	  rules: {
		//'no-console': 'off',
		//'no-unused-vars': 'off',
		//'no-undef': 'off',
		//'no-prototype-builtins': 'off',
	  },
	  ignorePatterns: ['dist/**/*', 'tests/**/*', '**/*.js'],
};