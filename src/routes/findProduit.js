const { Produit } = require('../db/sequelize')
  
module.exports = (app) => {
  app.get('/api/produits/:id', (req, res) => {
    Produit.findByPk(req.params.id)
      .then(produit => {
        const message = 'Un produit a bien été trouvé.'
        res.json({ message, data: produit })
      })
  })
}
