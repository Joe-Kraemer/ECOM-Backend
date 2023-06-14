const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {
  // static associate (models) {
  //   // define association here
  //   this.belongsTo(models.Category,{sourceKey: "category_id", foreignKey: "id", as: "category"});
  //   this.belongsToMany(models.Tag,{through: "Tags", sourceKey: "tag_id", foreignKey: "id", as: "tags"})

  //   this.hasMany(models.Tag,{as: "tags"})
  //   models.Tag.hasMany(models.Product,{as: "products"}) // Maybe?
  // }
}

ProductTag.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
      field:"id"
    },
    product_id: {
      type: DataTypes.INTEGER,
      refrences: {
        model: "Product",
        key:"id",
        as:"Products"
    },
    field:"products"
    //may conflict check 4uniques
    },
    tag_id: {
      type: DataTypes.INTEGER,
      refrences: {
        model: "tag",
        key:"id",
        as:"Tags"
    },
    field:"tags"   }
//may conflict check 4uniques
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
