const prisma = require('../config/database');

async function get_conversations(req, res) {
  try {
    const user_id = req.session.user_id;
    if (!user_id) return res.status(401).json({ error: 'Unauthorized' });

    // Fallback safely to whatever casing your prisma client generated
    const db = prisma.conversationParticipant || prisma.ConversationParticipant;
    
    const participants = await db.findMany({
      where: { userId: user_id },
      include: {
        conversation: {
          include: {
            participants: {
              include: {
                user: true
              }
            }
          }
        }
      }
    });

    const conversations = participants.map(p => {
      const conv = p.conversation;
      const other_participant = conv.participants.find(part => part.userId !== user_id);
      
      return {
        id: conv.id,
        recipient_username: other_participant ? other_participant.user.username : 'Unknown',
        recipient_picture: other_participant ? other_participant.user.profilePicture : null
      };
    });

    res.json(conversations);
  } catch (err) {
    console.error('Failed to fetch conversations:', err);
    res.status(500).json({ error: 'Server Error' });
  }
}

async function create_conversation(req, res) {
  try {
    const user_id = req.session.user_id;
    const { recipient_id } = req.body;

    if (!user_id) return res.status(401).json({ error: 'Unauthorized' });
    if (!recipient_id) return res.status(400).json({ error: 'Recipient ID required' });

    const db = prisma.conversationParticipant || prisma.ConversationParticipant;

    const user_conversations = await db.findMany({
      where: { userId: user_id },
      select: { conversationId: true }
    });

    const conversation_ids = user_conversations.map(p => p.conversationId);

    const existing = await db.findFirst({
      where: {
        conversationId: { in: conversation_ids },
        userId: Number(recipient_id)
      }
    });

    if (existing) {
      return res.json({ id: existing.conversationId });
    }

    const new_conv = await prisma.conversation.create({
      data: {
        participants: {
          create: [
            { userId: user_id },
            { userId: Number(recipient_id) }
          ]
        }
      }
    });

    res.json({ id: new_conv.id });
  } catch (err) {
    console.error('Failed to create conversation:', err);
    res.status(500).json({ error: 'Server Error' });
  }
}

module.exports = { get_conversations, create_conversation };