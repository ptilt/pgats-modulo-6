/// <reference types="cypress" />

import cadastro from '../pages/cadastro'
import login from '../pages/login'
import menu from '../pages/menu';
import { faker } from '@faker-js/faker'

const randomEmail = faker.internet.email();
const existedEmail = 'tester-1721346302730@mail.com'

describe('Automation Exercise - Trabalho Final', () => {
    beforeEach(() => {
        cy.visit('/')
    });

    it('Test Case 1: Cadastrar um usuário', () => {
        menu.irParaLoginCadastro()
        cadastro.iniciarCadastro()
        cadastro.verificarSeCadastroFoiConcluido()
    });

    it('Test Case 2: Login User with correct email and password', () => {
        menu.irParaLoginCadastro()
        login.preencherlogin(existedEmail, '123456')

        cy.get('i.fa-user').parent().should('contain', 'Tester QA')
    });

    it('Test Case 3: Login User with incorrect email or password', () => {
        menu.irParaLoginCadastro()
        login.preencherlogin(existedEmail, '54321')

        cy.get('p').should('contain', 'Your email or password is incorrect!')

    });

    it('Test Case 4: Signup User', () => {
        menu.irParaLoginCadastro()

        login.preencherlogin(existedEmail, '123456')
        cy.get('i.fa-user').parent().should('contain', 'Tester QA')
        cy.contains('Logout').click()


    });

    it('Test Case 5: Register User with existing email', () => {
        cy.contains('Signup').click()

        menu.irParaLoginCadastro()
        cadastro.iniciarCadastro(existedEmail)

        cy.get(`.signup-form form p`)
            .should('be.visible')
            .and('contain', 'Email Address already exist!')
    });

    it('Test Case 6: Contact Us Form', () => {
        cy.visit('/contact_us')
        cy.contains(`Contact us`).click()

        cy.get(`.contact-form h2`)
            .should('be.visible')
            .and('have.text', 'Get In Touch')

        cy.get('[data-qa="name"]').type(`Tester`)
        cy.get('[data-qa="email"]').type(existedEmail)
        cy.get('[data-qa="subject"]').type(`Test Automation`)
        cy.get('[data-qa="message"]').type(`Learning Test Automation`)

        cy.fixture('example.json').as('arquivo')
        cy.get('input[name="upload_file"]').selectFile('@arquivo')

        cy.get('[data-qa="submit-button"]').click()

        cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')
    });

    it('Test Case 8: Verify All Products and product detail page', () => {
        menu.irParaProdutos()

        cy.url().should('contain', 'products')
        cy.get('.title').should('be.visible').and('contain', 'All Products')

        cy.get('.single-products')
            .should('be.visible')
            .and('have.length.at.least', 1)
            .first()
            .parent()
            .contains('View Product')
            .click()

        cy.get('.product-information > h2').should('be.visible')
        cy.get('.product-information p').should('be.visible').and('have.length', 4)
        cy.get('.product-information span span').should('be.visible')
    });

    it('Test Case 9: Search Product', () => {
        menu.irParaProdutos()

        cy.url().should('contain', 'products')
        cy.get('.title').should('be.visible').and('contain', 'All Products')

        cy.get('input#search_product').type('Shirt')
        cy.get('button#submit_search').click()

        cy.get('.title').should('be.visible').and('contain', 'Searched Products')

        cy.get('.single-products')
            .should('be.visible')
            .and('have.length.at.least', 1)
    });

    it('Test Case 10: Verify Subscription in home page', () => {
        cy.get('input#susbscribe_email')
            .scrollIntoView()
            .type(randomEmail)

        cy.get('button#subscribe').click()

        cy.contains('You have been successfully subscribed!').should('be.visible')

    });

});
