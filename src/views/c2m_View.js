

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

<div class="c2m-waiting-results">
<p><em>Waiting for conversion...</em></p>
<div class="c2m-loading"></div>
</div>
<div class="c2m-received-results" style="display:none">

<button class="c2m_accordion">Conversion Messages</button>
<div class="c2m_panel" id="c2m_messages"></div>

<button class="c2m_accordion">HTML</button>
<div class="c2m_panel" id="c2m_html"></div>
</div>

<style>
.c2m-loading {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 3em;
  height: 3em;
  animation: spin 2s linear infinite;
  margin-left: 2em;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

* Style the buttons that are used to open and close the accordion panel */
.c2m_accordion {
  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  text-align: left;
  border: none;
  outline: none;
  transition: 0.4s;
}

/* Add a background color to the button if it is clicked on (add the .active class with JS), and when you move the mouse over it (hover) */
.c2m_active, .c2m_accordion:hover {
  background-color: #ccc;
}

/* Style the accordion panel. Note: hidden by default */
.c2m_panel {
  padding: 0 18px;
  background-color: white;
  display: none;
  overflow: hidden;
}
</style>
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

export default class c2m_View {
	/**
	 * create view object
	 * @param {Object} model
	 * @param {Object} controller
	 */
	constructor(model, controller) {
		this.model = model;
		this.controller = controller;
		//		this.controller = controller;

		// add in any CSS/JS
		//		document.head.insertAdjacentHTML('beforeend', BOOTSTRAP_CSS);
		//		document.body.insertAdjacentHTML('beforeend', BOOTSTRAP_JS);

		//this.render();
	}

/*	render() {
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
	} */

	/**
	 * Event handler for clicks on navigation buttons between app stages.
	 * Given the new stage, modify the model and render
	 * @param {String} newStage 
	 */
/*	handleClick(newStage) {
		console.log(`handle click switching to ...${newStage}`);

		this.model.stage = newStage;
		this.render();

	} */

	/**
	 * Event handler for uploading a Word doc
	 * Use the model's convertWordDoc method, modify stage to checkHtml
	 * and render
	 */

	handleUpload(event) {
		console.log("handle upload");
		console.log(event);
		this.model.convertWordDoc(event);

		// at this stage this.model.converter.mammothResult is defined
		console.log("-------------------");
		//console.log(this.model.converter.mammothResult); 

		// get ready to display results
		this.model.stage = c2m_checkHtml;
		this.render();
	}

	/**
	 * Handle a mammoth result becoming available
	 * Should only happen for checkHtml
	 */

	handleMammothResult(event) {
		console.log("XXXXXXXXX mammoth result available");
		console.log(this.model.converter.mammothResult);
		// TODO update the div with the results
		// handle any error messages

		// Show the converted html
		// update div#c2m_html with the result html
		let c2m_html = document.getElementById("c2m_html");
		if (c2m_html) {
			c2m_html.innerHTML = this.model.converter.mammothResult.value;
		}

		// Show the messages from mammoth
		let c2m_messages = document.getElementById("c2m_messages");
		if (c2m_messages) {
			let messageHtml = this.generateMessageHtml(this.model.converter.mammothResult.messages);
			c2m_messages.innerHTML = messageHtml;
		}

		// hide div.c2m-waiting-results
		document.querySelector("div.c2m-waiting-results").style.display = "none";
		// display div.c2m-received-results
		document.querySelector("div.c2m-received-results").style.display = "block";
	}

	/**
	 * Given an array of Mammoth messages ({'type': ?? 'message': ??}) generate
	 * HTML to add in page
	 * @param {Array} messages 
	 * @returns {String} html representing messages
	 */

	generateMessageHtml(messages) {
		let messageHtml = "";
		messages.forEach(function (message) {
			messageHtml += `<div class="c2m_alert ${message.type}" role="alert">${message.message}</div>`;
		});
		return messageHtml;
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

		// add onChange event handler for c2m-docx
		let c2mDocx = document.querySelector("input#c2m-docx");
		c2mDocx.addEventListener('change', (e) => this.handleUpload(e));

		// add onClick event handlers - for navigation buttons
		let closeButton = document.getElementById("c2m-btn-close");
		let confirmButton = document.getElementById("c2m-btn-confirm");
		closeButton.onclick = () => this.handleClick(c2m_initialise);
		confirmButton.onclick = () => this.handleClick(c2m_checkHtml);
	}

	renderCheckHtml() {
		console.log("2. Check the HTML");

		let c2mDiv = this.createEmptyDialogDiv();
		// add the event handler for mammoth results
		c2mDiv.addEventListener('mammoth-results', (e) => this.handleMammothResult(e));

		// insert the new stage html
		c2mDiv.insertAdjacentHTML('afterbegin', CHECK_HTML_HTML);

		// insert it before div.item-group-container
		let itemGroupContainer = document.querySelector("div.item-group-container");
		itemGroupContainer.parentNode.insertBefore(c2mDiv, itemGroupContainer);

		// TODO check the model's mammoth member to access the html and
		// also to check progress

		// configure accordions
		this.configureAccordions();

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

	configureAccordions() {
		let acc = document.getElementsByClassName("c2m_accordion");

		for (let i = 0; i < acc.length; i++) {
			acc[i].addEventListener("click", function () {
				/* Toggle between adding and removing the "active" class,
				to highlight the button that controls the panel */
				this.classList.toggle("c2m_active");

				/* Toggle between hiding and showing the active panel */
				var panel = this.nextElementSibling;
				if (panel.style.display === "block") {
					panel.style.display = "none";
				} else {
					panel.style.display = "block";
				}
			});
		}
	}
}
