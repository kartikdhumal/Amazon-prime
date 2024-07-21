import 'dotenv/config'
import mongoose from 'mongoose'

const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URL).then(() => {
        console.log(`Connection Successfull`);
    }).catch((err) => {
        console.log("Connection ERR : " + err);
    })
}

export default connectDB;