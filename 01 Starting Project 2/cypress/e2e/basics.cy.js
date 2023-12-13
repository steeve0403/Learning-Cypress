/// <reference types="Cypress" /> /* allows us to leverage VS Code Intellisense for the autocompletion */

describe('task page', () => {
  it('should render the main image', () => {
    cy.visit('http://localhost:5173/');
    cy.get('.main-header img');
  });
});