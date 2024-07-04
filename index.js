const express = require('express')
const mysql = require('mysql2/promise')

const app = express()

let db

async function go() {
    db = await mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'default' 
    })
    app.listen(3000)
}

go()

app.get('/', async (req, res) => {
    const [users] = await db.execute('SELECT * FROM usuario')
    console.log(users)
    res.send(`<ul>${users.map(user => `<li>${user.nombre}</li>`).join('')}</ul>`)
})