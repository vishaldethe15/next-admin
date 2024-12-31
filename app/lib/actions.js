"use server";
import { revalidatePath } from "next/cache";
import { Product, User } from "./models";
import { connectToDB, removeEmptyFields } from "./utils";
import { redirect } from "next/navigation";
import { signIn } from "../auth";

export const addUser = async (formdata) => {
  const { username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formdata);
  try {
    connectToDB();
    const newUser = new User({
      username,
      email,
      password,
      phone,
      address,
      isAdmin,
      isActive,
    });

    await newUser.save();
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const updateUser = async (formdata) => {
  const { id, username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formdata);
  try {
    connectToDB();
    const updateFields = {
      username,
      email,
      password,
      phone,
      address,
      isAdmin,
      isActive,
    };

    const cleanObj = removeEmptyFields(updateFields);
    await User.findByIdAndUpdate(id, cleanObj, { new: true });
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const deleteUser = async (formdata) => {
  const { id } = Object.fromEntries(formdata);
  try {
    connectToDB();
    await User.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/dashboard/users");
};

export const addProduct = async (formdata) => {
  const { title, desc, price, stock, color, size } =
    Object.fromEntries(formdata);
  try {
    connectToDB();
    const newProduct = new Product({ title, desc, price, stock, color, size });
    await newProduct.save();
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};

export const deleteProduct = async (formdata) => {
  const { id } = Object.fromEntries(formdata);
  try {
    connectToDB();
    await Product.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/dashboard/products");
};

export const updateProduct = async (formdata) => {
  const { id, title, desc, price, stock, color, size } =
    Object.fromEntries(formdata);
  try {
    connectToDB();
    const updateFields = { title, desc, price, stock, color, size };
    const cleanObj = removeEmptyFields(updateFields);
    await Product.findByIdAndUpdate(id, cleanObj, { new: true });
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};

export const authenticate = async (prevState, formdata) => {
  console.log(formdata);
  const { email, password } = Object.fromEntries(formdata);
  try {
    await signIn("credentials", { email, password });
  } catch (error) {
    return "invalid credentials";
  }
  revalidatePath("/login");
};
