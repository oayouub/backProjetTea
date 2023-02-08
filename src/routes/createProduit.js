const { Produit } = require('../db/sequelize')

  
module.exports = (app) => {
  app.post('/api/produits', (req, res) => {
    Produit.create(req.body)
      .then(produit => {
        const message = `Le produit ${req.body.name} a bien été crée.`
        res.json({ message, data: produit })
      })
  })
}