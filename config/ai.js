const axios = require("axios");

async function askAI(prompt) {
  const response = await axios.post(
    "https://codecraftapi.com/v1/chat/completions",
    {
      model: "deepseek-v4-flash-0731",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.9,
      max_tokens: 150,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.CODECRAFT_API_KEY}`,
        "Content-Type": "application/json",
      },
    },
  );

  return response.data.choices[0].message.content;
}

module.exports = askAI;
