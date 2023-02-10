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
    // const cartProduct = this.cart.items.findIndex(cp => product._id === cp._id)
    const updatedCart = {
      items: [{ productId: new ObjectId(product._id), quantity: 1 }],
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
