const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.findAll().then((products) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch((err) => console.log(err))
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  // This sintax allows you to query using the equivalent of a WHERE on SQL

  // Product.findAll({
  //   where: { id: prodId }
  // })
  // .then(([product]) => {
  //   console.log(product);
  //   res.render('shop/product-detail', {
  //     product,
  //     pageTitle: product.title,
  //     path: '/products'
  //   });
  // })
  // .catch(err => console.log(err))
  
  Product.findByPk(prodId).then((product) => {
    res.render('shop/product-detail', {
      product,
      pageTitle: product.title,
      path: '/products'
    });
  })
  .catch((err) => console.log(err))
};

exports.getIndex = (req, res, next) => {
  Product.findAll().then((products) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  })
  .catch((err) => console.log(err))
};

exports.getCart = (req, res, next) => {
  req.user.getCart().then((cart) => {
    return cart.getProducts()
  })
  .then((products) => {
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      products
    });
  })
  .catch((err) => console.log(err))
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user.getCart()
    .then(cart => {
      fetchedCart = cart
      return cart.getProducts({where: {id: prodId}})
    })
    .then(([product]) => {
      if (product) {
        // ... Increase the qty if the product is in the cart
        const oldQuantity = product.cartItem.quantity;
        newQuantity += oldQuantity
        return product
      }

      return Product.findByPk(prodId)
    })
    .then(product => {
      return fetchedCart.addProduct(product, { through: { quantity: newQuantity } })
    })
    .then(() => {
      res.redirect('/cart')
    })
    .catch(e => console.log(e))
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user.getCart()
    .then(cart => {
      return cart.getProducts({where: {id: prodId}})
    })
    .then(([product]) => {
      return product.cartItem.destroy()
    })
    .then(() => {
      res.redirect('/cart')
    })
    .catch(e => console.log(e))
};

exports.getOrders = (req, res, next) => {
  req.user.getOrders({include: ['products']})
    .then(orders => {
      console.log(orders)
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders
      });
    })
    .catch(e => console.log(e))
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts()
    })
    .then(products => {
      return req.user.createOrder()
        .then(order => {
          return order.addProducts(products.map(product => {
            product.orderItem = { quantity: product.cartItem.quantity }
            return product;
          }))
        })
        .catch(err => console.log(err));
    })
    .then(() => {
      return fetchedCart.setProducts(null)
    })
    .then(() => {
      res.redirect('/orders')
    })
    .catch(e => console.log(e))
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
