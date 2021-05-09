// 2021年 5月 2日 日曜日 15時08分15秒 JST
// 関数内蔵オブジェクトを作る
// Immediately Invoked Function Expression
var foo = function(){
  var i = 0
  return {
    bar: {x: null, y: null},
    qau: function(j){
      i = j
      return this.bar
    },
    qaz: function(){
      i++
      return i
    }
  }
}() // こんな事する必要あるのか？ => fooの状態を保存する変数iを定義出来る。
// スコープ汚染を防ぐ。変数をvar宣言していればスコープ汚染は発生しないが、無宣言変数はその限り
// では無い。foo変数はグロバールスコープを持つが、しょうがない。
console.log(foo.i) // => undefined
console.log(foo.qau(3)) // => { x: null, y: null }
console.log(foo.qaz()) // => 4

foo.bar = {x: 10, y: 20}
console.log(foo.bar) // { x: 10, y: 20 }

console.log(foo.qau()) // { x: 10, y: 20 }

var kaz = {
      bar: {x: null, y: null},
      qau: function(){
        return this.bar
      }
    } // 名前空間付きインスタンス

kaz.bar = {x: 30, y: 40}
console.log(kaz.qau()) // { x: 30, y: 40 }

// kazとfooは何が違うのか？関数スコープを作ってるのがfoo?
const taro = {
  name: "taro",
  sayName: () => {
    console.log(`I am ${this.name}.`); // undefined, arrow function doesn't bind this.
  }
};
taro.sayName();

console.log(this); // window

const Human = function(name){
  this.name = name;
  this.sayName = () => { // arrow関数はthisを束縛しないのでは？
    console.log(this.name);
  };
}
const jiro = new Human("jiro");
jiro.sayName()
