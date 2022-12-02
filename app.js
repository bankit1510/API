import express from 'express'
import bodyParser from 'body-parser';
import router from './Routes/users.js';

const app = express();

const PORT=3000;

app.use(bodyParser.json());

app.use('/users',router);

app.get('/',(req,res)=>{
    res.send('Hello from homepage')
})

app.listen(PORT,()=>{
    console.log("Server is Running on http://localhost:3000/");
})