import mongoose from "mongoose";

export const connectToDB = async () => {
  const connection = {};
  try {
    if (connection.isConnected) return;
    const db = await mongoose.connect(process.env.MONGO_CONNECTION);
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const removeEmptyFields = (obj) => {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] !== undefined && obj[key] !== null && obj[key] !== "") {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};
