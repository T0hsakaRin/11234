export let ToyReact = {
	createElement(type, attributes, ...children) {
		let element = document.createElement(type);

		for (const name in attributes) {
			element.setAttribute(name, attributes[name]);
		}
		for (const child of children) {
			if (typeof child === "string") child = document.createTextNode(child);

			element.appendChild(child);
		}
		console.log("element", element);

		// debugger;
		return element;
	},
	render(vdom, element) {
		vdom.mountTo(element);
	},
};
