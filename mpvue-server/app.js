const Koa = require("koa");
const config = require("./config");
const app = new Koa();

const router = require('./routes/index');

app.use(router.routes());
app.listen(config.port, () => {
  console.log(`http://localhost:${config.port}`);
});