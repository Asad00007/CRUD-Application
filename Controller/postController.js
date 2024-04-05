import prisma from "../DB/db.config.js";

export const fetchPosts = async (req, res) => {
  const posts = await prisma.post.findMany({
    include: {
      Comment: {
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  return res.json({ status: 200, data: posts });
};

export const createPost = async (req, res) => {
  const { user_id, title, description } = req.body;

  const newPost = await prisma.post.create({
    data: {
      user_id: Number(user_id),
      title,
      description,
    },
  });
  return res.json({ status: 200, data: newPost, message: "Post Created" });
};

export const showPost = async (req, res) => {
  const postId = req.params.id;
  const post = await prisma.post.findFirst({
    where: {
      id: Number(postId),
    },
  });
  return res.json({ status: 200, data: post });
};

export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { user_id, title, description } = req.body;

  await prisma.post.update({
    where: {
      id: Number(user_id),
    },
    data: {
      user_id,
      title,
      description,
    },
  });
  return res.json({ status: 200, message: "Post Updated Successfully" });
};

export const deletePost = async (req, res) => {
  const postId = req.params.id;

  await prisma.post.delete({
    where: {
      id: Number(postId),
    },
  });
  return res.json({ status: 200, message: "Post Deleted Successfully" });
};
