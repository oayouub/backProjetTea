module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Produit', {
      id: {
        type: DataTypes.INTEGER, //type de donnees
        primaryKey: true, //cle principal (id unique)
        autoIncrement: true //option particuliere ici autoincrementation
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false //facultativ ou non ici false veut dire importantes
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false
      },
      infusionTime: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
      ,
      dosage: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
      ,
      temperature: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
      ,
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue('types').split(',') //this.getDataValue('types') = valeur de types dans notre base de données
        },
        set(types) {
          this.setDataValue('types', types.join()) // transforme le tableau des types en une chaine de chararcteres unique
        }
      }
    }, {
      timestamps: true, //permet dindiquer que nous souhaiton modifier le comportement par default proposee pas sequelize
      createdAt: 'created', //creer (statut)
      updatedAt: false //date de verification
    })
  }