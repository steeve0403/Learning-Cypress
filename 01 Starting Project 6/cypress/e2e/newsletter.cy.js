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
        // Ability to test the backend independently of the frontend using Cypress to send requests directly to the backend APIs.
        // Cypress offers the CY request method to send queries from tests without using the frontend interface.
        // Configure queries with an object including body, headers, method, and URL to specifically test the backend.
        // Evaluating the server response with the then method to ensure that everything is working as expected, for example, checking status code 201.
        //  The use of this Cypress feature allows direct testing of API endpoints without interaction with the user interface.
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




