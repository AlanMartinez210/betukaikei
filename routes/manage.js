const express = require('express');
const router = express.Router();
const cryptoJS = require("crypto");
const dateHelper = require('../helper/dateHelper');

const db = require('../models/index');

router.get('/', async function(req, res, next){

  const res_obj = {title: "ホストログイン", isLogin: false, shop_data: null};

  if(!req.session.key) return res.render('manage', res_obj);
  
  const group = await db.Group.findByAccessKey(req.session.key).catch(err => next(err));
  
  res_obj.title = "管理情報";
  res_obj.isLogin = true;
  res_obj.expiration_date = group.get("expiration_date");
  res_obj.access_key = req.session.key;
  
  if(!group.get("shopId")) return res.render('manage', res_obj);

  const shop = await group.getShop().catch(err => next(err));

  res_obj.shop_data = {
    name: shop.get("name"),
    phone_number: shop.get("phone_number")
  }

  res.render('manage', res_obj);
})

/* GET users listing. */
router.post('/', function(req, res, next) {

  // ハッシュの作成
  const access_key = cryptoJS.createHash('md5')
  .update(req.body.host_name + req.body.passcode)
  .digest('hex');

  // グループ情報の取得
  db.Group.findByAccessKey(access_key)
  .then(instance => {
    if(!instance) return res.status(400).send("access_key is bad");
    if(access_key !== instance.get("access_key")) return res.status(400).send("passcode is bad");

    // セッション情報の格納
    req.session.key = access_key;
    res.json({});
  })
});

module.exports = router;
