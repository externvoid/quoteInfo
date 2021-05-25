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

  traverse(body)
  alter() // append span elem.
  makePopup() // see directly below
  console.log('targetNodes.length =', targetNodes.length)
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
//
function traverse(dom){
  for(let d of dom.childNodes){
    if( isBadNode(d) ) { continue }
    if(d.childNodes.length == 0){
      // console.info(d.nodeName)	
      // console.info(d.textContent)	
      findTargetNode(d)
      continue    
    }
    traverse(d)
  }
}

function isBadNode(d){
  const badLists = ["SCRIPT", "NOSCRIPT", "IFRAME", "SVG", "BR"]
  if( badLists.includes( d.nodeName ) ) { console.log( "isBadNode", d.nodeName ) }
  return badLists.includes( d.nodeName )
}

function findTargetNode(node){ // targetNodes配列へpush
  // let str = node.innerText
  let str = node.textContent
  if(str == undefined){ return } // Why?
  if(getCodes(str).length != 0){ // Array of codes
    // ここでnode.parentNode == nullテスト？
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
  for(let e of targetNodes){
    if(e.nodeType == Node.ELEMENT_NODE){
      insertEventListenerIntoSpan(e)
    }else if(e.nodeType == Node.TEXT_NODE){
      insertEventListenerIntoTEXT(e)
    }else{
      return
    }
  }
}

function insertEventListenerIntoTEXT(det){
  if(det.parentNode == null) {return} // Why?
  let str = det.textContent
  const codes = getCodes(str)
  for(const e in codes) {
    let comment = makeComment(codes[e]) 
    let altStr = 
    `<span class='popup__btn' style='color: pink;' data-foo="${comment}">${codes[e]}</span>`
    str = str.replace(codes[e], altStr)
  }

  const sib = document.createElement('span') // newChild
  sib.innerHTML = str
  det.parentNode.replaceChild(sib, det)
  addEvtListener(sib) // whether det or sib?
}
// del_OK
function insertEventListenerIntoSpan(det){
  let str = det.textContent
  // let str = det.innerText
  const codes = getCodes(str)
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
  let domRect = e.target.getBoundingClientRect()
  d.style.left = domRect.x + 15 + "px"
  d.style.top  = domRect.y + 15 + "px"
  // d.style.left = e.target.offsetLeft + "px"
  // d.style.top = e.target.offsetTop + "px"
  d.innerHTML = e.target.dataset["foo"]
}

function bar(e){
  let d = body.children.popup__box2
  d.style.visibility="hidden"
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

