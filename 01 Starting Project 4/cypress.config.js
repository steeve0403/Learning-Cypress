import { defineConfig } from "cypress";

export default defineConfig({
  // video: true,
    // Control video creation when running tests with Cypress run.
  //screenshotOnRunFailure: true;
    // Customize screenshot settings by setting screenshotOnRunFailure.

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

//  When using npx cypress run, you can set the browser with --browser by choosing between Chrome or Firefox.