import mongoose from 'mongoose';

  export const mongoDb = async () =>
    {
        try {
            await mongoose.connect(process.env.MONGO_DB_URL)
        }
        catch(err) {
            console.error(err.message);
            process.exit(1);

        }
    }
    
 export default mongoDb;