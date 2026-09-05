const prisma = require('../config/database');

const get_conversations = async (req, res) => {
  const userId = req.session.user_id;
  try {
    const participants = await prisma.conversationParticipant.findMany({
      where: { userId },
      include: {
        conversation: {
          include: {
            participants: {
              include: { user: true },
            },
          },
        },
      },
    });

    const conversations = participants.map(p => {
      const recipientParticipant = p.conversation.participants.find(cp => cp.userId !== userId);
      return {
        id: p.conversation.id,
        recipient_username: recipientParticipant?.user.username,
        recipient_picture: recipientParticipant?.user.profilePicture,
      };
    });

    res.json(conversations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};

const get_messages = async (req, res) => {
  const conversationId = parseInt(req.params.id);
  try {
    const messages = await prisma.message.findMany({
      where: { conversationId },
      include: { sender: { select: { username: true } } },
      orderBy: { createdAt: 'asc' },
    });

    const formatted = messages.map(m => ({
      id: m.id,
      sender_id: m.senderId,
      content: m.content,
      created_at: m.createdAt,
      username: m.sender.username,
    }));

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};

const start_conversation = async (req, res) => {
  const currentUserId = req.session.user_id;
  const { recipient_id } = req.body;
  const recipientId = parseInt(recipient_id);

  try {
    // Check if conversation already exists between both users
    const existing = await prisma.conversationParticipant.findFirst({
      where: {
        userId: currentUserId,
        conversation: {
          participants: {
            some: { userId: recipientId },
          },
        },
      },
    });

    if (existing) {
      return res.json({ conversation_id: existing.conversationId });
    }

    // Create new conversation with participants
    const newConversation = await prisma.conversation.create({
      data: {
        participants: {
          create: [{ userId: currentUserId }, { userId: recipientId }],
        },
      },
    });

    res.status(201).json({ conversation_id: newConversation.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};

const send_message = async (req, res) => {
  const senderId = req.session.user_id;
  const { conversation_id, content } = req.body;
  const conversationId = parseInt(conversation_id);

  try {
    const message = await prisma.message.create({
      data: {
        conversationId,
        senderId,
        content,
      },
      include: {
        sender: { select: { username: true } },
      },
    });

    res.status(201).json({
      id: message.id,
      sender_id: message.senderId,
      content: message.content,
      created_at: message.createdAt,
      username: message.sender.username,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = { get_conversations, get_messages, start_conversation, send_message };