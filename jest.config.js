module.exports = {
  // support the same @ -> src alias mapping in source code
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  moduleFileExtensions: [
    'js',
    'json',
    // tell Jest to handle `*.vue` files
    'vue',
  ],

  transform: {
    // process `*.vue` files with `vue-jest`
    '.*\\.(vue)$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    // process `*.js` files with `babel-jest`
    '.*\\.(js)$': 'babel-jest',
  },

  modulePaths: [
    '<rootDir>/src',
    '<rootDir>/node_modules',
  ],

  preset: '@vue/cli-plugin-unit-jest',
};
