const { Produit } = require('../db/sequelize')
  
module.exports = (app) => {
  app.delete('/api/produit/:id', (req, res) => {
    Produit.findByPk(req.params.id).then(produit => { //recupere le pokemon avant de le supprimer
      if(produit === null) {
        const message = 'Le produit demandé n\' existe pas. Réssayez avec un autre identifiant';
        return res.status(404).json({message})
      }
      const produitDeleted = produit;

      return Produit.destroy({
        where: { id: produit.id }
      })
      .then(_ => {
        const message = `Le produit avec l'identifiant n°${produitDeleted.id} a bien été supprimé.`
        res.json({message, data: produitDeleted })
      })
    })
    .catch(error => {
      const message = 'Le produit n\'a pas pu etre supprimé. Réesayez dans quelques instants.'
      res.status(500).json({ message, data: error })
    })
  })
}