// 2021年 4月25日 日曜日 00時08分14秒 JST
// 2021年 4月29日 木曜日 10時27分42秒 JST
chrome.storage.local.get(['Code'], injectElem)

function injectElem(e){
  code = e.Code;  // propagable function variable code
  cnt = 9999
  targetNodes = []
  if (code == null){
    code = 'failure in loading from storage.local';
  }
  inject()
}

function inject(){
  console.log("in inject")
  console.log(code[0])
  // check whether traverse is necessary?
  if(hasAlreadyInjected()){return}
  let det = document.body.childNodes

  traverse(det)
  alter()
}

function hasAlreadyInjected(){
  let elms = document.getElementsByTagName('span')
  try{
    for(e in elms){
      if(elms[e].getAttribute('class') == 'popup__btn'){
        console.log('Already Injected!')
        return true
      }
      // else{ console.log(e, elms[e]) }
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
  addAttr(det)
}

function addAttr(det){
  // 挿入したspan要素に属性を付与
  let nodes = det.children
  for(let i=0; i<nodes.length; i++){
  // for popup btn
    nodes[i].setAttribute('class', 'popup__btn')
    nodes[i].setAttribute('style',
      `color: pink; position: relative; z-index: ${cnt};`)
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

