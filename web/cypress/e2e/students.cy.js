import students from '../fixtures/students.json'

import studentPage from '../support/pages/StudentPage'

describe('alunos', () => {

    it('deve poder cadastrar um novo aluno', () => {

        const student = students.create

        cy.task('deleteStudent', student.email)

        cy.adminLogin()

        studentPage.goToRegister()
        studentPage.submitForm(student)
        studentPage.popup.haveText('Dados cadastrados com sucesso.')

    })

    it('não deve cadastrar com email duplicado', () => {

        const student = students.duplicate

        cy.task('resetStudent', student)

        cy.adminLogin()

        studentPage.goToRegister()
        studentPage.submitForm(student)
        studentPage.popup.haveText('O email informado já foi cadastrado!')

    })

    it('deve remover um aluno sem matricula', () => {

        const student = students.remove

        cy.task('resetStudent', student)

        cy.adminLogin()

        studentPage.search(student.name)
        studentPage.remove(student.email)
        studentPage.popup.confirm()
        studentPage.popup.haveText('Exclusão realizada com sucesso.')

    })

    it('todos os campos são obrigatórios', () => {

        const student = students.required

        cy.adminLogin()

        studentPage.goToRegister()
        studentPage.submitForm(student)

        studentPage.alertMessage('Nome completo', 'Nome é obrigatório')
        studentPage.alertMessage('E-mail', 'O email é obrigatório')
        studentPage.alertMessage('Idade', 'A idade é obrigatória')
        studentPage.alertMessage('Peso (em kg)', 'O peso é obrigatório')
        studentPage.alertMessage('Altura', 'A altura é obrigatória')

    })

    it('deve validar a idade do aluno menor que 16', () => {

        const student = students.younger

        cy.adminLogin()

        studentPage.goToRegister()
        studentPage.submitForm(student)
        studentPage.alertMessage('Idade', 'A idade mínima para treinar é 16 anos!')

    })

    it.skip('deve validar alunos com peso inválido', () => {

        const alunos = students.invalid_weight

        cy.adminLogin()

        studentPage.goToRegister()
        alunos.forEach(student => {
            studentPage.submitForm(student)
            studentPage.alertMessage('Peso (em kg)', 'O peso informado é inválido')
        });
        
    })

    it.skip('deve validar alunos com altura inválida', () => {

        const alunos = students.invalid_feet_tall

        cy.adminLogin()

        studentPage.goToRegister()
        alunos.forEach(student => {
            studentPage.submitForm(student)
            studentPage.alertMessage('Altura', 'A altura informada é inválida')
        });

    })

})