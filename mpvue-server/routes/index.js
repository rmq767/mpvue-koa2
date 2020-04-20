const router = require("koa-router")({
  prefix: "/web/api",
});
// const router = new Router();
const controller = require("../controllers");

router.get("/index", controller.home.index);

module.exports = router;