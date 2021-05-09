const Point = function(){
  let width = 2
  this.x = 10 * width
  this.y = 20 * width
  this.getWidth = function(){
    return width
  }
  this.setWidth = function(arg){
    width = arg
  }
}
let popup = new Point()
// popup.width = 100
popup.setWidth(4)
console.log(popup) // Point { x: 20, y: 40, getWidth, setWidth}
console.log(Point.width) // => undefined, privateインスタンス変数
Point.width = 100 // Class変数
console.log(Point.width) // => 100
console.log(popup) // Point { x: 20, y: 40, getWidth, setWidth}

