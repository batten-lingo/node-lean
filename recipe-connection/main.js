// cities パッケージをインポート
const cities = require("cities");

// zip_lookup メソッドを使い、結果を myCity に代入
var myCity = cities.zip_lookup("10016");

// 結果をコンソールに出力
console.log(myCity);
