import mongoose from 'mongoose';
import 'dotenv/config';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log(`Connection Successful : ${process.env.JWT_SECRET}`);
    } catch (err) {
        console.error('Connection Error:', err);
    }
};

export default connectDB;
