'use strict';

const routeResponseMap = new Map ([
    ["/info", "<h1>Info Page</h1>"],
    ["/contact", "<h1>Contact Us</h1>"],
    ["/about", "<h1>About Us</h1>"],
    ["/hello", "<h1>Say hello by emailing us <a href=\"mailto:user@dummy.com\">here</a></h1>"],
    ["/error", "Sorry, the page you are looking for is not here"]
]);

const port = 3000,
    // http と http-status-code のモジュールをロードする
    http = require('http'),
    httpStatus = require('http-status-codes'),
    // request と response のパラメータを指定してサーバーを作成
    app = http.createServer((req, res) => {
        // // 「リクエストを受信しました！」
        // console.log("Received an incoming request!");
        // クライアントに対するレスポンスを書く
        // res.writeHead(httpStatus.OK, {
        //     "Content-Type": "text/html"
        // });

        // リクエストの経路がマップで定義されているかチェック
        if (routeResponseMap.has(req.url)) {
            let responseMessage = routeResponseMap.get(req.url);
            let httpStatusCode = httpStatus.OK;
            
            if (req.url == "/error"){
                httpStatusCode = httpStatus.NOT_FOUND;
                responseMessage = httpStatusCode + ": " + responseMessage;
            }
            res.writeHead(httpStatusCode, {
                "Content-Type": "text/html"
            });
            res.end(responseMessage);
            // // レスポンスを遅くする
            // setTimeout(() => res.end(responseMessage), 2000);
        } else {
            // デフォルトの HTML でレスポンス
            res.end("<h1>Welcome!</h1>");
        }

        // let responseMessage = "<h1>Hello, Universe!</h1>";
        // response.write(responseMessage);
        // response.end();
        // // 「レスポンスを送信しました」
        // console.log(`Sent a response: ${responseMessage}`);
    });

// アプリケーションのサーバーにポート 3000 を監視させる
app.listen(port);
// 「サーバーが起動して、このポートを監視中」
console.log(`The server has started and is listening on port number: ${port}`);

