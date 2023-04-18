const express = require('express')
const app = express()
const bodyParser=require('body-parser')
const dotenv = require('dotenv');
const { routes } = require('./routes/routes');
dotenv.config();
require('./model/index')


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.get('/z', (req, res) => res.send('Hello World!'))

app.use('/',routes)
app.listen(process.env.PORT,()=>{
    console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})
