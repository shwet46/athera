const { OpenAI } = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function fallbackGPT(prompt, userId) {
  try {
    const chat = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a helpful, friendly assistant chatbot.' },
        { role: 'user', content: prompt },
      ],
      user: userId.toString(),
    });

    return chat.choices[0]?.message?.content?.trim() || "I'm not sure how to respond to that.";
  } catch (err) {
    console.error('GPT Error:', err);
    return "❌ Sorry, I had trouble thinking of a good response.";
  }
}

module.exports = { fallbackGPT };