/** @module template */

import { Parser, BBDocument, BBNode } from "@thoughtsunificator/bbcode-parser"
import Conversion from "./conversion.js"

class Template {

	/**
	 * @param   {Code[]} codes
	 * @param   {Document} document
	 */
	constructor(codes, document) {
		this._codes = codes
		this._document = document
	}

	/**
	 * @readonly
	 * @type {Code[]}
	 */
	get codes() {
		return this._codes
	}

	/**
	 * @readonly
	 * @type {Document}
	 */
	get document() {
		return this._document
	}

	/**
	 * Convert BBcode string to HTML string
	 * @param  {string} input
	 * @return {string}
	 */
	toHTML(input) {
		const bbDocument = Parser.parse(input)
		const conversion = new Conversion(bbDocument, this.document)
		const treeWalker = bbDocument.createTreeWalker(bbDocument.documentElement)
		while (treeWalker.nextNode()) {
			conversion.nodeList.push(treeWalker.currentNode)
		}
		const rootNode = this.document.createElement("div")
		for(const bbNode of conversion.nodeList) {
			conversion.bbNode = bbNode
			conversion.tags = null
			conversion.code = null
			conversion.node = null
			conversion.parentMatch = null
			if (conversion.ignoreNodeList.indexOf(bbNode) !== -1) {
				continue
			}
			if (bbNode.nodeType === BBNode.ELEMENT_BBNODE) {
				conversion.tags = bbNode.tags()
				const code = this.codes.find(code => code.tagName === bbNode.tagName)
				if (code) {
					conversion.code = code
					conversion.code.beforeCreateNode(conversion)
					conversion.node = conversion.code.createNode(conversion)
				} else {
					const treeWalker = bbDocument.createTreeWalker(bbNode)
					while (treeWalker.nextNode()) {
						conversion.ignoreNodeList.push(treeWalker.currentNode)
					}
					conversion.node = this.document.createTextNode(bbNode.outerHTML)
				}
			} else {
				conversion.node = this.document.createTextNode(bbNode.textContent)
			}
			const parentMatch = conversion.matches.find(matchedNode => matchedNode.bbNode === bbNode.parentNode)
			if(parentMatch) {
				conversion.parentMatch = parentMatch
				const code = this.codes.find(code => code.tagName === parentMatch.bbNode.tagName)
				if(code) {
					code.appendNode(conversion)
				} else {
					conversion.parentMatch.node.appendChild(conversion.node)
				}
			} else {
				rootNode.appendChild(conversion.node)
			}
			if (conversion.node.nodeType === this.document.ELEMENT_NODE) {
				conversion.matches.push({ bbNode, node: conversion.node })
			}
		}
		return rootNode.innerHTML
	}

	/**
	 * Convert HTML string to BBcode string
	 * @param  {string} input
	 * @return {string}
	 */
	toBBCode(input) {
		const bbDocument = new BBDocument()
		const conversion = new Conversion(bbDocument, this.document)
		const element = this.document.createElement("div")
		element.innerHTML = input
		const treeWalker = this.document.createTreeWalker(element)
		while (treeWalker.nextNode()) {
			conversion.nodeList.push(treeWalker.currentNode)
		}
		for(const node of conversion.nodeList) {
			conversion.node = node
			conversion.code = null
			conversion.bbNode = null
			conversion.tags = null
			conversion.parentMatch = null
			if (conversion.ignoreNodeList.indexOf(node) !== -1) {
				continue
			}
			if (node.nodeType === this.document.ELEMENT_NODE) {
				const code = this.codes.find(code => code.testNode(node) === true)
				if (code) {
					conversion.code = code
					conversion.code.beforeCreateBBNode(conversion)
					conversion.bbNode = conversion.code.createBBNode(conversion)
					conversion.tags = conversion.bbNode.tags()
				} else {
					const treeWalker = this.document.createTreeWalker(node)
					while (treeWalker.nextNode()) {
						conversion.ignoreNodeList.push(treeWalker.currentNode)
					}
					conversion.bbNode = bbDocument.createTextNode(node.outerHTML)
				}
			} else if (node.nodeType === this.document.TEXT_NODE) {
				conversion.bbNode = bbDocument.createTextNode(node.textContent)
			}
			const parentMatch = conversion.matches.find(match => match.node === node.parentNode)
			if(parentMatch) {
				conversion.parentMatch = parentMatch
				const code = this.codes.find(code => code.tagName === parentMatch.bbNode.tagName)
				if(code) {
					code.appendBBNode(conversion)
				} else {
					conversion.parentMatch.bbNode.appendChild(conversion.bbNode)
				}
			} else {
				bbDocument.documentElement.appendChild(conversion.bbNode)
			}
			if (conversion.bbNode.nodeType === BBNode.ELEMENT_BBNODE) {
				conversion.matches.push({ bbNode: conversion.bbNode, node })
			}
		}
		return bbDocument.documentElement.innerBBCode
	}

}

export default Template
