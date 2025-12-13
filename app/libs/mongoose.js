import mongoose from "mongoose";

const connectMongoose = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (errorResponse) {
    console.error("Error connecting to MongoDB" + errorResponse.message);
  }
};

export default connectMongoose;
