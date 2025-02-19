import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://gakizalievin219:CeIh29b53hhQyT7O@cluster0.4oc1l.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("Database Connection Failed", error);
        process.exit(1);
    }
};

export default connectDB;
