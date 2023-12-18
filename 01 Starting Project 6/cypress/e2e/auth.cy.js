/// <reference types="Cypress" />

describe('Auth', () => {
    beforeEach(() => { // It's important to use beforeEach to reset the database before each test.
        cy.task('seedDatabase');
    })

    it('should signup', () => {
        cy.visit('/signup');
        cy.get('[data-cy="auth-email"]').click();
        cy.get('[data-cy="auth-email"]').type('test2@example.com');
        cy.get('[data-cy="auth-password"]').type('testpassword');
        cy.get('[data-cy="auth-submit"]').click();
        cy.location('pathname').should('eq', '/takeaways');
        cy.getCookie('__session').its('value').should('not.be.empty');
        // Session cookie validation (__session) with a non-empty value.
        // Using the "its" method to inspect the properties of an object (ex cookie value).
    });

    it('should login', () => {
        cy.visit('/login');
        cy.get('[data-cy="auth-email"]').click();
        cy.get('[data-cy="auth-email"]').type('test@example.com');
        cy.get('[data-cy="auth-password"]').type('testpassword');
        cy.get('[data-cy="auth-submit"]').click();
        cy.location('pathname').should('eq', '/takeaways');
        cy.getCookie('__session').its('value').should('not.be.empty');
        // Cleaning cookies between tests due to the isolation of tests by Cypress.
        // Verify the success of the connection by ensuring the redirection to/takeaways and the existence of a non-empty session cookie.
    });
});