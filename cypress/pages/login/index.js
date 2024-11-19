class login {
    preencherlogin(email, senha) {
        cy.get('[data-qa="login-email"]').type(email)
        cy.get('[data-qa="login-password"]').type(senha)
        cy.get('[data-qa="login-button"]').click()

    }
}

export default new login()