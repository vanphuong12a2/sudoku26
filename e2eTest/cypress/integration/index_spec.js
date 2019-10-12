describe('Index page', function() {
    it('finds the title', function() {
        cy.visit('http://localhost:8080/')

        cy.contains('Sudoku 26')
    })

    it('can start the new board', function() {
        cy.visit('http://localhost:8080/')

        cy.contains('New game').click()
    })
})