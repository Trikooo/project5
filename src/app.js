const Yaserver = require("../modules/Yaserver/Yaserver.js");
const { yasession } = require("../modules/session/yasession.js");
const { router } = require("./router/index.router.js");
const { clientPromise } = require("./config/dbConfig.js");
const auth = require("./auth/auth.js");
const app = new Yaserver();
app.useRouter(router);
app.get(
  "/",
  (req, res, next) => {
    req.session.data = ["macbook"];
    next();
  },
  (req, res) => {
    res.json({user: req.user, session: req.session})
  }
);
app.use(
  yasession({
    cookie: {
      maxAge: 100000,
      secretKey: "session_secret",
    },
    store: clientPromise(),
  })
);
app.use(auth.initialize());

app.get("/home", (req, res) => {
  res.json(req.session);
});

app.listen(3000, () => {
  console.log("running on port 3000....");
});
