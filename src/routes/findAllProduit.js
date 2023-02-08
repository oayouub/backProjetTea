const { Produit } = require('../db/sequelize') 
  
module.exports = (app) => { 
  app.get('/api/produits', (req, res) => {
    Produit.findAll()
      .then(produits => {
        const message = 'La liste des produits a bien été récupérée.'
        res.json({ message, data: produits })
      })
  })
}