const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.get("/about", function (req, res) {
  res.send("the about page");
});

app.use(
  "/",
  createProxyMiddleware({
    target: "http://localhost:3000",
    changeOrigin: true,
  })
);
app.listen(4300);
