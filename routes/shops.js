const express = require('express');
const router = express.Router();

const db = require('../models/index');

router.get('/', function(req, res, next){
  if(!req.session.key) res.redirect("/manage");
  res.render('shop', {title: "店舗登録"});
})

/* GET users listing. */
router.post('/', async function(req, res, next) {
  // TODO アクセスキーを持っているかチェック

  let result = await db.Shop.create({
    name: req.body.shop_name,
    phone_number: req.body.phone_number,
    postcode: req.body.postcode,
    prefecture: req.body.prefecture,
    city: req.body.city,
    section: req.body.section,
    address: req.body.building
  }).catch(err => next(err));

  result = await db.Group.update({shop_id: result.get("id")}, {where: {
    access_key: req.session.key 
  }}).catch(err =>{
    next(err)
  });

  res.json({});
});

module.exports = router;
