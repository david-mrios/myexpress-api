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
        database: 'inventory' 
    })
    app.listen(3000)
}

go()

// get all
app.get('/', async (req, res) => {

    try {
        const [users] = await db.execute('SELECT * FROM usuario')
        console.log(users)                
        res.send(`<ul>${users.map(users => `<li>${users.nombre}</li>`).join('')}</ul>`)
    } catch (error) {
        console.log(error)
        res.status(505).send('505 server connection');
    }
    
})

 // search
app.get('/search/:id', async (req, res) => {
    const id = req.params.id;
    const [post] = await db.execute(`select * from usuario where id = ${id}`)

    try {
        if (post.length > 0) {
            console.log(post)              
          console.log(`Id: ${id}`)                
            res.send(`<h2>${post.map(post =>post.nombre).join('')}</h2>`)
          } else {
            res.status(404).send('Post not found');
          }
    } catch (error) {
        console.log(error)
        res.status(505).send('505 server connection');
    }

})



app.post('/create', async (req, res) => {
})

app.post('/update', async (req, res) => {
})

app.delete('/delete', async (req, res) => {
})