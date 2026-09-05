const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const get_posts = async (req, res) => {
  try {
    const is_author_request = req.query.all === 'true';
    const query_filter = is_author_request ? {} : { is_published: true };

    const posts = await prisma.post.findMany({
      where: query_filter,
      include: { author: { select: { username: true } } },
      orderBy: { created_at: 'desc' }
    });

    return res.json(posts);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const get_post_by_id = async (req, res) => {
  try {
    const post_id = parseInt(req.params.post_id);
    const post = await prisma.post.findUnique({
      where: { id: post_id },
      include: {
        author: { select: { username: true } },
        comments: {
          include: { author: { select: { username: true } } },
          orderBy: { created_at: 'desc' }
        }
      }
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (!post.is_published && (!req.user || !req.user.is_author)) {
      return res.status(403).json({ error: 'Unauthorized to view unpublished post' });
    }

    return res.json(post);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const create_post = async (req, res) => {
  try {
    const { title, content, is_published } = req.body;
    const new_post = await prisma.post.create({
      data: {
        title,
        content,
        is_published: is_published || false,
        author_id: req.user.id
      }
    });

    return res.status(201).json(new_post);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const update_post = async (req, res) => {
  try {
    const post_id = parseInt(req.params.post_id);
    const { title, content, is_published } = req.body;

    const existing_post = await prisma.post.findUnique({ where: { id: post_id } });
    if (!existing_post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const updated_post = await prisma.post.update({
      where: { id: post_id },
      data: {
        title: title !== undefined ? title : existing_post.title,
        content: content !== undefined ? content : existing_post.content,
        is_published: is_published !== undefined ? is_published : existing_post.is_published
      }
    });

    return res.json(updated_post);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const delete_post = async (req, res) => {
  try {
    const post_id = parseInt(req.params.post_id);
    const existing_post = await prisma.post.findUnique({ where: { id: post_id } });
    
    if (!existing_post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    await prisma.post.delete({ where: { id: post_id } });
    return res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  get_posts,
  get_post_by_id,
  create_post,
  update_post,
  delete_post
};