# bbcode-parser-template

Template system for [bbcode-parser](https://github.com/thoughtsunificator/bbcode-parser).

## Getting started

### Prerequisites

- [bbcode-parser](https://github.com/thoughtsunificator/bbcode-parser)

### Installing

``npm install @thoughtsunificator/bbcode-parser-template``

### Usage

#### Creating a Code

``src/codes/b.js``
```javascript

import { Code } from '@thoughtsunificator/bbcode-parser-template'
import { BBElement } from '@thoughtsunificator/bbcode-parser'

export default class extends Code {

	/**
		* @readonly
		* @type {string}
		*/
	static tagName = "b"

	/**
		* @param {Node} node
		* @returns {boolean}
		*/
	static testNode(node) {
		return node.nodeName === "SPAN" && node.style.fontWeight === "bold"
	}

	/**
		* @param {Conversion} conversion
		* @returns {BBNode}
		*/
	static createBBNode(conversion) {
		const bbNode = new BBElement("b")
		return bbNode
	}

	/**
		* @param {Conversion} conversion
		* @returns {Node}
		*/
	static createNode(conversion) {
		const node = document.createElement("span")
		node.style.fontWeight = "bold"
		return node
	}

}
```

#### Converting BBCode to HTML and vice versa 

``src/app.js``
```javascript
import { Template } from "../lib/bbcode-parser-template/index.js"
import b from "./codes/b.js"

const template = new Template([b], document)

console.log(Template.toHTML("[b]Test[/b]")

console.log(Template.toBBCode(`<span style="font-weight: bold">Test</span>`)

```

### API

You can read the API by visiting [https://thoughtsunificator.github.io/bbcode-parser-template](https://thoughtsunificator.github.io/bbcode-parser-template).

## Example

See [https://github.com/thoughtsunificator/bbcode-parser-template-example](https://github.com/thoughtsunificator/bbcode-parser-template-example).
