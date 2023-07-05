# はじめに
ここ最近はプライベートにあげてましたが、ちょっと気が変わったので、公開することにしました。

# What is this
マストドン上にあるアカウントをRSSで取得するもの。

デフォルトでは私がUNNERVを取得したかったのでUNNERVを取得するものになってます。

# 使い方
最初にモジュールのインストール
 `npm i`  

config/config.jsonのwebhooksにDiscordのWebhookURLを置く

`{
    "webhooks": ["https://discord.com/api/webhook/012345678/hogehoge", "https://discord.com/api/webhook/123456789/hogeeehoge"]
}`

そして起動する
 `node main.js`

# 違い
index.jsとmain.jsが２つあるけどこの２つの違いは**URL**をそのまま吐き出すか、**Embed**を使うかの違いです。

コードを見ればすぐにわかりますが、index.jsのほうがURLをそのまま吐き出します。  
main.jsがEmbedを使用します。

# 最後に
ちょっとした雑談を、TwitterのAPIが有料化されて今までやっていたことができなくなったのも最近のこと、まぁ今回それでマストドンへの移行をしたのもそうですけど。  
なんだかんだコードを書いて行き詰まって、他の人のコードを見てると学ぶ部分がたくさん多いです。なんせ自称ライトプログラマーなもんで、コードは書いて覚えろのスタンスでやってます。

またいつかなにか作れたらいいな。                      
FIN

