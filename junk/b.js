function foo() {
  return true // return keyword is neccesary? => yes
}
console.log(foo())
// 値渡し
function bar(str){
  str = "OK"
}
str = null
bar(str)
console.log(str) // => null
// Objectは参照渡し
function kaz(obj){
  obj.prop = "OK"
}
obj = {prop: null}
kaz(obj)
console.log(obj) // => { prop: 'OK' }


// str2 = "OK"
function qau() {
  var str2 = "NG"
  qaz()
}
// console.log(str2) // runtime error, str2 undefined
function qaz() {
 console.log(str2)
}
qau() // => NG
console.log(qau.str2)
