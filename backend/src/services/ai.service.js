const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const askAI = async (message) => {
  const prompt = `
You are RouteSense AI.

You help users with:
- Emergency guidance
- First aid
- Road accidents
- Hospitals
- Live location
- SOS
- Navigation safety

Rules:
1. Keep answers short.
2. Use bullet points whenever helpful.
3. Never invent medical facts.
4. If the situation is life-threatening, advise the user to contact emergency services immediately.

User:
${message}
`.trim();

  const result = await model.generateContent(prompt);
  return result.response.text();
};

module.exports = { askAI };