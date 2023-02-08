const express = require('express')
const morgan = require('morgan')
// const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')

const app = express() //instance dune application express(serveur web)
const port = 3000 //port

app
.use(morgan('dev'))
.use(bodyParser.json())

sequelize.initDb()

require('./src/routes/findAllProduit')(app)
require('./src/routes/createProduit')(app)
require('./src/routes/deleteProduit')(app)
require('./src/routes/findProduit')(app)
require('./src/routes/updateProduit')(app)




app.listen(port, () => console.log(`Notre appliction Node est démarée sur : http://localhost:${port}`))