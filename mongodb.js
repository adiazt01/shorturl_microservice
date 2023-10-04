import mongoose from "mongoose";
const uri = "mongodb+srv://admin:admin@cluster0.uldeihi.mongodb.net/?retryWrites=true&w=majority";

export const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("DB is connected");
  } catch (error) {
    console.log(error);
  }
};
