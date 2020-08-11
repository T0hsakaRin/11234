// function DOG(name){
//   console.log('this',this);
//   //this表示新创建的实例对象
//   this.name = name
//   this.species = "犬科"
// }
// DOG.prototype.color = "red"

// var dogA = new DOG("dog1")
// var dogB = new DOG("dog2")

// console.log('dogA',dogA);
// console.log('dogB',dogB);

// dogA.species="猫科"

// console.log('dogA',dogA);
// console.log('dogB',dogB);
// console.log('dogB.color',dogB.color,dogB.hasOwnProperty('color'));
// dogB.color = "yellow"
// console.log('dogB.color',dogB.color,dogB.hasOwnProperty('color'));
// console.log('dogA.color',dogA.color,dogA.hasOwnProperty('color'));
// DOG.prototype.color = "green"
// console.log('dogA',dogA.color);
// console.log('dogB',dogB.color);

//使用构造函数生成实例时,构造函数上的属性都会被实例继承且重新生成一份,造成了性能上
//的浪费,为了解决这个问题 ,引入了prototype这个对象,prototype对象上的属性,被所有
//实例继承且共享

// 封装
//生成实例对象的原始模式
// var Cat ={
//   name:"",
//   color:""
// }

//根据以上的原型对象的规格,生成实例对象
// var cat1 = {}
// cat1.name ="大毛"
// cat1.color="yellow"

//多写的话非常麻烦,实例与原型之间没有联系

//原型模式改进
// function Cat(name,color){
//   return {
//     name:name,
//     color:color
//   }
// }

// cat1 = Cat("damao","yellow")
// cat2 = Cat("ermao","black")

//直接调用函数,多谢很快,但是cat1和cat2之间看不出联系

//为了解决从原型对象生成实例的问题,js提供了一个构造函数(contrustor)模式
//内部使用this变量,对构造函数使用new运算符,就可以生成实例,且this变量会绑定在实例对象上
// function Cat (name,color){
//   this.name = name
//   this.color = color
// }

// var cat1 = new Cat("damao",'black')
// var cat2 = new Cat("ermao",'yellow')

//实例会自动拥有属性constructor,指向他们的构造函数

// console.log('cat1',cat1.constructor === Cat);
// console.log('cat2',cat2.constructor === Cat);

//instanceof,验证该实例是否来自该构造函数

// console.log('cat1 ',cat1 instanceof Cat);
//构造函数的问题是每个实例都会为他的属性开辟一块新的内存,且实例的属性之间互相独立,造成了内存的浪费

//为了解决这个问题,引入了prototype,js中,每个构造函数都拥有一个prototype属性,指向另外一个对象
//这个对象被所有构造函数的实例继承
//可以把公用的属性和方法  放在prototype上面

// function Cat(name, color) {
// 	this.name = name;
// 	this.color = color;
// }

// Cat.prototype.type = "maoke";
// Cat.prototype.eat = function(){
//   console.log('eat');
// }
// Cat.prototype.eat = function () {
// 	console.log("吃老鼠");
// };
// var cat1 = new Cat("damao", "red");
// var cat2 = new Cat("ermao", "yellow");

// console.log("cat1", cat1.type);
// cat1.eat();
//注意一点是 实例属性可以覆盖prototype内的属性

//prototype验证
//原型.prototype.isPrototypeOf(实例)
// console.log("proof", Cat.prototype.isPrototypeOf(cat1));

//hasOwnProperty() 实例hasOwnProperty(原型方法)
// console.log("hasOwnProperty", cat1.hasOwnProperty("type"));

//in运算符  判断实例是否有某个属性,不管是不是本地属性 原型上的属性也会查找出来
// console.log("in", "type" in cat1, "color" in cat1);
// for (val in cat1) {
// 	console.log("val", val);
// }
// var arr = [1, 2, 3];
// for (val of arr) {
// 	console.log("val", val);
// }

//构造函数的继承

//对象之间的继承，

// function Animal() {
// 	this.species = "dongwu";
// }
// function Cat(name, color) {
// 	this.name = name;
// 	this.color = color;
// }
//要使cat继承animal

//1 可以将父对象的构造函数绑定在子对象上
// function Cat(name, color) {
// 	console.log(this, arguments, this.constructor === Cat);
// 	that = this;

// 	Animal.apply(this, arguments);
// 	this.name = name;
// 	this.color = color;
// }

// var cat1 = new Cat("damao", "yellow");

// console.log(cat1.species);
// console.log(cat1.constructor === Cat);
// console.log(that === cat1);

//构造函数中this指向新实例对象，将animal构造函数的this绑定到新生产的实例对象，可以使新生成的实例对象拥有animal构造函数的属性

//2 prototype模式
//完全删除cat的原型对象的值并赋予新值
// Cat.prototype = new Animal();
//此时Cat的原型对象指向animal的一个实例，
//所以Cat.prototype.constructor 此时是Animal
//console.log("Cat.prototype.constructor ", Cat.prototype.constructor);
// Cat.prototype.constructor = Cat;
// var cat1 = new Cat("damao", "yellow");
// console.log(cat1.species);
//这儿注意一点，实例的constructor属性默认调用的是构造函数的原型对象的constructor属性，即指回构造函数，实例没有prototype属性
//cat1.constructor  === Cat.prototype.constructor === Cat
//在Cat.prototype = new Animal()后，cat1的构造函数指向的事Cat的原型的构造函数，即Animal
//所以需要手动纠正Cat实例的构造函数，使其指回Cat
//如果在编程中改了某个实例的prototype对象，下一步应该是将实例的prototype的constructor指回原来的构造函数

//3 直接继承prototype
//将Cat跳过Animal，直接继承Animal.prototype
function Animal() {}
Animal.prototype.species = "dongwu";
function Cat(name, color) {
	this.name = name;
	this.color = color;
}
Cat.prototype = Animal.prototype;
Cat.prototype.constructor = Cat; //这一句，将animal的原型的constructor属性 也指向了Cat

var cat1 = new Cat("damao", "yellow");

console.log(cat1.constructor);
Cat.prototype.test = "test";
console.log(Cat.prototype, Animal.prototype);
console.log(Animal.prototype, Animal.prototype.constructor);

//这种写法是效率高，不用新建animal的实例可以省内存，缺点是现在Cat和Animal的原型都指向同一个值

//4 利用空对象作为中介
