const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.jsx?$/,  // ✅ Supports both .js and .jsx
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"] // ✅ Ensure React JSX is transpiled
          }
        }
      },
      {
        test: /\.css$/,  // ✅ Supports CSS files
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"],  // ✅ Allows importing .js and .jsx without extension
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ],
  devServer: {
    static: "./dist",
    port: 3000
  }
};
