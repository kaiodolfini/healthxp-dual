const { defineConfig } = require("cypress");

const { Pool } = require('pg')

//Informações para conectar no Banco de Dados
const dbConfig = {
  host: 'silly.db.elephantsql.com',
  user: 'wypyilte',
  password: 'lp73mJMvp52CgrFZlm5haBeISDgBC5zv',
  database: 'wypyilte',
  port: 5432
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

      on('task', {
        selectStudentId(studentEmail) {
          return new Promise(function (resolve, reject) {

            const pool = new Pool(dbConfig)
            const query = 'SELECT id FROM students WHERE email = $1;'

            pool.query(query, [studentEmail], function (error, result) {
              if (error) {
                reject({ error: error })
              }
              resolve({ success: result })
              pool.end()
            })

          })
        },

        deleteStudent(studentEmail) {
          return new Promise(function (resolve, reject) {

            const pool = new Pool(dbConfig)
            const query = 'DELETE FROM students WHERE email = $1;'

            pool.query(query, [studentEmail], function (error, result) {
              if (error) {
                reject({ error: error })
              }
              resolve({ success: result })
              pool.end()
            })

          })
        },
        resetStudent(student) {
          return new Promise(function (resolve, reject) {

            const pool = new Pool(dbConfig)
            const query = `
            WITH add AS (
              INSERT INTO students (name, email, age, weight, feet_tall) 
              VALUES ($1, $2, $3, $4, $5)
            )
            DELETE FROM students WHERE email = $2;`

            const values = [student.name, student.email, student.age, student.weight, student.feet_tall
            ]
            pool.query(query, values, function (error, result) {
              if (error) {
                reject({ error: error })
              }
              resolve({ success: result })
              pool.end()
            })

          })
        }
      })

    },
  },
});
