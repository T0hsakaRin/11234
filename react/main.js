import { createElement, Component, render } from "./ToyReact";

class MyConponent extends Component {
	render() {
		return (
			<div>
				<h1>MyConponent</h1>

				{/* {this.children} */}
			</div>
		);
	}
}

render(
	<MyConponent id="a" class="c">
		<div>abc</div>
	</MyConponent>,
	document.body
);
