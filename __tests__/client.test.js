const pgclient = require('../src/config/database');

describe("Database Conection Test", () => {
    
    beforeAll(async () => {

        pgclient.connect();
        
        const table = 'CREATE TABLE student(id SERIAL PRIMARY KEY, firstName VARCHAR(40) NOT NULL, email VARCHAR(40))'
        const text = 'INSERT INTO student(firstname, email) VALUES($1, $2) RETURNING *'
        const values = ['Teste', 'teste@github.com']
        
        pgclient.query(table, (err, res) => {
            if (err) throw err
        });
        
        pgclient.query(text, values, (err, res) => {
            if (err) throw err
        });
    })

    it("should get user from PostgreSql", async () => {

        const result = await pgclient.query('SELECT * FROM student WHERE id = 1')

        expect(result.rows).toEqual([{id: 1, firstname: 'Teste', email: 'teste@github.com'}]);
    })

    afterAll(async () => {
        await pgclient.end()
    })
});