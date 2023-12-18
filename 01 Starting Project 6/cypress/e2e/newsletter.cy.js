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
// Using cy.intercept, it is possible to intercept and block outgoing HTTP requests, thus avoiding actually sending them to the backend.
// The interceptor configuration includes the definition of the URL to monitor and the type of request to block, such as POST requests to "/newsletter".
//  Adding an argument to the interceptor blocks the request and provides dummy data in response, speeding up testing.

    it('should display validation errors', () => {
        cy.intercept('POST','/newsletter*', {message: 'Email exists already.'}).as('subscribe'); // Use the concept of interceptor to avoid the actual HTTP request and test the behavior of the application.
        cy.visit('/');
        cy.get('[data-cy="newsletter-email"]').type('test@example.com');
        cy.get('[data-cy="newsletter-submit"]').click();
        cy.wait('@subscribe');
        cy.contains('Email exists already.');
    });

    it('should successfully create a new contact', () => {
        cy.request({
            method: 'POST',
            url: '/newsletter',
            body: { email: 'test@example.com'},
            form: true
        }).then(res => {
            expect(res.status).to.eq(201);
        });
    });
});




