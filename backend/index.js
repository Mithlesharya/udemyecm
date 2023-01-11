import express from 'express';
import dotenv from 'dotenv';
import product from './routes/product.js';
import  Connection  from './database/database.js';
import bodyParser from 'body-parser'; 
import { errorsMiddlewares } from './Handlers/errors.js';
const app = express();

//handle uncaught expection error
process.on('uncaughtException', err =>{
    console.log(`Error: ${err.message}`);
    console.log('Shutting down server due to uncaught exception error');
    process.exit(1);
})

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

const server = app.listen(PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
});


//handle unhandledrejection promise error
process.on('unhandledRejection', err =>{
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to unhandled promise rejection');
    server.close(()=>{
        process.exit(1);
    })
})




