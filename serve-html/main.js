const port = 3000,
    http = require("http"),
    httpStatusCodes = require("http-status-codes"),
    router = require("./router"),
    fs = require("fs"),
    plainTextContentType = {
        "Content-Type": "text/plain"
    },
    htmlContentType = {
        "Content-Type": "text/html"
    },

customReadFile = (file, res) => {
    fs.readFile(`./${file}`, (errors, data) => {
        if(errors) {
            console.log("Error reading the file...");
        }
        res.end(data);
    });
};

// get と post で経路を登録する
router.get("/", (req, res) => {
    res.writeHead(httpStatusCodes.OK, plainTextContentType);
    res.end("INDEX");
});

router.get("/index.html", (req, res) => {
    res.writeHead(httpStatusCodes.OK, htmlContentType);
    customReadFile("views/index.html", res);
});

router.post("/", (req, res) => {
    res.writeHead(httpStatusCodes.OK, plainTextContentType);
    res.end("POSTED");
});

// すべてのリクエストを router.js を通じて処理する
http.createServer(router.handle).listen(port);
console.log(`The server is listening on port number: ${port}`);

// const port = 3000,
//     http = require("http"),
//     httpStatus = require("http-status-codes"),
//     fs = require("fs");

// // URL を補完してファイルのパスにする
// const getViewUrl = (url) => {
//     return `views${url}.html`;
// }

// // エラー処理関数
// const sendErrorResponse = res => {
//     res.writeHead(httpStatus.NOT_FOUND, {
//         "Content-Type": "text/html"
//     });
//     res.write("<h1>File Not Found</h1>");
//     res.end();
// }

// http.createServer((req, res) => {
//     let url = req.url;  // リクエストの URL を保存

//     // URL にファイル拡張子が含まれているかチェック
//     if (url.indexOf(".html") !== -1) {
//         res.writeHead(httpStatus.OK, {
//             "Content-Type": "text/html"
//         });
//         customReadFile(`./views${url}`, res);
//     } else if (url.indexOf(".js") !== -1) {
//         res.writeHead(httpStatus.OK, {
//             "Conent-Type": "text/javascript"
//         });
//         customReadFile(`./public/js${url}`, res);
//     } else if (url.indexOf(".css") !== -1) {
//         res.writeHead(httpStatus.OK, {
//             "Content-Type": "text/css"
//         });
//         customReadFile(`./public/css${url}`, res);
//     } else if (url.indexOf(".png") !== -1) {
//         res.writeHead(httpStatus.OK, {
//             "Content-Type": "image/png"
//         });
//         customReadFile(`./public/images${url}`, res);
//     } else {
//         sendErrorResponse(res);
//     }
// })
// .listen(port);

// console.log(`The server has started and is listening on port number: ${port}`);

// // リクエストされた名前のファイルを探す
// const customReadFile = (file_path, res) => {
//     // ファイルが存在するか
//     if (fs.existsSync(file_path)) {
//         fs.readFile(file_path, (error, data) => {
//             if (error) {
//                 console.log(error);
//                 sendErrorResponse(res);
//                 return;
//             }
//             res.write(data);
//             res.end();
//         });
//     } else {
//         sendErrorResponse(res);
//     }
// }
