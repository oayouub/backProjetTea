const validColors = ["Noir", "Blanc", "Vert", "Jaune", "Mate"]
const validParfums = ["Agrume", "Classique", "Floral", "Fruité"]

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Produit', {
      id: {
        type: DataTypes.INTEGER, //type de donnees
        primaryKey: true, //cle principal (id unique)
        autoIncrement: true //option particuliere ici autoincrementation
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
         unique: {
          msg: 'Le nom est deja pris.'
        },
        validate: {
          notEmpty: { msg: 'Le nom ne peut pas etre vide.'},
          notNull: { msg: 'Le nom est une propriété requise.'}
        }
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
            validate: {
          // isInt: { msg: 'Utilisez uniquement des nombres entiers pour les points de vie.'},
          min: {
            args: [0.1],
            msg: 'Les points de vie doivent etre superieurs ou egale a 0.'
          },
          max: {
            args: [999],
            msg: 'Les points de vie doivent etre inferieurs ou egale a 999.'
          },
          notNull: { msg: 'Les points de vie sont une propriété requise.'}
        }
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Le nom ne peut pas etre vide.'},
          notNull: { msg: 'Le nom est une propriété requise.'}
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: { msg: 'Utilisez uniquement une Url valide pour l\'image.'},
          notNull: { msg: 'l\'image est une propriété requise.'}
        }
      },
      infusionTime: {
        type: DataTypes.INTEGER,
        allowNull: false,
        notNull: { msg: 'Les points de vie sont une propriété requise.'}
      }
      ,
      dosage: {
        type: DataTypes.INTEGER,
        allowNull: false,
        notNull: { msg: 'Les points de vie sont une propriété requise.'}
      }
      ,
      temperature: {
        type: DataTypes.INTEGER,
        allowNull: false,
        notNull: { msg: 'Les points de vie sont une propriété requise.'}
      }
      ,
      color: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue('color').split(',') //this.getDataValue('types') = valeur de types dans notre base de données
        },
        set(color) {
          this.setDataValue('color', color.join()) // transforme le tableau des types en une chaine de chararcteres unique
        },
        validate: {
          isTypesValue(value) {
            if(!value) {
              throw new Error('Un produit doit au moins avoir une couleur.')
            }
            if(value.split(',').length >1) {
              throw new Error('Un produit ne peut pas avoir plus d\'une couleur.')
            }
            value.split(',').forEach(type => {
              if(!validColors.includes(type)) {
                throw new Error(`La couleur d'un produit doit appartenir a la liste suivante : ${validColors}`)
              }
            });
          }
        }
      },
      parfums: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue('parfums').split(',') //this.getDataValue('types') = valeur de types dans notre base de données
        },
        set(parfums) {
          this.setDataValue('parfums', parfums.join()) // transforme le tableau des types en une chaine de chararcteres unique
        },
        validate: {
          isTypesValue(value) {
            if(!value) {
              throw new Error('Un produit doit au moins avoir un parfum.')
            }
            if(value.split(',').length >1) {
              throw new Error('Un produit ne peut pas avoir plus d\'un parfum.')
            }
            value.split(',').forEach(type => {
              if(!validParfums.includes(type)) {
                throw new Error(`Le parfum d'un produit doit appartenir a la liste suivante : ${validParfums}`)
              }
            });
          }
        }
      }
    }, {
      timestamps: true, //permet dindiquer que nous souhaiton modifier le comportement par default proposee pas sequelize
      createdAt: 'created', //creer (statut)
      updatedAt: false //date de verification
    })
  }