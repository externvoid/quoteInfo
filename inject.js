// 2021年 4月25日 日曜日 00時08分14秒 JST
console.log("in the inject.js")

chrome.storage.local.get(['Code'], foo)

function foo(e){
  code = e.Code;  // propagable function variable code
  if (code == null){
    code = 'failure in loading from storage.local';
  }
  inject()
}

function inject(){
  console.log("in inject")
  console.log(code[0])
  let det = document.body.childNodes
  traverse(det)
}

function traverse(nodes){
  var len = nodes.length;
  var d = null;
  for(var i=0; i<len; i++){
    d = nodes[i];
    if(d.childElementCount == 0 && d.nodeName != 'SCRIPT'){
      addHover(d)
      console.log(d.innerText); // d.nodeType,d.nodeName
    }
    if(d.children){
       traverse(d.children);
    }
  }
}

function addHover(node){
  let str = node.innerText
  comment = null
  if(has4digit(str) && hasCode(str)){
  // if(/[1-9]\d{3}/.test(str) && hasCode(str)){
  // node.parentElement.insertBefore(makeHover(node), node.nextSibling)
    node.appendChild(makeHover(node))
  }
}

function has4digit(str){
  return (/[1-9]\d{3}/.test(str) && str.match(/[1-9]\d{3,}/)[0].length == 4)
}

function hasCode(str){
  let ticker = str.match(/[1-9]\d{3}/)[0]
  for(const e of code){ if( ticker == e.code){ 
    comment = e.name + "<br>" + e.categoly + "<br>" + e.feature
    return true } }
  return false
}

function makeHover(det) {
  // for popup btn
  det.setAttribute('class', 'popup__btn')
  det.setAttribute('style', 'color: pink; position: relative; z-index: 1;')
  // making popup area
  let div = document.createElement('div')
  div.setAttribute('class', 'popup__box')
  div.setAttribute('style', 'color: black;')

  let p = document.createElement('p')
  p.innerHTML = comment
  div.appendChild(p)
  return div
}
function getUniqueStr(myStrong){
  var strong = 1000;
  if (myStrong) strong = myStrong;
  return new Date().getTime().toString(16)  + Math.floor(strong*Math.random()).toString(16)
}
// [JavaScriptでユニークな文字列をさくっと生成する - Qiita](https://qiita.com/coa00/items/679b0b5c7c468698d53f)
