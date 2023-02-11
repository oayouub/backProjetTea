const express = require('express')
// const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')

const app = express() //instance dune application express(serveur web)
const port = process.env.PORT || 3000 //port

app
.use(bodyParser.json())

sequelize.initDb()

app.get('/', (req, res) => {
    res.json('Hello API')
})

require('./src/routes/findAllProduit')(app)
require('./src/routes/createProduit')(app)
require('./src/routes/deleteProduit')(app)
require('./src/routes/findProduit')(app)
require('./src/routes/updateProduit')(app)


// on ajoute la gestion des erreurs 404
app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.'
    res.status(404).json({message})
})

app.listen(port, () => console.log(`Notre appliction Node est démarée sur : http://localhost:${port}`))