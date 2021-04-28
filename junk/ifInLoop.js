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

// for の中のifを取り除く？ breakがある時には無理か？
thread = 3
for(let i=0; i < 4; i++){
  if(thread == i){break}
  console.log(i)
}

for(let i=0; i < 4; i++){
  if(check(i)){break}
  console.log(i)
}

function check(i){
  if(thread == i){return true}
  return false
}
