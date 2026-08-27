const db = require('../database/queries');

async function get_all_messages(req, res) {
  try {
    const messages = await db.get_all_messages();
    res.render('index', {
      title: 'Mini Message Board',
      messages: messages,
    });
  } catch (error) {
    console.error('Error getting messages:', error);
    res.status(500).send('Database error loading messages');
  }
}

function get_new_message_form(req, res) {
  res.render('new', { title: 'New Message Form' });
}

async function create_message(req, res) {
  try {
    const { message_user, message_text } = req.body;
    await db.insert_message(message_user, message_text);
    res.redirect('/');
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).send('Database error saving message');
  }
}

async function get_message_by_id(req, res) {
  try {
    const { id } = req.params;
    const message = await db.get_message_by_id(id);

    if (!message) {
      return res.status(404).send('Message not found');
    }

    res.render('detail', {
      title: 'Message Details',
      message: message,
    });
  } catch (error) {
    console.error('Error fetching message details:', error);
    res.status(500).send('Database error retrieving message details');
  }
}

module.exports = {
  get_all_messages,
  get_new_message_form,
  create_message,
  get_message_by_id,
};