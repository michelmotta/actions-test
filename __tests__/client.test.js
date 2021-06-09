const { Client } = require('pg');

const pgclient = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: 'postgres',
    password: 'postgres',
    database: 'postgres'
});

describe("Database Conection Test", () => {
    
    beforeAll(async () => {

        pgclient.connect();
        
        const table = 'CREATE TABLE student(id SERIAL PRIMARY KEY, firstName VARCHAR(40) NOT NULL, lastName VARCHAR(40) NOT NULL, age INT, address VARCHAR(80), email VARCHAR(40))'
        const text = 'INSERT INTO student(firstname, lastname, age, address, email) VALUES($1, $2, $3, $4, $5) RETURNING *'
        const values = ['Mona the', 'Octocat', 9, '88 Colin P Kelly Jr St, San Francisco, CA 94107, United States', 'octocat@github.com']
        
        pgclient.query(table, (err, res) => {
            if (err) throw err
        });
        
        pgclient.query(text, values, (err, res) => {
            if (err) throw err
        });
    })

    it("should get user from PostgreSql", async () => {

        const result = await pgclient.query('SELECT * FROM student WHERE id = 1')

        expect(result.rows).toEqual([{id: 1, firstname: 'Mona the', lastname: 'Octocat', age: 9, address: '88 Colin P Kelly Jr St, San Francisco, CA 94107, United States', email: 'octocat@github.com'}]);
    })

    afterAll(async () => {
        await pgclient.end()
    })
});