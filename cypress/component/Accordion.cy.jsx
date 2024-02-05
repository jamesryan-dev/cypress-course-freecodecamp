const { default: ItemsAccordion } = require("@/app/components/Accordion")
const { items } = require("@/app/fundamentals/page")

describe('Accordion.cy.jsx', () => {
  it('should render Items Accordion correctly', () => {
    cy.mount(<ItemsAccordion items={items} />)
    cy.getDataTest('accordion-wrapper').within(() => {
      cy.get('[data-test^="accordion-item-"]').should('have.length', 8)

    })

    cy.contains('Your tests will exist in a describe block.').should('not.be.visible')

    cy.getDataTest('accordion-item-1').click()

    cy.contains('Your tests will exist in a describe block.').should('be.visible')

    cy.getDataTest('accordion-item-1').within(() => {
      cy.get('[role="button"]').click(); 
    })

    cy.contains('Your tests will exist in a describe block.').should('not.be.visible')

  })
})