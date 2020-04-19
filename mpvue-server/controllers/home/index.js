const {
  mysql
} = require("../../mysql");

module.exports = async (ctx) => {
  const banner = await mysql("nideshop_ad")
    .where({
      ad_position_id: 1,
    })
    .select();
  ctx.body = {
    banner: banner,
  };
};