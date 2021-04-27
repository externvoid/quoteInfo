str = "水産品の貿易、加工、買い付け主力。すしネタに強み。加工食品は業務用が軸。海外加工比率高い"
function insertLF(str){
  conv = ""
  for(e in str){
    conv = conv + str[e]
    let f = (e-0) + 1
    // console.log(f)
    if (f % 12 == 0){ conv += '\n' }
  }
  return conv
}
console.log(str)
console.log('----------------------')
console.log(insertLF(str))
