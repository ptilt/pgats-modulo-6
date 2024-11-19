import cadastro from "../cadastro"

class Menu {

    irParaProdutos() {
        cy.contains('Products').click()
    }

    irParaLoginCadastro() {
        cy.contains('Signup').click()
        return cadastro
    }

    irParaMenu(menu) {
        cy.contains(menu).click()
    }
}

export default new Menu()