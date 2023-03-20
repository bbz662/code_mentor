const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();
const fs = require('fs');
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

if (process.argv.length !== 3) {
  console.error('Usage: node chatgpt_request.js <input_file>');
  process.exit(1);
}

const inputFilePath = process.argv[2];

fs.readFile(inputFilePath, 'utf-8', async (err, prompt) => {
  if (err) {
    console.error('Error reading input file:', err.message);
    process.exit(1);
  }

  try {
    const response = await sendChatGPTRequest(prompt);
    const outputFile = 'output.txt';
    fs.writeFile(outputFile, response, (err) => {
      if (err) {
        console.error('Error writing output file:', err.message);
        process.exit(1);
      }
      console.log(`Result saved to ${outputFile}`);
    });
  } catch (error) {
    console.error('Error sending ChatGPT request:', error.message);
    process.exit(1);
  }
});

async function sendChatGPTRequest(prompt) {
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{
      'role': 'system',
      'content': `貴方は天才ソフトウェアエンジニアとして私からの依頼をもとにコードを生成してください。`,
    },
    { 'role': 'user', 'content': prompt }
    ],
  });

  return response.data.choices[0].message?.content;
}
