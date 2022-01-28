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

const C2M_DIV_HTML = `
<h3>Create new module from Word document</h3>

<div class="c2m-upload">
  <p>Select a .docx file:
    <input id="c2m-docx" type="file" accept=".docx" />
  </p>
</div>

<p><em>Some link to documentation</em></p>
<p><em>Some method to cancel operation</em></p>
<p><em>Visual indication of process - e.g. tabs</em></p>

`;

class c2m_View {
	/**
	 * create view object
	 * @param {Object} model
	 * @param {Object} controller
	 */
	constructor(model, controller) {
		this.model = model;
		this.controller = controller;

		// add in any CSS/JS
//		document.head.insertAdjacentHTML('beforeend', BOOTSTRAP_CSS);
//		document.body.insertAdjacentHTML('beforeend', BOOTSTRAP_JS);

		this.render();
	}

	render() {
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
		console.log(`handle click switching to ...`);

		const eventHandlers = {
			[c2m_initialise]: this.initialiseButtonClick,
			[c2m_chooseWord]: this.chooseWordButtonClick,
			[c2m_checkHtml]: this.checkHtmlButtonClick,
			[c2m_checkModule]: this.checkModuleButtonClick,
			[c2m_complete]: this.completeButtonClick
		};

		eventHandlers[originatingStage].call(this);
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
			// create a dom element button.c2m_word_2_module
			let button = document.createElement("button");
			// add margin-right to button style
			button.style = "margin-right: 0.2em";
			button.classList.add("c2m_word_2_module");
			button.classList.add("btn");
			button.classList.add("btn-primary");
			button.onclick = () => this.handleClick(c2m_initialise);
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
	}

	/**
	 * Open up the conversion wizard, ready to select a Word file
	 */
	renderChooseWord() {
		console.log("1. Choose the Word document");

		// open the c2m div, after the div.header-bar
		let c2mDiv = document.createElement('div');
		c2mDiv.classList.add("c2m_dialog");
		c2mDiv.insertAdjacentHTML('afterbegin', C2M_DIV_HTML);

		// insert it before div.item-group-container
		let itemGroupContainer = document.querySelector("div.item-group-container");
		itemGroupContainer.parentNode.insertBefore(c2mDiv, itemGroupContainer);
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

	/**
	 * event handler called when the ".docx 2 Module" button (created in
	 * renderInitialise) is clicked, it will/might/should
	 * - change the stage to c2m_chooseWord
	 * - and call the
	 */
	initialiseButtonClick() {
		// TODO should probably do some checks to ensure current
		// stage is c2m_initialise
		console.log('initialiseButtonClick');
		console.log(this)
		this.model.stage = c2m_chooseWord;
		this.render();
	}

	chooseWordButtonClick() {
		// TODO should probably do some checks to ensure current
		// stage is c2m_chooseWord
		this.model.stage = c2m_checkHtml;
		this.render();
	}

	checkHtmlButtonClick() {
		// TODO should probably do some checks to ensure current
		// stage is c2m_checkHtml
		this.model.stage = c2m_checkModule;
		this.render();
	}

	checkModuleButtonClick() {
		// TODO should probably do some checks to ensure current
		// stage is c2m_checkModule
		this.model.stage = c2m_complete;
		this.render();
	}

	completeButtonClick() {
		// TODO should probably do some checks to ensure current
		// stage is c2m_complete
		this.model.stage = c2m_initialise;
		this.render();
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

const c2m_initialise = Symbol("initialise");
const c2m_chooseWord = Symbol("choseWord");
const c2m_checkHtml = Symbol("createHtml");
const c2m_checkModule = Symbol("checkModule");
const c2m_complete = Symbol("complete");

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