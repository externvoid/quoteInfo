// var, letのscope
function foo(){
  str = 1
  bar()
}

function bar(){
  console.log(str) // => 1
}
foo()

function foo2(){
  let str2 = 2
  bar2()
}

function bar2(){
  console.log(str2) // => undefined
}
foo2()

function foo3(){
  var str3 = 3
  bar3()
}

function bar3(){
  console.log(str3) // => undefined
}
foo3()
// chrome.storage.local.get('Code', foo2)
//
// function foo2(){
//   str = 1
//   bar2()
// }
//
// function bar2(){
//   console.log(str) // => undefined
// }
