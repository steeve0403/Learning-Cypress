import { defineConfig } from "cypress";

export default defineConfig({
  // video: true,
    // Control video creation when running tests with Cypress run.
  //screenshotOnRunFailure: true;
    // Customize screenshot settings by setting screenshotOnRunFailure.

  e2e: {
    baseUrl: 'http://localhost:5173', // Setting the URL base simplifies calling the visit function, allowing you to focus on the URL path rather than the full URL.
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', { // Events, such as "task", can be listened to in the configuration file to execute code outside the browser.
        seedDatabase(filename){
          // Run your Node.js code
          // e.g., edit a file here
          return filename;
        },
      });
    },
  },
});

//  When using npx cypress run, you can set the browser with --browser by choosing between Chrome or Firefox.