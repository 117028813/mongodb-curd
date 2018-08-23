const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'
const dbName = 'test'

function connectDB() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
      if (err) reject(err)
      resolve(client)
    })
  })
}

async function insert(collectionName, data) {
  const client = await connectDB()
  const db = client.db(dbName)
  const result = await new Promise((resolve, reject) => {
    db.collection(collectionName).insertMany(data, (err, result) => {
      if (err) reject(err)
      resolve(result)
    })
  })
  client.close()
  return result
}

async function update(collectionName, field, data) {
  const client = await connectDB()
  const db = client.db(dbName)
  const result = await new Promise((resolve, reject) => {
    db.collection(collectionName).updateOne(field, { $set: data }, (err, result) => {
      if (err) reject(err)
      resolve(result)
    })
  })
  client.close()
  return result
}

async function find(collectionName, field) {
  const client = await connectDB()
  const db = client.db(dbName)
  const result = await new Promise((resolve, reject) => {
    db.collection(collectionName).find(field).toArray((err, result) => {
      if (err) reject(err)
      resolve(result)
    })
  })
  client.close()
  return result
}

async function remove(collectionName, field) {
  const client = await connectDB()
  const db = client.db(dbName)
  const result = await new Promise((resolve, reject) => {
    db.collection(collectionName).deleteOne(field, (err, result) => {
      if (err) reject(err)
      resolve(result)
    })
  })
  client.close()
  return result
}

module.exports = { insert, update, find, remove }
