// 2021年 4月25日 日曜日 00時08分14秒 JST
console.log("in the inject.js")

chrome.storage.local.get(['Code'], foo)

function foo(e){
  code = e.Code;  // propagable function variable code
  cnt = 9999
  // comment = null
  targetNodes = []
  if (code == null){
    code = 'failure in loading from storage.local';
  }
  inject()
}

function inject(){
  console.log("in inject")
  console.log(code[0])
  let det = document.body.childNodes
  // check whether traverse is necessary?
  if(hasAlreadyInjected()){return}
  traverse(det)
  alter()
}

function hasAlreadyInjected(){
  let divs = document.getElementsByTagName('div')
  try{
    for(e in divs){
      if(divs[e].getAttribute('class') == 'popup__btn'){
        console.log('Already Injected!')
        return true
      }
      // else{ console.log(e, divs[e]) }
    }
  }catch(err){
    // console.log(err)
  }
  return false
}

function traverse(nodes){
  var len = nodes.length;
  var d = null;
  for(var i=0; i<len; i++){
    d = nodes[i];
    if(d.childElementCount == 0 && d.nodeName != 'SCRIPT'){
      findTargetNode(d)
      console.log(d.innerText); // d.nodeType,d.nodeName
    }
    if(d.children){
       traverse(d.children);
    }
  }
}

function findTargetNode(node){ // targetNodes配列へpush
  let str = node.innerText
  if(getCodes(str).length != 0){ // Array of codes
    targetNodes.push(node)
  }
}

function getCodes(str){
  let ar = fourDigits(str)
  if(ar.length == 0){ return [] }
  return ar.filter( e => isCode(e) )
}

function fourDigits(str){
  res = str.match(/[1-9]\d{3,}/g)
  if(!res){ return [] }
  return res.filter(e => e.length == 4)
}

function isCode(arg){ // arg: 4桁数字
  for(const e of code){
    if( arg == e.code){ return true } 
  }
  return false
}

function alter(){
   for(let e in targetNodes){
     insertIntoHoverHTML(targetNodes[e])
   }
}

function insertIntoHoverHTML(det){
  let str = det.innerText
  let codes = getCodes(str)
  for(const e in codes) {
    let comment = makeComment(codes[e]) 
    let altStr = `<span>${codes[e]}<span>${comment}</span></span>`
    str = str.replace(codes[e], altStr)
  }
  det.innerHTML = str
  // 挿入したspan要素に属性を付与
  let nodes = det.children
  for(let i=0; i<nodes.length; i++){
  // for popup btn
    nodes[i].setAttribute('class', 'popup__btn')
    nodes[i].setAttribute('style', `color: pink; position: relative;
                                    z-index: ${cnt};`)
  // making popup area
    nodes[i].children[0].setAttribute('class', 'popup__box')
    nodes[i].children[0].setAttribute('style', 'color: black;')
    cnt = cnt - 1
  }
}

function makeComment(ticker){
  let comment = ''
  for(const e of code){
    if( ticker == e.code){ 
      comment = e.name + "<br>" + e.categoly + "<br>" + e.feature
    }
  }
  return comment
}

function find4Digit(matches){
  return  matches.filter(e => e.length == 4)
}

function makeHover(det) {
  // for popup btn
  det.setAttribute('class', 'popup__btn')
  det.setAttribute('style', `color: pink; position: relative;
                             z-index: ${cnt};`)
  cnt = cnt - 1
  // making popup area
  let div = document.createElement('div')
  div.setAttribute('class', 'popup__box')
  div.setAttribute('style', 'color: black;')

  let p = document.createElement('p')
  p.innerHTML = comment
  div.appendChild(p)
  return div
}
// unused
function makeHover2(det) {
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
// unused
function getUniqueStr(myStrong){
  var strong = 1000;
  if (myStrong) strong = myStrong;
  return new Date().getTime().toString(16)  + Math.floor(strong*Math.random()).toString(16)
}
// [JavaScriptでユニークな文字列をさくっと生成する - Qiita](https://qiita.com/coa00/items/679b0b5c7c468698d53f)
