import mongoose from 'mongoose';

mongoose.set('strictQuery', false);
const Connection = async (db_username, db_pws) => {
    const URL = `mongodb+srv://${db_username}:${db_pws}@udemyecm.8c2c2jl.mongodb.net/?retryWrites=true&w=majority`;
    try {
         await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log(`Database connected successfully`);
    } catch (error) {
        console.log(`error while connecting with database`, error.message);
    }

}

export default Connection;