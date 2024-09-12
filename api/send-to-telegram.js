const axios = require('axios');

exports.handler = async function(event, context) {
  if (event.httpMethod === 'POST') {
    try {
      const { choice } = JSON.parse(event.body);
      const response = await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: `User choice: ${choice}`
      });
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true })
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message })
      };
    }
  } else {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }
};
