class Point {
  constructor(x, y){
    this.x = x
    this.y = y
  }
  print() {
    console.log(this)
    console.log(Point.width)
  }
}

const popup = new Point(10, 20)
console.log(popup) // => Point { x: 10, y: 20 }
console.log(popup.x, popup.y) // => 10 20
// static variable
Point.width = 100
popup.print() // => Point { x: 10, y: 20 }, 100

