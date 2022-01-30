/**
 * c2m_controller.js
 */


//import { c2m_View } from './views/c2m_View.js';

import { c2m_InitialisedView } from './views/c2m_InitialisedView.js';
import { c2m_ChooseWordView } from './views/c2m_ChooseWordView.js';
import { c2m_CheckHtmlView } from './views/c2m_CheckHtmlView.js';
import { c2m_CheckModuleView} from './views/c2m_CheckModuleView.js';
import { c2m_CompletedView} from './views/c2m_CompletedView.js';

import { c2m_Model } from './models/c2m_Model.js';


// Define the states

const c2m_Initialised = "c2m_Initialised";
const c2m_ChooseWord = "c2m_ChooseWord";
const c2m_CheckHtml = "c2m_CheckHtml";
const c2m_CheckModule = "c2m_CheckModule";
const c2m_Completed = "c2m_Completed";
//const c2m_Close = "close";


export default class c2m_Controller {
	constructor() {

		this.currentState = c2m_Initialised;

		// ?? passed to views for the services it provides with
		// Mammoth and Canvas Module converters??
		this.model = new c2m_Model();
		// TODO: will eventually create many different views
//		this.view = new c2m_View(this.model, this);

		// render the current state
		this.render();
	}

	render() {
		console.log(`rendering state ${this.currentState}`);

		const view = eval(`new ${this.currentState}View(this.model, this)`);
		view.render();
	}

	/**
	 * Event handler for clicks on navigation buttons between app states.
	 * Given the new state, modify the model and render
	 * @param {String} newState 
	 */

	handleClick(newState) {
		console.log(`handle click switching to ...${newState}`);

		this.currentState = newState;
		this.render();
	}

	/**
	 * Event handler for uploading a Word doc
	 * Use the model's convertWordDoc method, modify state to checkHtml
	 * and render
	 */

	handleUpload(event) {
		console.log("handle upload");
		console.log(event);
		this.model.convertWordDoc(event);

		// at this state this.model.converter.mammothResult is defined
		console.log("-------------------");
		//console.log(this.model.converter.mammothResult); 

		// get ready to display results
		this.currentState = c2m_CheckHtml;
		this.render();
	}

	/**
	 * Handle a mammoth result becoming available
	 * Should only happen for checkHtml
	 */

	handleMammothResult(event) {
		console.log("XXXXXXXXX mammoth result available");
		console.log(this.model.converter.mammothResult);

		let view = new c2m_CheckHtmlView(this.model, this);
		view.renderUpdateResults();
	}
}
