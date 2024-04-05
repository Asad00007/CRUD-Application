import prisma from "../DB/db.config.js";

export const fetchComments = async (req, res) => {
  const comments = await prisma.comment.findMany({
    include: {
      user: true,
      post: {
        include: {
          user: true,
        },
      },
    },
  });

  return res.json({ status: 200, data: comments });
};

export const createComments = async (req, res) => {
  const { user_id, post_id, comment } = req.body;

  //increase comment count in post
  await prisma.post.update({
    where: {
      id: Number(post_id),
    },
    data: {
      comment_count: {
        increment: 1,
      },
    },
  });
  const newComment = await prisma.comment.create({
    data: {
      user_id: Number(user_id),
      post_id: Number(post_id),
      comment,
    },
  });
  return res.json({
    status: 200,
    data: newComment,
    message: "New Comment Created",
  });
};

export const showComment = async (req, res) => {
  const commentId = req.params.id;

  const comment = await prisma.comment.findFirst({
    where: {
      id: Number(commentId),
    },
  });
  return res.json({ status: 200, data: comment });
};

export const deleteComment = async (req, res) => {
  const commentId = req.params.id;

  await prisma.post.update({
    where: {
      id: Number(post_id),
    },
    data: {
      comment_count: {
        decrement: 1,
      },
    },
  });
  await prisma.comment.delete({
    where: {
      id: Number(commentId),
    },
  });
  return res.json({ status: 200, message: "Comment Deleted Successfully" });
};
