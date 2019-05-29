var express = require('express');
var router = express.Router();

const db = require('../models/index');

/**
 * メニューの取得
 */
router.get('/', async function(req, res, next) {
  console.log('req.session.key: ', req.session.key);
  const group = await db.Group.findByAccessKey(req.session.key, {
    include: [
      { model: db.Shop,
        include:[
          {model: db.Menu}
        ]
      }
    ]
  }).catch(err => next(err));
  console.log('group: ', group);

  res.json({});
});

router.post('/', async function(req, res, next) {
  // TODO セッションのアクセスキーの存在
  
  const group = await db.Group.findByAccessKey(req.session.key).catch(err => next(err));

  await db.Menu.create({
    name: req.body.menu_name,
    price: req.body.price,
    shop_id: group.get("shop_id")
  })

  res.json({});
});

module.exports = router;
