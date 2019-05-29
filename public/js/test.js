document.addEventListener("DOMContentLoaded", (event) => {
  const doRegistShop = document.getElementsByName("doRegistShop")[0];
  const doRegistGroup = document.getElementsByName("doRegistGroup")[0];
  const doHostLogin = document.getElementsByName("doHostLogin")[0];
  const doJoinGroup = document.getElementsByName("doJoinGroup")[0];
  const doCreateMenu = document.getElementsByName("doCreateMenu")[0];

  // 店舗登録
  if(doRegistShop){
    doRegistShop.addEventListener("click", (e) => {
      e.preventDefault();
      const registShopForm = document.getElementsByName("registShopForm")[0];
      const data = {};
      registShopForm.childNodes.forEach(v => {
        if(v.tagName !== "INPUT") return false;
        data[v.name] = v.value;
      });
  
      fetch("/shop", {
        method: "POST",
        headers:{ 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(res => {
        console.log('res: ', res);
      });
  
      return false;
  
    });
  }
  
  // グループ作成
  if(doRegistGroup){
    doRegistGroup.addEventListener("click", (e) => {
      e.preventDefault();
  
      const registShopForm = document.getElementsByName("registGroupForm")[0];
  
      const data = {};
      registShopForm.childNodes.forEach(v => {
        if(v.tagName !== "INPUT") return false;
        data[v.name] = v.value;
      });
  
      fetch("/group/create", {
        method: "POST",
        headers:{ 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(res => {
        res.json().then(v => {
          console.log('v: ', v);

          // HTMLの書き換え
          const t = document.getElementById("registGroupSection");
          t.innerHTML = `
            <a href="/manage">こちらからアクセス</a><br />
            <p>パスコード ${v.passcode}</p>`;
        })
        
      });
  
      return false;
  
    }, false);
  }
  
  // ホストログイン
  if(doHostLogin){
    doHostLogin.addEventListener("click", (e) => {
      e.preventDefault();
  
      const registShopForm = document.getElementsByName("hostLoginForm")[0];
  
      const data = {};
      registShopForm.childNodes.forEach(v => {
        if(v.tagName !== "INPUT") return false;
        data[v.name] = v.value;
      });
  
      fetch("/manage", {
        method: "POST",
        headers:{ 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(res => {
        res.json().then(v => {
          location.reload();
        })
      });
  
      return false;
  
    }, false);
  }

  // グループへの参加
  if(doJoinGroup){
    doJoinGroup.addEventListener("click", (e) => {
      e.preventDefault();
  
      const joinGroupFrom = document.getElementsByName("joinGroupFrom")[0];
  
      const data = {};
      joinGroupFrom.childNodes.forEach(v => {
        if(v.tagName !== "INPUT") return false;
        data[v.name] = v.value;
      });

      data.access_key = getUrlParam().access_key;
  
      fetch("/group/join", {
        method: "POST",
        headers:{ 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(res => {
        if(res.ok) location.href = "/group";
      });
  
      return false;
  
    }, false);
  }

  // メニュー作成
  if(doCreateMenu){
    // メニューの取得
    fetch("/menu")
    .then(res => {
      res.json().then(v => {
        console.log('v: ', v);
      })
    })

    doCreateMenu.addEventListener("click", (e) => {
      e.preventDefault();
  
      const createMenuFrom = document.getElementsByName("createMenuFrom")[0];
  
      const data = {};
      createMenuFrom.childNodes.forEach(v => {
        if(v.tagName !== "INPUT") return false;
        data[v.name] = v.value;
      });
  
      fetch("/menu", {
        method: "POST",
        headers:{ 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(res => {
        // if(res.ok) location.href = "/group";
      });
  
      return false;
  
    }, false);
  }
});

function getUrlParam(){
  const jsonObj = {};
  const pair = location.search.substring(1).split('&');
  for(var i=0;pair[i];i++) {
  var kv = pair[i].split('=');
    jsonObj[kv[0]] = decodeURI(kv[1]) || "";
  }
  return jsonObj;
}