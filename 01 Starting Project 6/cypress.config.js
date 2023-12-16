import { defineConfig } from 'cypress';

import { seed } from './prisma/seed-test';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', { // To maintain test isolation, it is essential to sow the database before each test run.
        async seedDatabase() {
          await seed();
          return null;
        }
      })
    },
  },
});

// Running the development server and Cypress Studio simultaneously with the "npm run test:open" command.