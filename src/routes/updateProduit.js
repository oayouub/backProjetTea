const { ValidationError, UniqueConstraintError } = require('sequelize')
const { Produit } = require('../db/sequelize')
  
module.exports = (app) => {
  app.put('/api/produits/:id', (req, res) => {
    const id = req.params.id
    Produit.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Produit.findByPk(id).then(produit => {
        if(produit === null) {
          const message = 'Le produit demandé n\' existe pas. Réssayez avec un autre identifiant';
          return res.status(404).json({message})
        }
        const message = `Le produit ${produit.name} a bien été modifié.`
        res.json({message, data: produit })
      })
    })
    .catch(error => {
      if(error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error})
      }
      if(error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: error.message, data: error })
      }
      const message = 'Le produit n\'a pas pu etre modifié. Réesayez dans quelques instants.'
      res.status(500).json({ message, data: error })
    })
  })
}