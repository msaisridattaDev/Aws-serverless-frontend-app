const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"), // ✅ Ensure it matches the deployment folder
    filename: "bundle.js",
    publicPath: "/" // ✅ Fix 404 issues on direct refresh
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"] // ✅ Ensure React preset is included
          }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"] // ✅ Fix missing styles
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ],
  devServer: {
    static: "./build", // ✅ Match with output folder
    port: 3000,
    historyApiFallback: true // ✅ Fix "Cannot GET /route" error on Render
  }
};
