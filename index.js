const express = require('express');
const cors = require ('cors'); 
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const app = express(); 

app.use (cors()); 
app.use(bodyParser.json())

const uri = process.env.DB_PATH;

let client = new MongoClient(uri, { useNewUrlParser: true });

const user = ['Masud', 'Shohag', 'Rubel', 'Jahim']; 

app.get('/products', (req, res)=>{
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        // collection.find().toArray((err, documents)=>{
        collection.find().toArray((err, documents)=>{
            if(err){
                console.log(err);
                res.status(500).send({massage:err});
            }else{
            res.send(documents);
            }
        })
        client.close();
      });
}); 
app.post('/getProductsByKey/:key', (req, res)=>{
    const key = req.params.key; 
    const productKeys = req.body;
    console.log(productKeys);
    
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        // collection.find().toArray((err, documents)=>{
        collection.find({key}).toArray((err, documents)=>{
            if(err){
                console.log(err);
                res.status(500).send({massage:err});
            }else{
            res.send(documents[0]);
            }
        })
        client.close();
      });  
})


//post 
app.post('/addProduct', (req, res)=>{
    client = new MongoClient(uri, { useNewUrlParser: true });
    const product = req.body;
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        collection.insert(product, (err, result)=>{
            if(err){
                console.log(err);
                res.status(500).send({massage:err});
            }else{
            res.send(result.ops[0]);
            }
        })
        client.close();
      });
})

app.listen(4000, ()=> console.log('Listening to port 4000'))

