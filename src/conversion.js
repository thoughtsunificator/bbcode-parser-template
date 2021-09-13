/** @module conversion */

/**
 * @memberof module:conversion
 */
export default class {

	constructor(bbDocument, document) {
		this._bbDocument = bbDocument
		this._document = document
		this._nodeList = []
		this._ignoreNodeList = []
		this._matches = []
		this._bbNode = null
		this._code = null
		this._parentMatch = null
		this._node = null
		this._tags = null
	}

	/**
	 * @readonly
	 * @type {Document}
	 */
	get document() {
		return this._document
	}

	/**
	 * @readonly
	 * @type {BBDocument}
	 */
	get bbDocument() {
		return this._bbDocument
	}

	/**
	 * @readonly
	 * @type {BBNode[]}
	 */
	get nodeList() {
		return this._nodeList
	}

	/**
	 * @readonly
	 * @type {BBNode[]}
	 */
	get ignoreNodeList() {
		return this._ignoreNodeList
	}

	/**
	 * @readonly
	 * @type {Object[]}
	 */
	get matches() {
		return this._matches
	}

	/**
	 * @readonly
	 * @type {BBNode}
	 */
	get bbNode() {
		return this._currentBBNode
	}

	set bbNode(bbNode) {
		this._currentBBNode = bbNode
	}

	/**
	 * @readonly
	 * @type {Code}
	 */
	get code() {
		return this._code
	}

	set code(code) {
		this._code = code
	}

	/**
	 * @readonly
	 * @type {Node}
	 */
	get node() {
		return this._node
	}

	set node(node) {
		this._node = node
	}

	/**
	 * @readonly
	 * @type {Node}
	 */
	get tags() {
		return this._tags
	}

	set tags(tags) {
		this._tags = tags
	}

}
