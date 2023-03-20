## ChatGPT Request Script
このプロジェクトは、指定された入力ファイルを使用してChatGPT（GPT-3.5-turboモデル）にリクエストを送信し、結果を新しいファイルに保存するNode.jsスクリプトです。

### 前提条件
Node.jsがインストールされていること
openai ライブラリがインストールされていること（インストール方法は以下の「セットアップ」セクションを参照）
dotenv ライブラリがインストールされていること（インストール方法は以下の「セットアップ」セクションを参照）

### セットアップ
このリポジトリをクローンまたはダウンロードします。
ターミナルで、プロジェクトルートに移動し、以下のコマンドを実行して必要なパッケージをインストールします。

```bash
git@github.com:bbz662/code_mentor.git
npm install openai dotenv
```

プロジェクトルートに .env ファイルを作成し、OpenAI APIキーを設定します。
```bash
echo OPENAI_API_KEY=your_api_key_here > .env
```

### 使い方

#### 要件定義からコードを作成する場合
入力ファイルを作成し、リクエストとなる質問や指示を記述します。例: input_file.txt
ターミナルで、以下のコマンドを実行してスクリプトを実行します。

```bash
node gen_code_from_requuirements.js input_file.txt
```

スクリプトが正常に実行されると、結果が output.txt ファイルに保存されます。

#### コードの概要
スクリプトは、fs.readFile を使用して指定された入力ファイルを読み込みます。その後、sendChatGPTRequest 関数を呼び出してリクエストを送信し、その結果を output.txt に保存します。


#### 既存コードをリファクタリングする場合
入力ファイルを作成し、リクエストとなる質問や指示を記述します。例: input_file.txt
ターミナルで、以下のコマンドを実行してスクリプトを実行します。

```bash
node refactor_code.js input_file.txt
```

スクリプトが正常に実行されると、結果が refactored.txt ファイルに保存されます。

#### コードの概要
スクリプトは、fs.readFile を使用して指定された入力ファイルを読み込みます。その後、sendChatGPTRequest 関数を呼び出してリクエストを送信し、その結果を refactored.txt に保存します。
