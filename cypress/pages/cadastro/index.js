import { faker } from '@faker-js/faker'

const randomEmail = faker.internet.email();

class Cadastro {

    iniciarCadastro(email) {
        const signUpName = 'Tester QA'
        Cypress.env('signUpName', signUpName)
        if (!email) { // Se email não existe entra na condicional

            cy.get('[data-qa="signup-name"]').type('Tester QA')
            cy.get('[data-qa="signup-email"]').type(randomEmail)
            cy.contains('button', 'Signup').click()
            cy.get('input[type=radio]').check('Mr')
            cy.get('input[type=radio]').eq(0).check() // 0, 1, 2
            cy.get('[type=password]').type('12345', { log: false })
            cy.get('[data-qa="first_name"]').type(faker.name.firstName())
            cy.get('[data-qa="last_name"]').type(faker.name.lastName())
            cy.get('[data-qa="country"]').eq(0)
            cy.get('[data-qa="create-account"]').type(faker.address.streetAddress())
            cy.get('[data-qa="state"]').type(faker.address.state())
            cy.get('[data-qa="city"]').type(faker.address.city())
            cy.get('[data-qa="zipcode"]').type(faker.address.zipCode())
            cy.get('[data-qa="mobile_number"]').type(faker.phone.imei())
            cy.get('[data-qa="create-account"]').click()
            return this
        } else {
            cy.get('[data-qa="signup-name"]').type('Tester QA')
            cy.get('[data-qa="signup-email"]').type(email)
            cy.get('[data-qa="signup-button"]').click()
            return this
        }
    }

    verificarSeCadastroFoiConcluido() {
        cy.get('[data-qa="continue-button"]').should('contain', 'Continue')
        return this
    }
}

export default new Cadastro()