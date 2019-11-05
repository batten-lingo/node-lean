"use strict";

const httpStatus = require("http-status-codes"),
    htmlContentType = {
        "Content-Type": "text/html"
    },

// POST と GET のリクエストに対応する経路を格納する routes オブジェクトを定義
routes = {
    "GET": {
        "/info": (req, res) => {
            res.writeHead(httpStatus.OK, {
                "Content-Type": "text/prain"
            })
            res.end("Welcome to the Info Page!")
        }
    },
    "POST": {}
};

// 経路のコールバック関数を処理する
exports.handle = (req, res) => {
    try {
        if (routes[req.method][req.url]) {
            routes[req.method][req.url](req, res);
        } else {
            res.writeHead(httpStatus.NOT_FOUND, htmlContentType);
            res.end("<h1>No such file exists</h1>");
        }
    } catch(ex) {
        console.log("error: " + ex);
    }
};

// main.js から経路を登録する POST, GET 関数
exports.get = (url, action) => {
    routes["GET"][url] = action;
};

exports.post = (url, action) => {
    routes["POST"][url] = action;
};
