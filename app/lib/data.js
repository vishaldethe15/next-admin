import { Product, User } from "./models";
import { connectToDB } from "./utils";

export const fetchUsers = async (query, page, itemPerPage) => {
  const regex = new RegExp(query, "i");
  const skip = itemPerPage * (page - 1);

  connectToDB();
  try {
    const count = await User.find({ username: { $regex: regex } }).count();
    const users = await User.find({ username: { $regex: regex } })
      .limit(itemPerPage)
      .skip(skip);
    return { users, count };
  } catch (error) {
    console.log(error);
  }
};

export const fetchSingleUser = async (id) => {
  connectToDB();
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const fetchProducts = async (query, page, itemPerPage) => {
  const regex = new RegExp(query, "i");
  const skip = itemPerPage * (page - 1);

  connectToDB();
  try {
    const count = await Product.find({ title: { $regex: regex } }).count();
    const products = await Product.find({ title: { $regex: regex } })
      .limit(itemPerPage)
      .skip(skip);
    return { products, count };
  } catch (error) {
    console.log(error);
  }
};

export const fetchSingleProduct = async (id) => {
  connectToDB();
  try {
    const product = await Product.findById(id);
    return product;
  } catch (error) {
    console.log(error);
  }
};
