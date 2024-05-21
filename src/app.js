const Yaserver = require("../Yaserver/Yaserver.js");
const { yasession } = require("../session/yasession.js");

const app = new Yaserver();

app.get("/", (req, res) => {
  res.json({ msg: "hello world" });
});
app.use(
  yasession({
    cookie: { 
        maxAge: 30000,   
        secretKey: "session_secret",
     },
  })
);

app.get("/home", (req, res)=>{
    res.json(req.cookies.signedCookies)
})

app.listen(3000, () => {
  console.log("running on port 3000....");
});
