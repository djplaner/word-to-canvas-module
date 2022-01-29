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
const BOOTSTRAP_CSS = '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">';
const BOOTSTRAP_JS = '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>';

const CHOOSE_WORD_HTML = `
<h3>Create new module from Word document</h3>

<p color="secondary">Step 1 of 4: Provide Word document</p>


<div class="c2m-upload">
  <p>Select a .docx file:
    <input id="c2m-docx" type="file" accept=".docx" />
  </p>
</div>

<div id="c2m_choice">
  <button id="c2m-btn-close" class="btn btn-primary">Close</button>
  <button id="c2m-btn-confirm" class="btn btn-success">Confirm</button>
</div>

<p><em>Some link to documentation</em></p>
<p><em>Some method to cancel operation</em></p>
<p><em>Visual indication of process - e.g. tabs</em></p>

`;

const CHECK_HTML_HTML = `
<h3>Create new module from Word document</h3>

<p color="secondary">Step 2 of 4: Check HTML conversion</p>


<div id="c2m_choice">
  <button id="c2m-btn-confirm" class="btn-success">Confirm</button>
  <button id="c2m-btn-start-again" class="btn-danger">Start again</button>
  <button id="c2m-btn-close" class="btn-primary">Close</button>
</div>

<h4>Converted HTML</h4>

<div id="c2m_html">
</div>
`;

const CHECK_MODULE_HTML = `
<h3>Create new module from Word document</h3>

<p color="secondary">Step 3 of 4: Check Canvas Module conversion</p>

<div id="c2m_choice">
  <button id="c2m-btn-confirm" class="btn-success">Confirm</button>
  <button id="c2m-btn-start-again" class="btn-danger">Start again</button>
  <button id="c2m-btn-close" class="btn-primary">Close</button>
</div>

<h4>Converted Canvas Module</h4>

<div id="c2m_module">
</div>
`;

const COMPLETE_HTML = `
<h3>Create new module from Word document</h3>

<p color="secondary">Step 4 of 4: Complete</p>

<div id="c2m_choice">
  <button id="c2m-btn-confirm" class="btn-success">Confirm</button>
  <button id="c2m-btn-start-again" class="btn-danger">Start again</button>
  <button id="c2m-btn-close" class="btn-primary">Close</button>
</div>

<div id="c2m_outcome">
</div>

`;

class c2m_View {
	/**
	 * create view object
	 * @param {Object} model
	 * @param {Object} controller
	 */
	constructor(model, controller) {
		this.model = model;
		//		this.controller = controller;

		// add in any CSS/JS
		//		document.head.insertAdjacentHTML('beforeend', BOOTSTRAP_CSS);
		//		document.body.insertAdjacentHTML('beforeend', BOOTSTRAP_JS);

		this.render();
	}

	render() {
		console.log(`rendering stage ${this.model.stage}`);
		// which is kludgier
		// - dirty big switch statement here?
		// - data structure shenigans in click function below?
		switch (this.model.stage) {
			case c2m_initialise:
				this.renderInitialise();
				break;
			case c2m_chooseWord:
				this.renderChooseWord();
				break;
			case c2m_checkHtml:
				this.renderCheckHtml();
				break;
			case c2m_checkModule:
				this.renderCheckModule();
				break;
			case c2m_complete:
				this.renderComplete();
				break;
			default:
				console.log("Unknown stage");
		}
	}

	handleClick(originatingStage) {
		console.log(`handle click switching to ...${originatingStage}`);

		this.model.stage = originatingStage;
		this.render();

	}

	/**
	 * Add a "Word 2 Module" button" to the module creation page (if it exists)
	 * Module page (staff view) has dev.header-bar-right that contains
	 * button.add_module_link
	 * Add "Word 2 Module" before that button
	 */
	renderInitialise() {
		console.log("0. Initialise");

		// is there a button.add_module_link
		let addModuleButton = document.querySelector("button.add_module_link");
		if (addModuleButton) {
			// Only add the add button if there's isn't one
			let button = document.querySelector("button.c2m_word_2_module");
			if (!button) {
				// create a dom element button.c2m_word_2_module
				button = document.createElement("button");
				// add margin-right to button style
				button.style = "margin-right: 0.2em";
				button.classList.add("c2m_word_2_module");
				button.classList.add("btn");
				button.classList.add("btn-primary");
				button.onclick = () => this.handleClick(c2m_chooseWord);
				button.innerHTML = `
			.docx 2 <i class="icon-plus"></i> 
			<span class="screenreader-only">Add</span>
			Module
			`;

				// get the collapse al button and insert + docx button before it
				// TODO this didn't strangely work, unresovled and maybe better design
				//let collapseAllButton = document.querySelector("button#expand_collapse_all");
				//collapseAllButton.parentElement.insertBefore(collapseAllButton, addModuleButton);

				// insert it before + Module
				addModuleButton.parentElement.insertBefore(button, addModuleButton);
			}

			// if there is already a div.c2m_dialog, remove it.
			let dialog = document.querySelector("div.c2m_dialog");
			if (dialog) {
				// remove dialog from document
				dialog.parentElement.removeChild(dialog);
			}
		}
	}

	/**
	 * Open up the conversion wizard, ready to select a Word file
	 */
	renderChooseWord() {
		console.log("1. Choose the Word document");

		let c2mDiv = this.createEmptyDialogDiv();
		// insert the new stage html
		c2mDiv.insertAdjacentHTML('afterbegin', CHOOSE_WORD_HTML);

		// insert it before div.item-group-container
		let itemGroupContainer = document.querySelector("div.item-group-container");
		itemGroupContainer.parentNode.insertBefore(c2mDiv, itemGroupContainer);

		// add onClick event handlers
		let closeButton = document.getElementById("c2m-btn-close");
		let confirmButton = document.getElementById("c2m-btn-confirm");
		closeButton.onclick = () => this.handleClick(c2m_initialise);
		confirmButton.onclick = () => this.handleClick(c2m_checkHtml);
	}

	renderCheckHtml() {
		console.log("2. Check the HTML");

		let c2mDiv = this.createEmptyDialogDiv();
		// insert the new stage html
		c2mDiv.insertAdjacentHTML('afterbegin', CHECK_HTML_HTML);

		// insert it before div.item-group-container
		let itemGroupContainer = document.querySelector("div.item-group-container");
		itemGroupContainer.parentNode.insertBefore(c2mDiv, itemGroupContainer);

		// add onClick event handlers TODO fix these
		let closeButton = document.getElementById("c2m-btn-close");
		closeButton.onclick = () => this.handleClick(c2m_initialise);

		let confirmButton = document.getElementById("c2m-btn-confirm");
		confirmButton.onclick = () => this.handleClick(c2m_checkModule);

		let startAgainButton = document.getElementById("c2m-btn-start-again");
		startAgainButton.onclick = () => this.handleClick(c2m_chooseWord);
	}

	renderCheckModule() {
		console.log("3. Check the Canvas Module");

		let c2mDiv = this.createEmptyDialogDiv();
		// insert the new stage html
		c2mDiv.insertAdjacentHTML('afterbegin', CHECK_MODULE_HTML);

		// insert it before div.item-group-container
		let itemGroupContainer = document.querySelector("div.item-group-container");
		itemGroupContainer.parentNode.insertBefore(c2mDiv, itemGroupContainer);

		// add event handlers
		let closeButton = document.getElementById("c2m-btn-close");
		closeButton.onclick = () => this.handleClick(c2m_initialise);

		let startAgainButton = document.getElementById("c2m-btn-start-again");
		startAgainButton.onclick = () => this.handleClick(c2m_chooseWord);

		let confirmButton = document.getElementById("c2m-btn-confirm");
		confirmButton.onclick = () => this.handleClick(c2m_complete);
	}

	renderComplete() {
		console.log("4. Complete");

		let c2mDiv = this.createEmptyDialogDiv();
		// insert the new stage html
		c2mDiv.insertAdjacentHTML('afterbegin', COMPLETE_HTML);

		// insert it before div.item-group-container
		let itemGroupContainer = document.querySelector("div.item-group-container");
		itemGroupContainer.parentNode.insertBefore(c2mDiv, itemGroupContainer);

		// add event handlers
		let closeButton = document.getElementById("c2m-btn-close");
		closeButton.onclick = () => this.handleClick(c2m_initialise);

		let startAgainButton = document.getElementById("c2m-btn-start-again");
		startAgainButton.onclick = () => this.handleClick(c2m_chooseWord);
	}

	/**
	 * Add an empty div.c2m_dialog to the page or empty the existing one
	 */
	createEmptyDialogDiv() {

		// check for existing div.c2m_dialog
		let c2mDiv = document.querySelector("div.c2m_dialog");

		if (c2mDiv) {
			// empty it
			c2mDiv.innerHTML = "";
		} else {
			c2mDiv = document.createElement('div');
			c2mDiv.classList.add("c2m_dialog");
		}
		return c2mDiv;

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

const c2m_initialise = "initialise";
const c2m_chooseWord = "choseWord";
const c2m_checkHtml = "createHtml";
const c2m_checkModule = "checkModule";
const c2m_complete = "complete";
const c2m_close = "close";

class c2m_Model {
	constructor( ){

		// indicate which of the four stages we're up to
		this.stage = c2m_initialise;
    
	}
}

// src/c2m_controller.js
/**
 * c2m_controller.js
 */







class c2m_controller {
	constructor( ){

		this.model = new c2m_Model();
		this.view = new c2m_View(this.model,this);

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