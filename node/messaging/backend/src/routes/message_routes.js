const express = require('express');
const router = express.Router();
const prisma = require('../config/database');

router.get('/:conversationId', async (req, res) => {
  try {
    const user_id = req.session.user_id;
    const conversationId = Number(req.params.conversationId);

    if (!user_id) return res.status(401).json({ error: 'Unauthorized' });

    const participant = await prisma.conversationParticipant.findFirst({
      where: { conversationId, userId: user_id }
    });

    if (!participant) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const messages = await prisma.message.findMany({
      where: { conversationId },
      include: {
        sender: { select: { username: true } }
      },
      orderBy: { createdAt: 'asc' }
    });

    const formatted = messages.map(m => ({
      id: m.id,
      content: m.content,
      username: m.sender.username,
      createdAt: m.createdAt
    }));

    res.json(formatted);
  } catch (err) {
    console.error('Failed to fetch messages:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const user_id = req.session.user_id;
    const { conversation_id, content } = req.body;

    if (!user_id) return res.status(401).json({ error: 'Unauthorized' });
    if (!conversation_id || !content) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const participant = await prisma.conversationParticipant.findFirst({
      where: { conversationId: Number(conversation_id), userId: user_id }
    });

    if (!participant) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const new_message = await prisma.message.create({
      data: {
        conversationId: Number(conversation_id),
        senderId: user_id,
        content
      },
      include: {
        sender: { select: { username: true } }
      }
    });

    res.json({
      id: new_message.id,
      content: new_message.content,
      username: new_message.sender.username,
      createdAt: new_message.createdAt
    });
  } catch (err) {
    console.error('Failed to send message:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;