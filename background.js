console.log('in the background.js')
// chrome.storage.local.get(['Code'], (e) => console.log(e.Code[0]))
// TypeError: Cannot read property '0' of undefined
// 初回install時、storage.localは消える<=削除、...
// 再読込されました。 reason = 'update'

// chrome.runtime.onInstalled.addListener(r => foo)
// ファイルorURLよりjson読込、storage.localへ
// default_popupとコンフリクト
// chrome.action.onClicked.addListener(tab =>bar)
// スクリプト起動
chrome.runtime.onInstalled.addListener(foo)
async function foo(reason){
  console.log('onInstalled reason =', reason.reason)
  let code
  let isFailed = false
  await fetch('https://www.eonet.ne.jp/~stocks/code.json')// (1) リクエスト送信
  // fetch('asset/code.json') // (1) リクエスト送信
    .then(response => response.text()) // (2) レスポンスデータを取得
    .then(data => { // (3)レスポンスデータを処理
      // console.log(data)
      code = JSON.parse(data);
      console.log(code[0]?.name ?? 'code is undefined')
    })
    .then((res) => {
      chrome.storage.local.set({ 'Code': code }, 
        function(){ console.log('saved to storage.local') 
        }
      )
    })
    .catch((reason) => {
      isFailed = true
      console.log('fetch failure, code.json retrieving')
    });
  // fetch失敗時にload file
  if(isFailed == true){
  await fetch('asset/code.json') // (1) リクエスト送信
    .then(response => response.text()) // (2) レスポンスデータを取得
    .then(data => { // (3)レスポンスデータを処理
      console.log('from local file')
      code = JSON.parse(data);
      console.log(code[0]?.name ?? 'code is undefined')
    })
    .then((res) => {
      chrome.storage.local.set({ 'Code': code }, 
        function(){ console.log('saved to storage.local') 
        }
      )
    })
    .catch((reason) => {
      isFailed = true
      console.log('load failure, code.json retrieving')
    });
  }

  isFailed = false

// local storageを確認
  if (reason.reason == chrome.runtime.OnInstalledReason.INSTALL ||
      reason.reason == chrome.runtime.OnInstalledReason.UPDATE) {
    console.log('onInstalled')
    chrome.storage.local.get(['Code'], (e) => console.log(e?.Code[0]))
  }
}
// 
// web pageへscript injection
chrome.action.onClicked.addListener(bar)
function bar(tab){
  console.warn('sw onClicked=', tab)
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ['inject.js']
    })
    // })
    // (res) => { 
    //   console.log('res.result=', res[0].result)
    //   console.log('res', res)
    // }
  chrome.action.setBadgeBackgroundColor({color: [0, 0, 255, 125]})
  chrome.action.setBadgeText({text: "999"})

  chrome.scripting.insertCSS({
    target: {tabId: tab.id},
    files: ['inject.css']
  })

}
