/**
 * HtmlConverter.js
 * - convert a section of HTML in a defined format and convert it into
 *   a module like structure
 */



export default class c2m_HtmlConverter {

	constructor(html) {

		this.html = html;
		this.moduleTitle = '';
		this.moduleItems = [];

		// set up a div for the html to be able to use dom element methods
		this.htmlDiv = document.createElement('div');
		this.htmlDiv.innerHTML = html.trim();

		this.updateModuleTitle();
		this.updateModuleItems();

		this.dump();
	}

	/**
	 * Extract the module title from HTML
	 * Module title == div.moduleTitle
	 * @param {String} html - collection of html to be converted
	 */
	updateModuleTitle() {
		// get all the div.moduleTitle
		let titleDivs = this.htmlDiv.querySelectorAll('div.moduleTitle');
		// if only 1 titleDiv set it
		if (titleDivs.length === 1) {
			this.moduleTitle = titleDivs[0].innerText;
		} else {
			console.error(
				`c2m_HtmlConverter -> updateModuleTitle: wrong # (${titleDivs.length}) div.moduleTitle found `);
		}

	}

	/**
	 * Create an array of item objects 
	 *    { title: '', content: '', type: '' }
	 * from the current html.
	 */
	updateModuleItems() {

		// get all the h1 elements
		let h1s = this.htmlDiv.querySelectorAll('h1');

		this.moduleItems = [];

		// for each h1, get the following siblings until the next h1
		//h1s.forEach((h1, index) => {
		h1s.forEach((h1) => {
			let item = {};
			item.title = h1.innerText;
//			item.type = this.getType(h1);
			item.content = this.getContent(h1);
			// TODO set type from the class of h1
			this.moduleItems.push(item);
		});
	}

	/**
	 * Given a dom element, get all the content until the next h1
	 * @param {dom eLement} h1 
	 */
	getContent(h1) {
		let content = this.nextUntil(h1, 'h1');
		// convert content elements into html string
		content = content.map(elem => elem.outerHTML);
		// join content array strings into single string
		content = content.join('');
		return content;
	}

	/*!
 * Get all following siblings of each element up to but not including the element matched by the selector
 * (c) 2017 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Node}   elem     The element
 * @param  {String} selector The selector to stop at
 * @param  {String} filter   The selector to match siblings against [optional]
 * @return {Array}           The siblings
 */
	nextUntil(elem, selector, filter) {

		// Setup siblings array
		var siblings = [];

		// Get the next sibling element
		elem = elem.nextElementSibling;

		// As long as a sibling exists
		while (elem) {

			// If we've reached our match, bail
			if (elem.matches(selector)) break;

			// If filtering by a selector, check if the sibling matches
			if (filter && !elem.matches(filter)) {
				elem = elem.nextElementSibling;
				continue;
			}

			// Otherwise, push it to the siblings array
			siblings.push(elem);

			// Get the next sibling element
			elem = elem.nextElementSibling;

		}

		return siblings;

	}


	/**
	 * Simple dump of current object via console.log
	 */
	dump() {
		console.log('c2m_HtmlConverter -> dump:');
		console.log(`moduleTitle: ${this.moduleTitle} with ${this.moduleItems.length} items`);
		// display each item
		this.moduleItems.forEach((item, index) => {
			console.log(`item ${index}: ${item.title}`);
			console.log(item);
		});
	}
}