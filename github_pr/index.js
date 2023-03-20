const { Octokit } = require("@octokit/core");
const { restEndpointMethods } = require("@octokit/plugin-rest-endpoint-methods");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const MyOctokit = Octokit.plugin(restEndpointMethods);

async function createPullRequest() {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.OWNER;
  const repo = process.env.REPO;
  const baseBranch = process.env.BRANCH;
  const newBranch = process.env.NEW_BRANCH;
  const commitMessage = process.env.COMMIT_MESSAGE;
  const filePath = process.env.FILE_PATH;
  const prTitle = process.env.PR_TITLE;
  const octokit = new MyOctokit({ auth: token });

  // Get reference to the base branch
  const { data: base } = await octokit.rest.git.getRef({
    owner,
    repo,
    ref: `heads/${baseBranch}`,
  });

  // Create a new branch
  await octokit.rest.git.createRef({
    owner,
    repo,
    ref: `refs/heads/${newBranch}`,
    sha: base.object.sha,
  });

  // Get file content
  const { data: fileData } = await octokit.rest.repos.getContent({
    owner,
    repo,
    path: filePath,
    ref: baseBranch,
  });

  // Update file content
  const oldContent = Buffer.from(fileData.content, "base64").toString("utf-8");
  // const newContent = oldContent.replace("old text", "new text");
  const newContent = await refactWithChatGPT(oldContent)
  const body = await summaryWithChatGPT(newContent);
  const newContentEncoded = Buffer.from(newContent, "utf-8").toString("base64");

  // Commit the changes
  await octokit.rest.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: filePath,
    branch: newBranch,
    message: commitMessage,
    content: newContentEncoded,
    sha: fileData.sha,
  });

  // Create a pull request
  await octokit.rest.pulls.create({
    owner,
    repo,
    title: prTitle,
    head: newBranch,
    base: baseBranch,
    body: body,
  });

  console.log("Pull request created!");
}

async function refactWithChatGPT(prompt) {
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{
      'role': 'system',
      'content': `貴方は天才ソフトウェアエンジニアとして提示したコードをリファクタリングしてください。出力内容はコードのみにしてください。`,
    },
    { 'role': 'user', 'content': prompt }
    ],
  });

  return response.data.choices[0].message?.content;
}

async function summaryWithChatGPT(prompt) {
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{
      'role': 'system',
      'content': `貴方は天才ソフトウェアエンジニアとして提示したコードをの内容を要約してください`,
    },
    { 'role': 'user', 'content': prompt }
    ],
  });

  return response.data.choices[0].message?.content;
}

createPullRequest().catch((err) => console.error(err));