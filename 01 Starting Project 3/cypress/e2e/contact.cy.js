/// <reference types="Cypress" />

describe('contact form', () => {
    it('should submit the form', () => {
        cy.visit('http://localhost:5173/about');
        cy.get('[data-cy="contact-input-message"]').type('Hello World');
        cy.get('[data-cy="contact-input-name"]').type('John Doe');
        cy.get('[data-cy="contact-btn-submit"]').then((el) => {
            expect(el.attr('disabled')).to.be.undefined;
            expect(el.text()).to.eq('Send Message')
        });
        cy.get('[data-cy="contact-input-email"]').type('test@example.com{enter}');
        // cy.get('[data-cy="contact-btn-submit"]')
        //     .contains('Send Message')
        //     .should('not.have.attr', 'disabled');
        cy.get('[data-cy="contact-btn-submit"]').as('submitBtn');
        // cy.get('@submitBtn').click();
        cy.get('@submitBtn').contains('Sending...');
        cy.get('@submitBtn').should('have.attr', 'disabled');
    });

    it('should validate the form input', () => {
        cy.visit('http://localhost:5173/about');
        cy.get('[data-cy="contact-btn-submit"]').click();
        cy.get('[data-cy="contact-btn-submit"]').then(el => {
            expect(el.attr('disabled')).to.be.undefined;
            expect(el.text()).to.not.equal('Sending...');
        });
        cy.get('[data-cy="contact-btn-submit"]').contains('Send Message');
    });
});