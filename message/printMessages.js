// ローカルモジュールの messages.js を要求する
const messageModule = require("./message");
// その配列を messageModule.messages として参照する
messageModule.messages.forEach(m => console.log(m));

