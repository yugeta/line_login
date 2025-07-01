LINEログイン
===
```
Create : 2025-06-29
Author : Yugeta.Koji
```

# Summary
- フロントJSのみで、LINEログインのOAuth認証を行う、簡易ライブラリ

# Howto

1. LINE Developpersサイトで、プロバイダー、チャンネルの登録をする。
> https://account.line.biz/login

2. setting.json を作成
- LINE Developpers管理画面から以下情報を書き換える。
- callback-urlは、管理画面で登録したものと同じ値を登録
```: setting.json
{
  "ver" : "2.1",
  "client_id" : "YOUR CLIENT ID",
  "channel_secret" : "YOUR CHANNEL SECRET",
  "callback_url" : "http://example.com/callback.html"
}
```

3. ページ内にLINEログインのボタンを設置
```: login.html
<button class="line-login-button" type="button">LINEログイン</button>
```

4. LINEログイン実行手順
- demo/main.js を参考に、LINEログインを起動する処理を実行。
  - 【手順: オーソライズ処理】
  - setting.json のデータを line_login.js に送ってインスタンス起動する。
  - 【手順: Callback】
  - callback.js をインスタンス起動する。

5. 
