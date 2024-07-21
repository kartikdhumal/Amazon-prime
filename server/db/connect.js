import 'dotenv/config';
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log(`Connection Successful`);
    } catch (err) {
        console.error('Connection Error:', err);
    }
};

export default connectDB;
