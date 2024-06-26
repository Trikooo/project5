const Yaserver = require("../modules/Yaserver/Yaserver.js");
const { yasession } = require("../modules/session/yasession.js");
const { router } = require("./router/index.router.js");
const { clientPromise } = require("./config/dbConfig.js");

const app = new Yaserver();
app.useRouter(router);
app.get("/", (req, res) => {
  res.render("home.html");
});

app.use(
  yasession({
    cookie: {
      maxAge: 30000,
      secretKey: "session_secret",
    },
    store: clientPromise(),
  })
);

app.get("/home", (req, res) => {
  res.json(req.session);
});

app.listen(3000, () => {
  console.log("running on port 3000....");
});
