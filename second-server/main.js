const port = 3000,
    http = require("http"),
    httpStatus = require("http-status-codes"),
    app = http.createServer();

// リクエストを監視するリスナ
app.on("request", (req, res) => {   // リクエストを監視
    var body = [];                  // チャンクを格納する配列
    req.on("data", (bodyData) => {  // そのデータを別のコールバック関数で処理
        body.push(bodyData);        // 受信したデータを body 配列に入れる
    });
    req.on("end", () => {           // データ転送の完了時に実行するコード
        // body 配列を文字列テキストに変換
        body = Buffer.concat(body).toString();
        // リクエストの内容をコンソールにロギングする
        console.log(`Request Body Contents: ${body}`);
    });

    // レスポンスを準備
    res.writeHead(httpStatus.OK, {
        "Content-Type": "text/html"
    });

    // 「このメッセージが画面に現れます」
    let responseMessage = "<h1>This will show on the screen.</h1>";
    // HTML でレスポンスする
    res.end(responseMessage);

    // ログ出力
    console.log(`method: ${getJSONString(req.method)}`);    // リクエストの HTTP メソッド
    console.log(`URL: ${getJSONString(req.url)}`);          // リクエストの URL
    console.log(`HEADER: ${getJSONString(req.headers)}`);   // リクエストのヘッダ
});

// JavaScript オブジェクトを文字列に変換する
const getJSONString = obj => {
    return JSON.stringify(obj, null, 2);
};

app.listen(port);
// サーバーが起動しました。監視しているポート番号は」
console.log(`The server has started and is listening on port number: ${port}`);
