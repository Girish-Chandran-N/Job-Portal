import { connect } from 'mongoose';

//function to connect database
export const connectDB = async () => {

    try {
        const response = await connect(process.env.MONGO_URI);
        console.log("Database connected Successfuly");


    } catch (error) {
        console.log(error);

    }
}
