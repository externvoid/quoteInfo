let code = null

window.onload = () => {
  console.log('onload')
  chrome.storage.local.get(['Code'], function(e){
    if (e.Code == null){
      document.getElementById('id_memo').value = 'failure in storage.local';
      return
    }
    code = e.Code
    document.getElementById('id_memo').value = JSON.stringify(e.Code[0]);
  })
  /*
  fetch('background.js') // (1) リクエスト送信
    .then(response => response.text()) // (2) レスポンスデータを取得
    .then(data => { // (3)レスポンスデータを処理
      document.writeln(data)
    })
    .catch((reason) => {
      console.log('fetch failure')
    });
  */
}

document.getElementById('id_save').onclick = () => {
  chrome.storage.local.set({ 'Code': code }, 
    function(){ console.log('saved to storage.local') }
  )
}

// web pageへscript injection
document.getElementById('id_execScript').onclick = () => {
  console.log("OK executeScript")
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      // function: foo
      files: ['inject.js']
    });
    chrome.scripting.insertCSS({
      target: {tabId: tabs[0].id},
      // function: foo
      files: ['inject.css']
    });
  });
}

function foo(){
  chrome.storage.local.get(['Code'], function(e){ 
    let code = e.Code 
    if (code == null){
      code = 'failure in loading from storage.local';
    }
    console.log(globalThis)
    console.log(document.body)
    console.log(code)
  });
}

document.getElementById('id_openfile').onchange = function(){
  let file = this.files[0];
  if (file == null) return;
  let reader = new FileReader;
  reader.onload = function(){
    let res = reader.result
    code = JSON.parse(res);
    document.getElementById('id_memo').value = res;
  }
  reader.readAsText(file);
}
