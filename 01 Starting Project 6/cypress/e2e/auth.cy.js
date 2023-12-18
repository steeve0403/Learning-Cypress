/// <reference types="Cypress" />

describe('Auth', () => {
    beforeEach(() => { // It is important to use beforeEach to reset the database before each test.
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
});