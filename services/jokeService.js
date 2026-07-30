const askAI = require("../config/ai");

async function getJoke(language, category) {
  const prompt = `
Generate ONE ${category} joke.

Language: ${language}

Rules:
- Funny
- Short
- Family friendly
- No explanation
- Emoji allowed
`;

  return await askAI(prompt);
}

module.exports = getJoke;
