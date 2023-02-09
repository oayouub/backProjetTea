const { Produit } = require('../db/sequelize') 
  
module.exports = (app) => { 
  app.get('/api/produits', (req, res) => {
    Produit.findAll()
      .then(produits => {
        const message = 'La liste des produits a bien été récupérée.'
        res.json({ message, data: produits })
      })
      .catch(error => {
        const message = `La liste des produits n'a pas pu etre récupérée. Réessaye dans quelques instants.`  
        res.status(500).json({ message, data: error })
      })
  })
}