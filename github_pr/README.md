## Code Refactor and Pull Request Automation
このリポジトリには、GitHub上のリポジトリでファイルをリファクタリングし、それを新しいブランチにコミットし、プルリクエストを作成するスクリプトが含まれています。このスクリプトは、OpenAI GPT-3.5-turboを使用してコードのリファクタリングと要約を行います。

### Requirements
- Node.js
- npm
- GitHub Personal Access Token (with repo scope)
- OpenAI API key

### Setup
このリポジトリをクローンします。

プロジェクトディレクトリで npm install を実行して、依存関係をインストールします。

環境変数を設定するために、プロジェクトのルートディレクトリに .env ファイルを作成します。以下の変数を設定します。

```
Copy code
GITHUB_TOKEN=<your_github_token>
OPENAI_API_KEY=<your_openai_api_key>
OWNER=<repository_owner>
REPO=<repository_name>
BRANCH=<base_branch>
NEW_BRANCH=<new_branch>
COMMIT_MESSAGE=<commit_message>
FILE_PATH=<file_path>
PR_TITLE=<pull_request_title>
例:

makefile
Copy code
GITHUB_TOKEN=abc123xyz
OPENAI_API_KEY=def456uvw
OWNER=johndoe
REPO=my-repo
BRANCH=main
NEW_BRANCH=refactor-feature
COMMIT_MESSAGE="Refactor code using GPT-3.5-turbo"
FILE_PATH=src/app.js
PR_TITLE="Code refactor using GPT-3.5-turbo"
```

### Usage
プロジェクトディレクトリで node index.js を実行して、指定したファイルをリファクタリングし、新しいブランチにコミットし、プルリクエストを作成します。

### Functionality
- createPullRequest(): プルリクエストの作成プロセス全体を制御する非同期関数です。
- refactWithChatGPT(prompt): GPT-3.5-turboを使用してコードのリファクタリングを行う非同期関数です。
- summaryWithChatGPT(prompt): GPT-3.5-turboを使用してコードの要約を行う非同期関数です。
