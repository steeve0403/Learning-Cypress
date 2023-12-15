// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// A custom order should be reserved for repetitive cases with complex logic for better clarity.
// Avoid putting everything in a custom order to maintain the readability of the tests.
Cypress.Commands.add('submitForm', () => {
    cy.get('form button[type="submit"]').click();
});

Cypress.Commands.addQuery('getById', (id) => {
    const getFn = cy.now('get', `[data-cy="${id}"]`); // Execute when you call getById() in your tests
    return () => {
        return getFn(); // Executed when Cypress actually runs your test instructions (i.e, after queuing them)
    }
});

