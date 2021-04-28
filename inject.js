// 2021年 4月25日 日曜日 00時08分14秒 JST
console.log("in the inject.js")

chrome.storage.local.get(['Code'], foo)

function foo(e){
  code = e.Code;  // propagable function variable code
  cnt = 9999
  comment = null
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
  if(has4digit(str) && hasCode(str)){
  // node.parentElement.insertBefore(makeHover(node), node.nextSibling)
  //  node.appendChild(makeHover(node))
  alterIntoHoverHTML(node); // node.innerHTML
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

function alterIntoHoverHTML(det){
  let str = det.innerText
  let matches = str.match(/[1-9]\d{3,}/)
  let res = find4Digit(matches)
  for(e in res) {
    altStr = `<span><span>${res[e]}</span><span>`
    str = str.replace(res[e], altStr)
  }
  det.innerHTML = str
  let nodes = det.childNodes
  for(let i=0; i<nodes.length; i++){
  // for popup btn
    nodes[i].setAttribute('class', 'popup__btn')
    nodes[i].setAttribute('style', `color: pink; position: relative;
                                    z-index: ${cnt};`)
  // making popup area
    nodes[i].firstChild.setAttribute('class', 'popup__box')
    nodes[i].firstChild.setAttribute('style', 'color: black;')
    cnt = cnt - 1
  }
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
