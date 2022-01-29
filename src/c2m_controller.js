/**
 * c2m_controller.js
 */


import { c2m_View } from './views/c2m_View.js';

import { c2m_InitialisedView } from './views/c2m_InitialisedView.js';

import { c2m_Model } from './models/c2m_Model.js';


// Define the states

const c2m_Initialised = "c2m_Initialised";
const c2m_ChooseWord = "c2m_ChoseWord";
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
		this.view = new c2m_View(this.model, this);

		// render the current state
		this.render();
	}

	render() {
		console.log(`rendering stage ${this.currentState}`);

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







}
