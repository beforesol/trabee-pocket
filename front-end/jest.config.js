/**
 * TypeScript 사용 시 변경
 */
// const { defaults } = require('jest-config');

// module.exports = {
//   globals: {
//     'ts-jest': {
//       tsConfig: 'tsconfig.json'
//     }
//   },
//   moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
//   transform: {
//     '^.+\\.(ts|tsx)$': 'ts-jest'
//   },
//   testMatch: ['**/?(*.)+(test).+(ts|js)'],
//   testEnvironment: 'node'
// };

const { defaults } = require('jest-config');
module.exports = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  testMatch: ['**/?(*.)+(test).+(ts|js)'],
  testEnvironment: 'node'
};