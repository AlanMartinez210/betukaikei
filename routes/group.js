const express = require('express');
const router = express.Router();
const cryptoJS = require("crypto");
const dateHelper = require('../helper/dateHelper');
const passcode_env = require(__dirname + '/../config/env.json')["PASSCODE_CONFIG"];
const expiration_num = require(__dirname + '/../config/env.json')["EXPIRATION_NUM"];

const db = require('../models/index');

/**
 * セッションを取得したユーザーにグループ画面を表示します。
 */
router.get('/', async function(req, res, next){
  if(!req.session.key) return res.render('index', { title: '別会計' });
  
  const group = await db.Group.findByAccessKey(req.session.key).catch(err => next(err));

  // TODO 注文情報を取得

  res.render('group', {
    title: 'グループ', 
    user_name: req.session.user_name,
    group_data: {
      title: group.get("title"),
      host_name: group.get("host_name"),
      description: group.get("description") || ""
    }
  });
})

/**
 * グループ作成画面を表示します。
 */
router.get('/create', function(req, res, next){
  res.render('group', {title: "グループ作成", isCreate: true});
});

/**
 * グループ参加画面を表示します。
 */
router.get('/join', async function(req, res, next){
  if(!req.query.access_key) return res.render('index', { title: '別会計' });

  // res.render('group', {title: "グループへの参加", isJoin: true});
  
  const group = await db.Group.findByAccessKey(req.query.access_key).catch(err => next(err));
  // パスワードが指定されていなければグループ内容を表示

  res.render('group', {
    title: "グループへの参加", 
    requirePassword: group.get("password") ? true : false,
    group_data: {
      title: group.get("title"),
      host_name: group.get("host_name"),
      description: group.get("description") || ""
    },
    isJoin: true
  });
})

/**
 * グループを作成します。
 */
router.post('/create', function(req, res, next) {

  // ランダム文字列の生成
  var result = "";
  for(let i=0, n=passcode_env["NUM"], str=passcode_env["BASE"];i < n;i++){
    result += str.charAt(Math.floor(Math.random() * str.length));
  }

  // ハッシュの作成
  const access_key = cryptoJS.createHash('md5')
  .update(req.body.host_name + result)
  .digest('hex');

  // 有効期限の作成
  const expiration_date = dateHelper.getDate().add(expiration_num, "d");

  db.Group.create({
    title: req.body.group_title,
    host_name: req.body.host_name,
    access_key: access_key,
    password: req.body.password,
    description: req.body.description,
    expiration_date: expiration_date
  }).then(() => {
    res.json({
      passcode: result,
      access_key: access_key
    });
  }).catch(err => {
    next(err);
  });
});

/**
 * グループに参加します。
 */
router.post('/join', async function(req, res, next){
  if(!req.body.access_key) return res.render('index', { title: '別会計' });
  console.log('req.body.access_key: ', req.body.access_key);

  // const group = await db.Group.findByAccessKey(req.body.access_key).catch(err => next(err));
  // TODO アクセスキーの存在＆有効確認
  // パスワードの確認

  // セッションに登録
  req.session.key = req.body.access_key;
  req.session.user_name = req.body.user_name;
  res.json({});
})

module.exports = router;
