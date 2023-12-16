/// <reference types="Cypress" />

describe('Newsletter', () => {
    beforeEach(() => {
        cy.task('seedDatabase');
    });
    it('should display a success message', () => {
        cy.intercept('POST','/newsletter*', {status: 201}).as('subscribe'); // intercept any HTTP request localhost:3000/newsletter?anything
        cy.visit('/');
        cy.get('[data-cy="newsletter-email"]').type('test@example.com');
        cy.get('[data-cy="newsletter-submit"]').click();
        cy.wait('@subscribe'); // Using aliasing with cy.wait makes it possible to specifically observe and wait for the interception of a query, ensuring a sequential execution of the tests.
        cy.contains('Thanks for signing up');
    });
});

// Using cy.intercept, it is possible to intercept and block outgoing HTTP requests, thus avoiding actually sending them to the backend.
// The interceptor configuration includes the definition of the URL to monitor and the type of request to block, such as POST requests to "/newsletter".
//  Adding an argument to the interceptor blocks the request and provides dummy data in response, speeding up testing.