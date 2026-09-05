const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const get_comments_by_post = async (req, res) => {
  try {
    const post_id = parseInt(req.params.post_id);
    const comments = await prisma.comment.findMany({
      where: { post_id },
      include: { author: { select: { username: true } } },
      orderBy: { created_at: 'desc' }
    });

    return res.json(comments);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const create_comment = async (req, res) => {
  try {
    const post_id = parseInt(req.params.post_id);
    const { content } = req.body;

    const post = await prisma.post.findUnique({ where: { id: post_id } });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const new_comment = await prisma.comment.create({
      data: {
        content,
        post_id,
        author_id: req.user ? req.user.id : null
      }
    });

    return res.status(201).json(new_comment);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const delete_comment = async (req, res) => {
  try {
    const comment_id = parseInt(req.params.comment_id);
    const comment = await prisma.comment.findUnique({ where: { id: comment_id } });

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    if (!req.user.is_author && comment.author_id !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized to delete this comment' });
    }

    await prisma.comment.delete({ where: { id: comment_id } });
    return res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  get_comments_by_post,
  create_comment,
  delete_comment
};