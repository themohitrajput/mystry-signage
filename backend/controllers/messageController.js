const Message = require('../models/Message');
const sendEmail = require('../utils/sendEmail');
const { asyncHandler } = require('../middleware/errorHandler');

// @desc    Submit contact form (public)
// @route   POST /api/messages
const createMessage = asyncHandler(async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  const doc = await Message.create({ name, email, phone, subject, message });

  // Try to email the business owner; failure to send email should not
  // fail the request since the enquiry is already safely stored in the DB.
  let emailSent = false;
  try {
    if (process.env.SMTP_USER && process.env.EMAIL_TO) {
      await sendEmail({
        to: process.env.EMAIL_TO,
        replyTo: email,
        subject: `New Website Enquiry: ${subject || 'General'} - ${name}`,
        html: `
          <h2>New Enquiry - Mistry Signage Website</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
          <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br/>')}</p>
        `,
      });
      emailSent = true;
      doc.emailSent = true;
      await doc.save();
    }
  } catch (err) {
    console.error('Email sending failed:', err.message);
  }

  res.status(201).json({
    success: true,
    message: 'Thank you! Your message has been received. We will contact you soon.',
    emailSent,
    data: doc,
  });
});

// @desc    Get all messages (admin inbox)
// @route   GET /api/messages
// @access  Private
const getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json({ success: true, count: messages.length, data: messages });
});

// @desc    Mark message read/unread
// @route   PUT /api/messages/:id
// @access  Private
const updateMessage = asyncHandler(async (req, res) => {
  const message = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!message) {
    res.status(404);
    throw new Error('Message not found');
  }
  res.json({ success: true, data: message });
});

// @desc    Delete message
// @route   DELETE /api/messages/:id
// @access  Private
const deleteMessage = asyncHandler(async (req, res) => {
  const message = await Message.findByIdAndDelete(req.params.id);
  if (!message) {
    res.status(404);
    throw new Error('Message not found');
  }
  res.json({ success: true, message: 'Message deleted' });
});

module.exports = { createMessage, getMessages, updateMessage, deleteMessage };
