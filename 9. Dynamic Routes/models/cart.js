const fs = require('fs')
const path = require('path')

const p = path.join(
  path.dirname(require.main.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // fetch previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = {products: [], totalPrice: 0};
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      // analyze if the last cart has the product
      const existingProductIndex = cart.products.findIndex(product => product.id === id);
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      // add new product
      if (existingProduct) {
        updatedProduct = {...existingProduct}
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = {id, qty: 1};
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice += Number(productPrice);

      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err)
      })
    })
  }
}