const express = require('express')
const { MongoClient } = require('mongodb');
require('dotenv').config()

const app = express()
const port = process.env.DB_HOST


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.imkxn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
    try {
        await client.connect();
        //   const database = client.db("insertDB");
        //   const haiku = database.collection("haiku");
        console.log('database connected ')
        // create a document to insert
        //   const doc = {
        //     title: "Record of a Shriveled Datum",
        //     content: "No bytes, no problem. Just insert a document, in MongoDB",
        //   }
        //   const result = await haiku.insertOne(doc);
        //   console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
        //   await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Running genius car mechanics server')
})

app.listen(port, () => {
    console.log('Running genius car mechanics server on port', port)
})