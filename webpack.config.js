// webpack.config.js

// path : 파일의 경로를 다루고 변경하는 Node.js 기본 모듈
const path = require("path");

module.exports = {
  // entry : 번들링할 기본 js파일들 지정
  entry: ["./src/index.js", "./src/test.js"],

  // output : 번들 결과 출력위치 지정
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname + "/build"),
  },
  resolve: {
    fallback: { querystring: require.resolve("querystring-es3") },
  },
  mode: "none",
};

// Plug-In : build된 bundle 파일을 동적으로 특정 html 페이지에 추가,
//           build시 javascript, css, html 등의 파일 난독화, 압축 가능
