function foo(){
  obj = {cnt: 1}
  cnt = 1
  bar()
  console.log(obj)
  console.log(cnt)
}
function bar(){
  obj.cnt += 1
  cnt += 1
  qaz()
  qaz()
}

function qaz(){
  obj.cnt += 1
  cnt += 1
}
foo()
