import prisma from "../DB/db.config.js";
import { hash } from "bcrypt";

//get all data
export const fetchUsers = async (req, res) => {
  const users = await prisma.user.findMany({
    include: {
      //   Post: true, //this will give user data along with their posts
      Post: {
        select: {
          //this will give only selected fields
          title: true,
          comment_count: true,
        },
      },
    },

    //user data along with their post count
    // select: {
    //   _count: {
    //     select: {
    //       Post: true,
    //       Comment: true,
    //     },
    //   },
    // },
  });

  return res.json({ status: 200, data: users });
};

//create user
export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const isUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (isUser) {
    return res.json({ status: 400, message: "Email already taken" });
  }
  const hashedPassword = await hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
    },
  });
  return res.json({
    status: 200,
    data: newUser,
    message: "User Created",
  });
};

//update the user
export const updateUser = async (req, res) => {
  const userId = req.params.id; //get ID of user through URL
  const { name, email, password } = req.body;

  const hashedPassword = await hash(password, 10);
  await prisma.user.update({
    where: {
      id: Number(userId),
    },
    data: {
      name: name,
      email: email,
      password: hashedPassword,
    },
  });
  return res.json({ status: 200, message: "User Updated Successfully" });
};

//Show user
export const showUser = async (req, res) => {
  const userId = req.params.id;
  const user = await prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
  });

  return res.json({ status: 200, data: user });
};

//delete user
export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  await prisma.user.delete({
    where: {
      id: Number(userId),
    },
  });
  return res.json({ status: 200, message: "User deleted successfuly" });
};
