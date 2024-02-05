describe('Various examples', () => {

    beforeEach(() => {
        cy.visit('/examples')
    })

    it('should work when testing across multiple pages', () => {
        const pages = [
            { link: 'nav-why-cypress', path: '/' },
            { link: 'nav-overview', path: '/overview' },
            { link: 'nav-fundamentals', path: '/fundamentals' }
        ];

        pages.forEach(page => {
            cy.getDataTest(page.link).click();
            cy.location("pathname").should('equal', page.path);
        });
    });

    it('should intercept and record the request', () => {
        cy.intercept('POST', 'http://localhost:3000/examples', {
            fixture: 'example.json'
        });
        cy.getDataTest('post-button').click();
    });
    
    it('should test the Grudge list component', () => {

        // create custom commands for this component 

         cy.contains(/add some grudges/i).should('exist')

         cy.getDataTest('grudge-list').within(() => {
            cy.get('li').should('have.length', 0)
         });

         cy.getDataTest('clear-button').should('not.exist')

         cy.getDataTest('grudge-input').within(() => {
            cy.get('input').type('some grudge')
         });

         cy.getDataTest('grudge-button').click();

         cy.getDataTest('grudge-list').within(() => {
            cy.get('li').should('have.length', 1)
         });

         cy.getDataTest('grudge-input').within(() => {
            cy.get('input').type('a new grudge 222')
         });

         cy.getDataTest('grudge-button').click();

         cy.getDataTest('grudge-list').within(() => {
            cy.get('li').should('have.length', 2)
            cy.get('li').its(0).should('contains.text', 'some grudge')
         });

         cy.getDataTest('grudge-list').within(() => {
            cy.get('li').its(0).within(() => {
                cy.get('button').click()
            })
            cy.get('li').should('have.length', 1)
         });

         cy.getDataTest('clear-button').click()

         cy.getDataTest('grudge-list').within(() => {
            cy.get('li').should('have.length', 0)
         });
         
    })

})