/** @module code */

/**
 * @memberof module:code
 */
class Code {

	/**
		* @readonly
		* @type {string}
		* @abstract
		*/
	static tagName

	/**
		* @abstract
		* @param {Node} node
		* @returns {boolean}
		*/
	static testNode(node) {}

	/**
		* @abstract
		* @param {Conversion} conversion
		*/
	static beforeCreateBBNode(conversion) {}

	/**
		* @abstract
		* @param {Conversion} conversion
		* @returns {BBNode}
		*/
	static createBBNode(conversion) {}

	/**
		* @abstract
		* @param {Conversion} conversion
		*/
	static beforeCreateNode(conversion) {}

	/**
		* @param {Conversion} conversion
		*/
	static appendBBNode(conversion) {
		conversion.parentMatch.bbNode.appendChild(conversion.bbNode)
	}

	/**
		* @abstract
		* @param {Conversion} conversion
		* @returns {Node}
		*/
	static createNode(conversion) {}

	/**
		* @param {Conversion} conversion
		*/
	static appendNode(conversion) {
		conversion.parentMatch.node.appendChild(conversion.node)
	}

}

export default Code
