describe('Index page', function() {
    it('finds the title', function() {
        cy.visit(Cypress.config().baseUrl)

        cy.contains('Sudoku 26')
    })

    it('can start the new board', function() {
        cy.visit(Cypress.config().baseUrl)

        cy.contains('New game').click()
    })
})