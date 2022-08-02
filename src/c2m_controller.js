/* eslint-disable no-unused-vars */
/**
 * c2m_controller.js
 */


//import { c2m_View } from './views/c2m_View.js';

import { c2m_InitialisedView } from './views/c2m_InitialisedView.js';
import { c2m_ChooseWordView } from './views/c2m_ChooseWordView.js';
import { c2m_CheckHtmlView } from './views/c2m_CheckHtmlView.js';
import { c2m_CheckModuleView } from './views/c2m_CheckModuleView.js';
import { c2m_CompletedView } from './views/c2m_CompletedView.js';

import { c2m_Model } from './models/c2m_Model.js';


// Define the states

const c2m_Initialised = "c2m_Initialised";
const c2m_ChooseWord = "c2m_ChooseWord";
const c2m_CheckHtml = "c2m_CheckHtml";
const c2m_CheckModule = "c2m_CheckModule";
const c2m_Completed = "c2m_Completed";
//const c2m_Close = "close";

const CI_CSS_URL = 'https://rawcdn.githack.com/djplaner/word-to-canvas-module/bc41f0c954b717b9693f516f2efcdd1ab3fdce23/css/content-interface.css';

export default class c2m_Controller {
	constructor() {

		this.currentState = c2m_Initialised;
		this.csrfToken = this.getCsrfToken();
		this.courseId = this.getCourseId(); // TODO actually get the course id

		// ?? passed to views for the services it provides with
		// Mammoth and Canvas Module converters??
		this.model = new c2m_Model(this);

		this.render();
	}

	/**
	 * Following adapted from https://github.com/msdlt/canvas-where-am-I
	 * Function which returns csrf_token from cookie see: 
	 * https://community.canvaslms.com/thread/22500-mobile-javascript-development
	 * @returns {string} csrf token
	 */
	getCsrfToken() {
		var csrfRegex = new RegExp('^_csrf_token=(.*)$');
		var csrf;
		var cookies = document.cookie.split(';');
		for (var i = 0; i < cookies.length; i++) {
			var cookie = cookies[i].trim();
			var match = csrfRegex.exec(cookie);
			if (match) {
				csrf = decodeURIComponent(match[1]);
				break;
			}
		}
		return csrf;
	}

	/**
	* Following adapted from https://github.com/msdlt/canvas-where-am-I
	* Function which gets find course id from wherever it is available - currently ONLY ON WEB
	* @returns {string} id of course
	*/

	getCourseId() {
		let courseId = ENV.COURSE_ID || ENV.course_id;
		if (!courseId) {
			var urlPartIncludingCourseId = window.location.href.split("courses/")[1];
			if (urlPartIncludingCourseId) {
				courseId = urlPartIncludingCourseId.split("/")[0];
			}
		}
		return courseId;
	}

	render() {
		console.log('----------------- render -----------------');
		console.log(`rendering state ${this.currentState}`);
		console.log(` -- token ${this.csrfToken}`);

		// select li.section > a.syllabus
		/*		const syllabus = document.querySelector('li.section > a.syllabus');
				if (syllabus) {
					syllabus.style.display = 'none';
				}*/

		// inject on module as well
		//this.injectCss();
		// but if only on a pages page, finish up
		let currentPageUrl = window.location.href;
		if (currentPageUrl.match(/courses\/[0-9]*\/pages/)) {
			return;
		}

		const view = eval(`new ${this.currentState}View(this.model, this)`);
		view.render();
	}

	/**
	 * Inject the CI CSS into a Canvas page 
	 */
/*	injectCss() {
		return;
		//		let css = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/djplaner/word-to-canvas-module@master/css/content-interface.css">';
		//		let css = '<link rel="stylesheet" href="https://raw.githack.com/djplaner/word-to-canvas-module/main/css/content-interface.css">';
		let css = `<link rel="stylesheet" href="${CI_CSS_URL}">`;

		// inject css string element at end of head
		document.getElementsByTagName("head")[0].insertAdjacentHTML('beforeend', css); 
	} */

	/**
	 * Event handler for clicks on navigation buttons between app states.
	 * Given the new state, modify the model and render
	 * @param {String} newState 
	 */

	handleClick(newState) {
		console.log(`handle click switching to ...${newState}`);

		// if c2m_completed moving to c2m_initialised, reload the page
		if (this.currentState === c2m_Completed && newState === c2m_Initialised) {
			window.location.reload();
		}

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

		// do the conversion, it will be async
		// handleUpdateResults will be called when it is done
		this.model.convertWordDoc(event);

		// move the state on and render, ready for the results
		this.currentState = c2m_CheckHtml;
		this.render();
	}

	/**
	 * Event handler for when user selects to convert h2s to accordions in
	 * the CheckHTML state
	 * We're basically going to call the appropriate model method
	 */

	handleH2AsAccordionClick() {
		// only works if currentState is c2m_checkHtml
		if (this.currentState === c2m_CheckHtml) {
			this.model.h2sAsAccordions();

		}
	}

	/**
	 * Event handler for when user wishes to retain error labels in the HTML
	 * for adding into Canvas
	 * if "input#w2c-leave-errors" is checked, then set the model's keepErrors flag to true
	 * 
	 */

	handleLeaveErrorsClick() {
		// get value of input#w2c-leave-errors
		let keepErrors = document.getElementById('w2c-leave-errors').checked;
		this.model.keepErrors = keepErrors;
	}
}


