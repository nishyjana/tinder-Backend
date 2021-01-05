import express from 'express';
import mongoose from 'mongoose';

import Cards from './dbcards.js';
import Cors from 'cors';


//APP config
const app = express();
const port = process.env.PORT || 8001
const connection_url = 'mongodb+srv://admin:R5F5V0M1nXspWcQE@cluster0.btawp.mongodb.net/tinderdb?retryWrites=true&w=majority'



//middleware
app.use(express.json());
app.use(Cors());


//db config
mongoose.connect(connection_url,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
})



//api end point

app.get('/',(req,res)=> res.status(200).send('HEllo nishy'));

app.post('/tinder/cards', (req,res)=> {
    const dbCard = req.body;

    Cards.create(dbCard,(err,data)=>{
        if(err){
            res.status(500).send(err)

        }else{
            res.status(201).send(data)

        }
    })
});
app.get('/tinder/cards',(req,res)=>{
    Cards.find((err,data)=>{
        if(err){
            res.status(500).send(err)

        }else{
            res.status(200).send(data)

        }
    })
})

//listner
app.listen(port,()=> console.log(`listeint on local hosdt : ${port} `));

