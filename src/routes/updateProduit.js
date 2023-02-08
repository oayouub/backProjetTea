const { Produit } = require('../db/sequelize')
  
module.exports = (app) => {
  app.put('/api/produits/:id', (req, res) => {
    const id = req.params.id
    Produit.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      Produit.findByPk(id).then(produit => {
        const message = `Le produit ${produit.name} a bien été modifié.`
        res.json({message, data: produit })
      })
    })
  })
}