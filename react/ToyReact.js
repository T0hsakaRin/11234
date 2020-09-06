class ElementWrapper {
	constructor(type) {
		this.root = document.createElement(type);
	}
	setAttribute(name, value) {
		this.root.setAttribute(name, value);
	}
	appendChild(component) {
		console.log("component", component);

		this.root.appendChild(component.root);
	}
}

class TextWrapper {
	constructor(content) {
		console.log("content", content);

		this.root = document.createTextNode(content);
	}
}

export class Component {
	constructor(content) {
		this.props = Object.create(null);
		this.children = [];
		this._root = null;
	}
	setAttribute(name, value) {
		this.props[name] = value;
	}
	appendChild(component) {
		this.children.push(component);
	}
	get root() {
		if (!this._root) {
			this._root = this.render().root;
		}
		return this._root;
	}
}

export function createElement(type, attributes, ...children) {
	console.log("type", type);
	console.log("children", children);

	let e;
	if (typeof type === "string") {
		e = new ElementWrapper(type);
	} else {
		e = new type();
	}
	for (let p in attributes) {
		e.setAttribute(p, attributes[p]);
	}
	let insertChildred = (children) => {
		for (let child in children) {
			if (typeof child === "string") {
				console.log("child", child);

				child = new TextWrapper(child);
			}
			if (typeof child === "object" && child instanceof Array) {
				insertChildred(child);
			} else {
				e.appendChild(child);
			}
		}
	};
	insertChildred(children);
	console.log("eeeee", e);

	return e;
}

export function render(component, parentElement) {
	parentElement.appendChild(component.root);
}
