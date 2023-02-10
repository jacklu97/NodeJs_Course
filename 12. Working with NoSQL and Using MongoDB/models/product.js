const mongodb = require('mongodb');

const getDb = require('../util/database').getDb;

const COLLECTION_NAME = 'products'

class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    let dbOp;
    console.log(this)
    if (this._id) {
      // update the product
      dbOp = db.collection(COLLECTION_NAME).updateOne(
        {
          _id: this._id
        }, 
        {
          $set: this
        }
      )
    } else {
      dbOp = db.collection(COLLECTION_NAME).insertOne(this);
    }
    return dbOp
      .then(result => {
        console.log(result)
      })
      .catch(err => console.error(err));
  }

  static fetchAll() {
    return getDb()
      .collection(COLLECTION_NAME)
      .find()
      .toArray()
      .then(products => {
        console.log(products)
        return products
      })
      .catch(err => console.error(err));
  }

  static findById(prodId) {
    return getDb()
      .collection(COLLECTION_NAME)
      .find({_id: new mongodb.ObjectId(prodId)})
      .next()
      .then(product => {
        return product
      })
      .catch(err => console.log(err))
  }

  static deleteById(prodId) {
    return getDb()
      .collection(COLLECTION_NAME)
      .deleteOne({_id: new mongodb.ObjectId(prodId)})
      .then(result => {
        console.log('Product deleted!')
      })
      .catch(er => console.log(er))
  }
}

module.exports = Product;
