const ObjectId = require("mongodb").ObjectId;

const getDb = require("../util/database").getDb;

const COLLECTION_NAME = "users";

class User {
  constructor(username, email, cart, id) {
    this.username = username;
    this.email = email;
    this.cart = cart;
    this._id = id ? ObjectId(id) : null;
  }

  save() {
    let dbOp;
    if (this._id) {
      dbOp = getDb()
        .collection(COLLECTION_NAME)
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = getDb().collection(COLLECTION_NAME).inserOne(this);
    }
    return dbOp
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err) => console.log(err));
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex(
      (cp) => product._id.toString() === cp.productId.toString()
    );
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      newQuantity += this.cart.items[cartProductIndex].quantity;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: newQuantity,
      });
    }

    const updatedCart = {
      items: updatedCartItems,
    };
    return getDb()
      .collection(COLLECTION_NAME)
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
    // .then(result => {

    // })
    // .catch(e => console.log(e))
  }

  getCart() {
    return getDb()
      .collection("products")
      .find({ _id: { $in: this.cart.items.map((cp) => cp.productId) } })
      .toArray()
      .then((products) => {
        return products.map((product) => {
          return {
            ...product,
            quantity: this.cart.items.find(
              (item) => item.productId.toString() === product._id.toString()
            ).quantity,
          };
        });
      });
  }

  deleteItemFromCart(productId) {
    const updatedCartItems = [
      ...this.cart.items.filter(
        (e) => e.productId.toString() !== productId.toString()
      ),
    ];

    return getDb()
      .collection(COLLECTION_NAME)
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: { items: updatedCartItems } } }
      );
  }

  addOrder() {
    return this.getCart()
      .then((products) => {
        const order = {
          items: products,
          user: {
            _id: new ObjectId(this._id),
            name: this.name,
            email: this.email,
          },
        };

        return getDb().collection("orders").insertOne(order);
      })
      .then((result) => {
        this.cart = { items: [] };
        return getDb()
          .collection(COLLECTION_NAME)
          .updateOne(
            { _id: new ObjectId(this._id) },
            { $set: { cart: { items: [] } } }
          );
      });
  }

  getOrders() {
    return getDb()
      .collection("orders")
      .find({ "user._id": new ObjectId(this._id) })
      .toArray()
  }

  static findById(userId) {
    return getDb()
      .collection(COLLECTION_NAME)
      .find({ _id: new ObjectId(userId) })
      .next()
      .then((product) => product)
      .catch((e) => console.log(e));
  }
}

module.exports = User;
