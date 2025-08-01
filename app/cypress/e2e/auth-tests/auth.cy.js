/// <reference types="cypress" />

describe('Register new host', () => {
    it('Should register a new host', () => {
        cy.visit('http://localhost:5173/register/host')

        cy.contains('Registro de Host').should('be.visible')

        cy.get('[data-cy="firstNameInput"]').type('John')
        cy.get('[data-cy="lastNameInput"]').type('Doe')
        cy.get('[data-cy="emailInput"]').type('john.doe@example.com')
        cy.get('[data-cy="passwordInput"]').type('SecurePassword123')
        cy.get('[data-cy="birthdayInput"]').type('1990-01-01')
        cy.get('[data-cy="phoneInput"]').type('1234567890')
        cy.get('[data-cy="addressInput"]').type('123 Main St')
        cy.get('[data-cy="rfcInput"]').type('ABC123456789')


        cy.intercept('POST', '/api/auth/register/host', {
            statusCode: 201,
            body: {
                "_id": "688c304a5a299fd25de82164",
                "firstName": "John",
                "lastName": "Doe",
                "email": "john.doe@example.com",
                "birthday": "1990-01-01T00:00:00.000Z",
                "phone": "1234567890",
                "address": "123 Main St",
                "rfc": "ABC123456789",
                "role": "Host"
            }
        }).as('registerHost')

        cy.get('[data-cy="submitButton"]').click()

        cy.wait('@registerHost').its('response.statusCode').should('eq', 201)

        cy.contains('¡Host registrado exitosamente!').should('be.visible')

    })
})