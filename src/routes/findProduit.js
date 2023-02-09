const { Produit } = require('../db/sequelize')
  
module.exports = (app) => {
  app.get('/api/produits/:id', (req, res) => {
    Produit.findByPk(req.params.id)
      .then(produit => {
        if(produit === null) {
          const message = 'Le produit demandé n\' existe pas. Réssayez avec un autre identifiant';
          return res.status(404).json({message})
        }
        const message = 'Un produit a bien été trouvé.'
        res.json({ message, data: produit })
      })
      .catch(error => {
        const message = 'Le produit n\'a pas pu etre récupéré. Réesayez dans quelques instants.'
        res.status(500).json({ message, data: error })
      })
  })
}
