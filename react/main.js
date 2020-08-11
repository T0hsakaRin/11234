import { ToyReact } from "./ToyReact";

class MyConponent {}

let a = (
	<div name="a" id="ida">
		<span style="color:red">a</span>
		<span>b</span>
		<span>c</span>
	</div>
);

//这儿a会被翻译为
// var a = ToyReact.createElement("div");

document.body.appendChild(a);

console.log("a is", a);

// var a = createElement(MyConponent, {
// 	name: "a",
// });

//以下为webpack打包之后的东西
// function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// // import { ToyReact } from "./ToyReact";
// var MyConponent = function MyConponent() {
//   _classCallCheck(this, MyConponent);
// };

// var a = ToyReact.createElement("div", {
//   name: "a",
//   id: "ida"
// }, ToyReact.createElement("span", {
//   style: "color:red"
// }, "a"), ToyReact.createElement("span", null, "b"), ToyReact.createElement("span", null, "c")); //è¿™å„¿aä¼šè¢«ç¿»è¯‘ä¸º
// // var a = ToyReact.createElement("div");

// document.body.appendChild(a);
// console.log("a is", a); // var a = createElement(MyConponent, {
// // 	name: "a",
// // });
