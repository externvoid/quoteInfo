// 2021年 4月25日 日曜日 00時08分14秒 JST
// 2021年 4月29日 木曜日 10時27分42秒 JST
chrome.storage.local.get(['Code'], injectElem)

function injectElem(e){
  code = e.Code;  // propagable function variable code
  body =  document.body
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
  makePopup()
}
function makePopup(){
  // making popup area
  let popup = document.createElement('div')
  popup.setAttribute('id', 'popup__box2')
  popup.style.color = "black"
  popup.style.left = "10px"
  popup.style.top = "0px"

  body.appendChild(popup)
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
    if( isBadNode(d) ) { continue }
    if(d.childElementCount == 0 && d.nodeName != 'script'){
      findTargetNode(d)
      console.log(d.innerText); // d.nodeType,d.nodeName
    }
    if(d.children){
       traverse(d.children);
    }
  }
}
function isBadNode(d){
  const badLists = ["SCRIPT", "NOSCRIPT", "IFRAME", "SVG"]
  if( badLists.includes( d.nodeName ) ) { console.log( "isBadNode", d.nodeName ) }
  return badLists.includes( d.nodeName )
}

function findTargetNode(node){ // targetNodes配列へpush
  let str = node.innerText
  if(str == undefined){ return } // Why?
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
  let res = str.match(/[1-9]\d{3,}/g)
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
    insertEventListenerIntoSpan(targetNodes[e])
  }
}

function insertEventListenerIntoSpan(det){
  let str = det.innerText
  let codes = getCodes(str)
  for(const e in codes) {
    let comment = makeComment(codes[e]) 
    let altStr = 
    `<span class='popup__btn' style='color: pink;' data-foo="${comment}">${codes[e]}</span>`
    str = str.replace(codes[e], altStr)
  }
  det.innerHTML = str
  addEvtListener(det)
//  addAttr(det)
}

function foo(e){
  let d = body.children.popup__box2
  d.style.visibility="visible"
  d.style.left = e.target.offsetLeft + "px"
  d.style.top = e.target.offsetTop + "px"
  d.innerHTML = e.target.dataset["foo"]
}

function bar(e){
  let d = body.children.popup__box2
  d.style.visibility="hidden"
}

function addEvtListener2(det){
  // 挿入したspan要素に属性を付与
  det.onmouseover = foo
  det.onmouseout= bar
}
function addEvtListener(det){
  // 挿入したspan要素に属性を付与
  let nodes = det.children
  for(let i=0; i<nodes.length; i++){
  // for popup btn
    nodes[i].onmouseover = foo
    nodes[i].onmouseout= bar
  }
}
// del OK!
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
      comment = e.name + "<br>" +'(' + e.code + ')' + "<br>" +
                e.categoly + "<br>" + e.feature
    }
  }
  return comment
}

