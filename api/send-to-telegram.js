const axios = require('axios');

module.exports = async function (req, res) {
  if (req.method === 'POST') {
    try {
      const { choice } = req.body;
      
      const response = await axios.post(
        `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: `User choice: ${choice}`,
        }
      );
      
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
};
