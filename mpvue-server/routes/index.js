const router = require("koa-router")({
  prefix: "/web/api",
});
// const router = new Router();
const controller = require("../controllers");
// 首页接口
router.get("/index", controller.home.index);
// 搜索页接口
router.get("/search/indexaction", controller.search.index.indexAction);
router.post(
  "/search/addhistoryaction",
  controller.search.index.addHistoryAction
);
router.post(
  "/search/clearhistoryAction",
  controller.search.index.clearHistoryAction
);
router.get("/search/helperaction", controller.search.index.helperAction);

module.exports = router;
