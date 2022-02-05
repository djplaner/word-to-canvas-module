/**
 * c2m_ModuleView.js
 * Convert an internal "Canvas modules" data structure into an approximation
 * of the Canvas module view
 */
import { c2m_View } from '../c2m_View.js';


export default class c2m_ModuleView extends c2m_View {


	constructor(model, controller) {
		super(model,controller);
	}

	/**
	 * Render the view as a string to be included via another view
	 */

	renderString() {
		return `
			<h4>${this.model.moduleTitle}</h4>

			<p>With ${this.model.moduleItems.length} items</p>
			`;
	}
}