import express from 'express';
import dotenv from 'dotenv';
import product from './routes/product.js';
import  Connection  from './database/database.js';
import bodyParser from 'body-parser'; 
import { errorsMiddlewares } from './middlewares/errors.js';
const app = express();

app.use(express.json());

dotenv.config();
app.use(bodyParser.json({extended:true, urlencoded:true}));
app.use('/', product)

//middleware to handle error
app.use(errorsMiddlewares);

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;


const db_username = process.env.DB_USERNAME;
const db_pws = process.env.DB_PASSWORD;

Connection(db_username, db_pws);


app.listen(PORT, () => {
    console.log(`server started at ${PORT} in ${NODE_ENV} mode.`)
});





