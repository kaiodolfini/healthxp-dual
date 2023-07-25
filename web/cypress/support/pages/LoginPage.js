import popup from './components/Popup'

class LoginPage {

    constructor() {
        this.popup = popup
    }

    go() {
        cy.visit('http://localhost:3000')
    }

    fill(user) {
        if (user.email) {
            cy.get('#email')
                .clear()
                .type(user.email)
        }
        if (user.password) {
            cy.get('#password')
                .clear()
                .type(user.password)
        }
    }

    submit() {
        cy.contains('button', 'Entrar').click()
    }

    doLogin(user) {
        this.go()
        this.fill(user)
        this.submit()
    }

   
}

export default new LoginPage()