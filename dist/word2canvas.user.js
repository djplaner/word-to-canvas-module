// ==UserScript==
// @name         Word 2 Canvas Module
// @namespace    http://tampermonkey.net/
// @version      0.0.0
// @description  Userscript to create a new Canvas LMS Module from a Word document
// @author       David Jones
// @match        *://*/courses/.*/modules.*
// @grant        none
// @source       https://github.com/djplaner/word-to-canvas-module.git
// @license      MIT
// @homepage     https://github.com/djplaner/word-to-canvas-module
// ==/UserScript==

// src/views/c2m_View.js
class c2m_View {

	constructor(model ){
		this.model = model;

		this.render();
	}

	render(){
	}

	renderChooseWord() {
		console.log("1. Choose the Word document");
	}

	renderCheckHtml() {
		console.log("2. Check the HTML");
	}

	renderCheckModule() {
		console.log("3. Check the Canvas Module");
	}

	renderComplete() {
		console.log("4. Complete");
	}
}

// src/models/c2m_Model.js
/**
 * Model used to 
 * - track which stage of the conversion process is current
 * - store details about (separate classess to do this?)
 *   - Word document
 *   - Mammoth object - method to convert to HTML
 *   - conversion to HTML results
 *   - method for converting to Canvas Module data structure
 *   - method for inserting module into Canvas
 * 
 */

// Define enum for stage

const c2m_chooseWord = Symbol("choseWord");
const c2m_checkHtml = Symbol("createHtml");
const c2m_checkModule = Symbol("checkModule");
const c2m_complete = Symbol("complete");

class c2m_Model {
	constructor( ){

		// indicate which of the four stages we're up to
		this.stage = c2m_chooseWord;
    
	}
}

// src/c2m_controller.js
/**
 * c2m_controller.js
 */







class c2m_controller {
	constructor( ){

		this.model = new c2m_Model();
		this.view = new c2m_View(this.model);

		switch(this.model.stage) {
			case c2m_chooseWord:
				this.view.renderChooseWord();
				break;
			case c2m_checkHtml:
				this.view.renderCheckHtml();
				break;
			case c2m_checkModule:
				this.view.renderCheckModule();
				break;
			case c2m_complete:
				this.view.renderComplete();
				break;
			default:
				console.log("Unknown stage");
		}	
	}
}

// src/index.js
/**
 * Launch the c2m controller and do any additional pre-setup
 * Main task is to wait for the entire Canvas page to load
 * before launch
 */

function canvas2Module(){

 window.addEventListener('load', function(){
        // getting very kludgy here, haven't got a good solution...yet #14
        // - module content is dynamically loaded, wait (dumbly) for it to finish
        this.setTimeout(
            () => {
                let controller = new c2m_controller();
            }, 2000);
    });
}

/**
 * Initial launch code
 */
canvas2Module();