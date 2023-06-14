// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

Product.belongsTo(Category,{
  foreignKey: "category_id",
  onDelete: "CASCADE"



})
Category.hasMany(Product,{
  foreignKey: "category_id", 
})
// Product.belongsToMany(Tag,
//   {through: "Tag", foreignKey: "tag_id", sourceKey: "id", as: "tag"})
Product.belongsToMany(Tag,{
  foreignKey: 'product_id',
  as: "product_tags",
  through: ProductTag
}); 
 
Tag.belongsToMany(Product,{
    foreignKey: 'tag_id',
    as: "product_tags",
    through: ProductTag
  }); 


// Categories have many Products

// Products belongToMany Tags (through ProductTag)

// Tags belongToMany Products (through ProductTag)

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
