// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {
  // static associate (models) {
  //   // define association here
  //   this.belongsTo(models.Category,{foreignKey: "id", sourceKey: "category_id", as: "category"});
  // }
}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      field:"id"

    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "product_name"
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        is: /^\d*\.?\d*$/
      },
      field:"price"
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        is: /([1-9][0-9]*)|0/
      },
      field:"stock",
      defaultValue: 10
    },
      category_id: {
        type: DataTypes.INTEGER,
        refrences: {
          model:"Category",
          key:"id",
          as:"Categories"
      },
      field:"category_id"
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  },
);

module.exports = Product;
