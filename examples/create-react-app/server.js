const { createProxyMiddleware } = require("http-proxy-middleware");
const session = require("express-session");
const app = require("./app");
const envoyAuth = require("@envoy/express-envoy-auth")(app);

const { ENVOY_SECRET, ENVOY_CLIENT_ID } = process.env;

app.use(
  session({
    secret: ENVOY_SECRET,
    saveUninitialized: true,
    resave: true,
  })
);

app.use(
  envoyAuth({
    clientID: ENVOY_CLIENT_ID,
    secret: ENVOY_SECRET,
    scopes: ["public"],
    afterAuth(req, res) {
      const { accessToken } = req.session;
      const { user } = req;
      console.log("Logged in", { accessToken, user });
      res.redirect("/");
    },
  })
);

app.get("/about", function (req, res) {
  res.send("the about page");
});

app.use(
  createProxyMiddleware({
    target: "http://localhost:4301",
    changeOrigin: true,
  })
);

app.listen(4300);
