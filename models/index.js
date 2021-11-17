// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

Product.belongsTo(Category,{
  foreignKey: 'category_id'
})
Category.hasMany(Product,{
  foreignKey: 'category_id'
})
Product.hasMany(Tag, {
through: 'product_tag'
})
Tag.hasMany(Product, {
through: 'product_tag'
})
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
