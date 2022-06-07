import mongoose from 'mongoose';

export const dbCon = () => {
    try {
        const conn = mongoose.connect(process.env.MONGO_CLIENT);

        conn && console.log("Connected to mongoDB");
    } catch (error) {
        console.log(error);
    }



}