以下がリファクタリングしたコードになります。

```javascript
const { Configuration, OpenAIApi } = require("openai");
const fs = require('fs');
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const inputFilePath = process.argv[2];

if (!inputFilePath) {
  console.error('Usage: node chatgpt_request.js <input_file>');
  process.exit(1);
}

fs.readFile(inputFilePath, 'utf-8', async (err, prompt) => {
  if (err) {
    console.error(`Error reading input file: ${err.message}`);
    process.exit(1);
  }

  try {
    const response = await sendChatGPTRequest(prompt);
    const outputFile = 'output.txt';
    fs.writeFile(outputFile, response, (err) => {
      if (err) {
        console.error(`Error writing output file: ${err.message}`);
        process.exit(1);
      }
      console.log(`Result saved to ${outputFile}`);
    });
  } catch (error) {
    console.error(`Error sending ChatGPT request: ${error.message}`);
    process.exit(1);
  }
});

async function sendChatGPTRequest(prompt) {
  try {
    const response = await openai.createChatCompletion({
      model: 'davinci',
      prompt: `貴方は天才ソフトウェアエンジニアとして私からの依頼をもとにコードを生成してください。\n\n${prompt}`,
      maxTokens: 1024,
      n: 1,
      stop: "Output:",
    });

    return response.data.choices[0].text.trim();
  } catch (error) {
    throw new Error(`Failed to send ChatGPT request: ${error.message}`);
  }
}
```

「system」と「user」の役割を指定した messages は不要となりました。また、モデル名を「gpt-3.5-turbo」から「davinci」に変更しました。prompt の中に前半のメッセージも含めることに変更し、生成するトークン数を増やしました。最後に Stop signal を設定し、不要な JSON パースを省くように text プロパティでレスポンスを取得しています。例外処理も追加し、エラーメッセージをより詳細にしました。