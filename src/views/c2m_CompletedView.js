/**
 * c2m_CompletedView.js
 * Handles the completed view state. i.e. user has clicked to create a new module
 * from a converted Word doc. This view will create the new view and display the 
 * result
 */

import { c2m_View } from './c2m_View.js';


const COMPLETE_HTML = `
<div class="border border-trbl pad-box">
<h3>Create new module from Word document</h3>

<p color="secondary">Step 4 of 4: Complete</p>

<div id="c2m_choice">
  <button id="c2m-btn-confirm" class="btn-success">Confirm</button>
  <button id="c2m-btn-start-again" class="btn-danger">Start again</button>
  <button id="c2m-btn-close" class="btn-primary">Close</button>
</div>


<div class="c2m-waiting-results">
<p><em>Waiting for creation of new module "<span id="c2m-module-name"></span>"</em></p>
<div class="c2m-loading"></div>
</div>

<div class="c2m-received-results" style="display:none">
  <h4>Module created</h4>
  <div id="c2m_summary">
  <p><em>insert some info and link to the new module</em></p>
  </div>
</div>


<div class="c2m-error" style="display:none">
  <h4>Problem with creating the module</h4>
  <p>Unable to create the new Module. Erorr message:
  <blockquote><span class="text-error" id="c2m_error_message"></span></blockquote>
  </p>

  <h5>What next?</h5>
  <p class="text-warning">
  <i class="icon-Solid icon-warning" aria-hidden="true"></i>
  <em>offer some sage advice</em>
  </p>
</div>
</div>

<style>

.c2m-received-results .c2m-error {
	margin-top: 0.5em;
}

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

</style>


`;

export default class c2m_CompletedView extends c2m_View {


	constructor(model, controller) {
		console.log("c2m_CompletedView constructor --------------");
		super(model,controller);
	}

	/**
	 * Start the call to create the module and set up the display
	 * once created an event will cause "renderUpdate"
	 */
	render() {
		console.log("4. Complete");

		let c2mDiv = this.createEmptyDialogDiv();

		// register the event handlers for module creation
		//c2mDiv.addEventListener('c2m_module_created', this.renderCreationResults.bind(this));
		c2mDiv.addEventListener('c2m-module-created', this.renderCreationResults.bind(this));
		c2mDiv.addEventListener('c2m-module-error', this.renderCreationError.bind(this));



		// insert the new stage html
		c2mDiv.insertAdjacentHTML('afterbegin', COMPLETE_HTML);

		// insert it before div.item-group-container
		let itemGroupContainer = document.querySelector("div.item-group-container");
		itemGroupContainer.parentNode.insertBefore(c2mDiv, itemGroupContainer);

		// add event handlers
		let closeButton = document.getElementById("c2m-btn-close");
		closeButton.onclick = () => this.controller.handleClick(c2m_Initialised);

		let startAgainButton = document.getElementById("c2m-btn-start-again");
		startAgainButton.onclick = () => this.controller.handleClick(c2m_ChooseWord);

		// for now just get a list of all messages, testing the event handling
		// TODO update this to starting to create the module and its items
		console.log("---- trying to create the module");
		this.model.createModule();
	}

	/**
	 * Update the view based on the completed creation of the module
	 * Sparked by an event when the creation is complete
	 */

	renderCreationResults() {
		let receivedDiv = document.querySelector("div.c2m-received-results");

		receivedDiv.innerHTML = `<h1>Succeess</h1>
		<p>Module created</p>`;

		// hide div.c2m-waiting-results
		let waitingDiv = document.querySelector("div.c2m-waiting-results");
		waitingDiv.style.display = "none";
		// show div.c2m-received-results
		receivedDiv.style.display = "block";
	}

	renderCreationError() {
		let receivedDiv = document.querySelector("div.c2m-error");

		// populate recievedDiv with error message
		receivedDiv.innerHTML = `<h1>Error</h1>
		 <p>some bug</p>`;


		// hide div.c2m-waiting-results
		let waitingDiv = document.querySelector("div.c2m-waiting-results");
		waitingDiv.style.display = "none";
		// show div.c2m-error
		receivedDiv.style.display = "block";


	}

}