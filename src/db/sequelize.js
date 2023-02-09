const { Sequelize, DataTypes } = require('sequelize')
const produit = require('../models/produit')
const ProduitModel = require('../models/produit')
const produits = require('./bd.produit')
  
const sequelize = new Sequelize('produits', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: false
})
  
const Produit = ProduitModel(sequelize, DataTypes)
  
const initDb = () => {
  return sequelize.sync({force: true}).then(_ => {
    produits.map(produit => {
      Produit.create({
        name: produit.name,
        price: produit.price,
        description: produit.description,
        picture: produit.picture,
        infusionTime: produit.infusionTime,
        dosage: produit.dosage,
        temperature: produit.temperature,
        color: produit.color,
        parfums: produit.parfums
      }).then(produit => console.log(produit.toJSON()))
    })
    console.log('La base de donnée a bien été initialisée !')
  })
}
  
module.exports = { 
  initDb, Produit
}