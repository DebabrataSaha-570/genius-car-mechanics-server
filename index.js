const express = require('express')
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId
const cors = require('cors')
require('dotenv').config()

const app = express()
//middleware 
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 5000


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.imkxn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
    try {
        await client.connect();
        const database = client.db("carMechanic");
        const servicesCollection = database.collection("services");
        console.log('database connected ')

        //POST API 
        app.post('/services', async (req, res) => {
            console.log('hit the post API', req.body)
            const service = req.body

            const result = await servicesCollection.insertOne(service);
            res.json(result)
            console.log(`A document was inserted with the _id: ${result.insertedId}`);
        })

        //get API
        app.get('/services', async (req, res) => {
            const cursor = servicesCollection.find({})
            const result = await cursor.toArray()
            // console.log(result)
            res.json(result)
        })
        //get single service 
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const service = await servicesCollection.findOne(query)
            console.log(service)
            res.json(service)
        })

        //delete API
        app.delete('/services/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await servicesCollection.deleteOne(query)
            console.log(result)
            res.json(result)
        })


    } finally {
        //   await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Running genius car mechanics server')
})

app.get('/hello', (req, res) => {
    res.send('hello updated here')
})

app.listen(port, () => {
    console.log('Running genius car mechanics server on port', port)
})

/*
one time:
1. heroku account open
2. Heroku software install


Every Project :
1. Git init
2. .gitignore (node_modules, .env)
3. push everything to git
4. make sure you have this script:   "start": "node index.js",
5. make sure put process.env.PORT in front of your port number .
6. Heroku login
7. heroku create (only one time for a project )
8. command: git push heroku main

.......
update:
1. save everything , check locally
2. git add , git commit -m'', git push
3. command: git push heroku main

*/