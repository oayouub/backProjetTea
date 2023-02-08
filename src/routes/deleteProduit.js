const { Produit } = require('../db/sequelize')
  
module.exports = (app) => {
  app.delete('/api/produit/:id', (req, res) => {
    Produit.findByPk(req.params.id).then(produit => { //recupere le pokemon avant de le supprimer
      const produitDeleted = produit;
      Produit.destroy({
        where: { id: produit.id }
      })
      .then(_ => {
        const message = `Le produit avec l'identifiant n°${produitDeleted.id} a bien été supprimé.`
        res.json({message, data: produitDeleted })
      })
    })
  })
}