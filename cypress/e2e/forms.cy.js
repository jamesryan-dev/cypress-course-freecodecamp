describe('form tests', () => {
    beforeEach(() => {
        cy.visit("/forms")
        cy.getDataTest('subscribe-form').find('input').as('subscribe-input')
    })

    it('should test subscribe form successful submission', () => {
        cy.contains(/Testing forms/i)
        cy.get('@subscribe-input').type('hello@test.com')
        cy.contains(/Successfully subbed: hello@test.com!/i).should('not.exist')
        cy.getDataTest('subscribe-button').click()
        cy.contains(/Successfully subbed: hello@test.com!/i).should('exist')
        cy.wait(3000)
        cy.contains(/Successfully subbed: hello@test.com!/i).should('not.exist')


    })

    it('should show the invalid email message', () => {
        cy.get('@subscribe-input').type('hello@test.co')
        cy.getDataTest('subscribe-button').click()
        cy.contains(/Invalid email: hello@test.co!/i).should('exist')
    })

    it('should show the fail message when input is empty', () => {
        cy.contains(/fail!/i).should('not.exist')
        cy.getDataTest('subscribe-button').click()
        cy.contains(/Invalid email:/i).should('not.exist')
        cy.contains(/fail!/i).should('exist')
    })
})