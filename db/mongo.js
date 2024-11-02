const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const uri = process.env.MONGO_URI

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})

const validatedb = async  () => {
    try {
      await  client.connect()
      console.log('se conecto');
    } catch (error) {
      console.error(error);
    }
}


validatedb()


module.exports = client;