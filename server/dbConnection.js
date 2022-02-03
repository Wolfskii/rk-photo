const { MongoClient } = require('mongodb')
const ObjectId = require('mongodb').ObjectId
const db = {}

const url = process.env.DB_URL
const dbName = process.env.DB_NAME
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })

db.connect = async () => {
  await client.connect((err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Connected to DB succesfully!')
    }
  })
}

db.readAll = async (collection) => {
  db.connect()

  const items = await client.db(dbName).collection(collection)
    .find({}).toArray()

  db.disconnect()

  return (items)
}

db.readById = async (collection, id) => {
  db.connect()

  const item = await client.db(dbName).collection(collection)
    .find({ _id: ObjectId(id) }).toArray()

  db.disconnect()

  return (item)
}

db.create = async (collection, item) => {
  db.connect()

  const newItem = await client.db(dbName).collection(collection)
    .insertOne(item)

  db.disconnect()

  return (newItem)
}

db.updateById = async (collection, updatedItem) => {
  const _id = updatedItem._id
  delete updatedItem._id

  db.connect()

  const updatedItemRes = await client.db(dbName).collection(collection)
    .updateOne({ _id: ObjectId(_id) }, { $set: updatedItem })

  db.disconnect()

  return (updatedItemRes)
}

db.deleteById = async (collection, id) => {
  db.connect()

  const item = await client.db(dbName).collection(collection)
    .deleteOne({ _id: ObjectId(id) })

  db.disconnect()

  return (item)
}

db.disconnect = async () => {
  await client.close()
}

module.exports = db
