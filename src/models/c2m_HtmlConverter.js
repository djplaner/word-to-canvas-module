/**
 * HtmlConverter.js
 * - convert a section of HTML in a defined format and convert it into
 *   a module like structure
 */



export default class c2m_HtmlConverter {

	constructor(html) {

		this.html = html;

		this.updateModuleTitle();
		this.updateModuleItems();

	}

	/**
	 * Extract the module title from HTML
	 * - module title will be ??
	 * @param {String} html - collection of html to be converted
	 */
	updateModuleTitle( ) {

	}

    /**
	 * Create an array of item objects 
	 *    { title: '', content: '', type: '' }
	 * from the current html.
	 */
	updateModuleItems() {

	}
}