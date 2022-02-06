/**
 * HtmlConverter.js
 * - convert a section of HTML in a defined format and convert it into
 *   a module like structure
 * Uses exceprts from the Canvas API as structure
 * https://canvas.instructure.com/doc/api/modules.html
 */ 


/** ModuleObject 
 {
	 // NON CANVAS content
	 // The content of the word document will be included in this data structure
	 // Will need to create an actual item object to insert into Canvas
	 'content' : string

  // CANVAS content
  // the name of this module
  "name": "Imaginary Numbers and You",
  // The number of items in the module
  "items_count": 10,
  // The contents of this module, as an array of Module Items. (Present only if
  // requested via include[]=items AND the module is not deemed too large by
  // Canvas.)
  "items": null,

  **** TODO ****
  // (Optional) the date this module will unlock
  "unlock_at": "2012-12-31T06:00:00-06:00",
  // Whether module items must be unlocked in order
  "require_sequential_progress": true,
  // IDs of Modules that must be completed before this one is unlocked
  "prerequisite_module_ids": [121, 122],
  // The API URL to retrive this module's items
  "items_url": "https://canvas.example.com/api/v1/modules/123/items",
  // The state of this Module for the calling user one of 'locked', 'unlocked',
  // 'started', 'completed' (Optional; present only if the caller is a student or
  // if the optional parameter 'student_id' is included)
  "state": "started",
  // the date the calling user completed the module (Optional; present only if the
  // caller is a student or if the optional parameter 'student_id' is included)
  "completed_at": null,
  // if the student's final grade for the course should be published to the SIS
  // upon completion of this module
  "publish_final_grade": null,
  // (Optional) Whether this module is published. This field is present only if
  // the caller has permission to view unpublished modules.
  "published": true
} */

/**ModuleItem object
 {
  // the position of this item in the module (1-based)
  "position": 1,
  // the title of this item
  "title": "Square Roots: Irrational numbers or boxy vegetables?",
  // 0-based indent level; module items may be indented to show a hierarchy
  "indent": 0,
  "type": "Assignment",

  ***** TODO *****

  // the unique identifier for the module item
  "id": 768,
  // the id of the Module this item appears in
  "module_id": 123,
  // the type of object referred to one of 'File', 'Page', 'Discussion',
  // 'Assignment', 'Quiz', 'SubHeader', 'ExternalUrl', 'ExternalTool'
  // the id of the object referred to applies to 'File', 'Discussion',
  // 'Assignment', 'Quiz', 'ExternalTool' types
  "content_id": 1337,
  // link to the item in Canvas
  "html_url": "https://canvas.example.edu/courses/222/modules/items/768",
  // (Optional) link to the Canvas API object, if applicable
  "url": "https://canvas.example.edu/api/v1/courses/222/assignments/987",
  // (only for 'Page' type) unique locator for the linked wiki page
  "page_url": "my-page-title",
  // (only for 'ExternalUrl' and 'ExternalTool' types) external url that the item
  // points to
  "external_url": "https://www.example.com/externalurl",
  // (only for 'ExternalTool' type) whether the external tool opens in a new tab
  "new_tab": false,
  // Completion requirement for this module item
  "completion_requirement": {"type":"min_score","min_score":10,"completed":true},
  // (Present only if requested through include[]=content_details) If applicable,
  // returns additional details specific to the associated object
  "content_details": {"points_possible":20,"due_at":"2012-12-31T06:00:00-06:00","unlock_at":"2012-12-31T06:00:00-06:00","lock_at":"2012-12-31T06:00:00-06:00"},
  // (Optional) Whether this module item is published. This field is present only
  // if the caller has permission to view unpublished items.
  "published": true
} 
 */


/**
 * Define the translation between a html class for h1 and Canvas item type
 */
const HTML_CLASS_TO_ITEM_TYPE = {
	'canvasFile' : 'File',
	'canvasPage' : 'Page',
	'canvasDiscussion' :'Discussion',
	'canvasAssignment' : 'Assignment',
	'canvasQuiz': 'Quiz',
	'canvasSubHeader' : 'SubHeader',
	'canvasExternUrl': 'ExternalUrl'
};

export default class c2m_HtmlConverter {

	constructor(html) {

		this.html = html;
		this.name = '';
		this.items = [];

		// set up a div for the html to be able to use dom element methods
		this.htmlDiv = document.createElement('div');
		this.htmlDiv.innerHTML = html.trim();

		this.updateModuleTitle();
		this.updateModuleItems();

		this.dump();
	}

	/**
	 * Extract the module title from HTML
	 * Module title == div.name
	 * @param {String} html - collection of html to be converted
	 */
	updateModuleTitle() {
		// get all the div.name
		let titleDivs = this.htmlDiv.querySelectorAll('div.name');
		// if only 1 titleDiv set it
		if (titleDivs.length === 1) {
			this.name = titleDivs[0].innerText;
			// if the name remains empty (or just whitespace) set it to Untitled
			if (this.name.trim() === '') {
				this.name = 'Untitled';
			}
		} else {
			console.error(
				`c2m_HtmlConverter -> updateModuleTitle: wrong # (${titleDivs.length}) div.name found `);
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

		this.items = [];

		// for each h1, get the following siblings until the next h1
		//h1s.forEach((h1, index) => {
		h1s.forEach((h1) => {
			let item = {};
			item.title = h1.innerText;
			item.type = this.getType(h1);
			item.content = this.getContent(h1);
			// TODO set type from the class of h1
			this.items.push(item);
		});
		this.items_count = this.items.length;
	}

	/**
	 * Check the class of the h1 element to determine the type of item
	 * 
	 * @param {DomElement} h1 
	 * @returns {String} item's canvas type
	 */
	getType(h1) {
		// get the class of the h1
		let className = h1.className;
		// if the class is in the HTML_CLASS_TO_ITEM_TYPE map, return the value
		if (HTML_CLASS_TO_ITEM_TYPE[className]) {
			return HTML_CLASS_TO_ITEM_TYPE[className];
		}
		// default to a page
		return 'Page';
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

	/** 
	 * 
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
		console.log(`name: ${this.name} with ${this.items_count} items`);
		// display each item
		this.items.forEach((item, index) => {
			console.log(`item ${index}: ${item.title} (type:${item.type})`);
			console.log(item);
		});
	}
}