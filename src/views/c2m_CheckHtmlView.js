
import { c2m_View } from './c2m_View.js';

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
  <h4>Conversion completed</h4>
  <div id="c2m_summary">
  <p>Use the following to check conversion. If
  ok, click <em>Confirm</em> to see the Canvas Module this HTML would become.</p>
  <p>Open <em>Messages</em> accordion to show conversion messages</p>
  <p>Open <em>HTML</em> to the HTML conversion of the Word document content.</p>
  </div>


<button class="c2m_accordion" id="c2m_result">Messages</button>
<div class="c2m_panel">
  <div id="c2m_messages"></div>
</div>

<button class="c2m_accordion">HTML</button>
<div class="c2m_panel" id="c2m_html"></div>
</div>

<style>
.c2m-received-results {
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

/* Style the buttons that are used to open and close the accordion panel */
.c2m_accordion {
  background-color: #eee;
  color: #444;
  cursor: pointer;
  font-weight: bold;
  padding: 0.5em;
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

.c2m_accordion:after {
  content: '+'; /* Unicode character for "plus" sign (+) */
  font-size: 13px;
  color: #777;
  float: right;
  margin-left: 5px;
}

.c2m_active:after {
  content: "-"; /* Unicode character for "minus" sign (-) */
}
</style>
`;


export default class c2m_CheckHtmlView extends c2m_View {


	constructor(model, controller) {
		super(model, controller);
	}

	render() {
		console.log("2. Check the HTML");

		let c2mDiv = this.createEmptyDialogDiv();
		// add the event handler for mammoth results
		c2mDiv.addEventListener('mammoth-results', (e) => this.controller.handleMammothResult(e));

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
		closeButton.onclick = () => this.controller.handleClick(c2m_Initialised);

		let confirmButton = document.getElementById("c2m-btn-confirm");
		confirmButton.onclick = () => this.controller.handleClick(c2m_CheckModule);

		let startAgainButton = document.getElementById("c2m-btn-start-again");
		startAgainButton.onclick = () => this.controller.handleClick(c2m_ChooseWord);

	}

	/**
	 * Mammoth results are in, update the messages and html with the results
	 */
	renderUpdateResults() {

		// TODO update the div with the results
		// handle any error messages

		// Show the converted html
		// update div#c2m_html with the result html
		let c2m_html = document.getElementById("c2m_html");
		if (c2m_html) {
			c2m_html.innerHTML = this.model.wordConverter.mammothResult.value;
		}

		// Show the messages from mammoth
		let c2m_messages = document.getElementById("c2m_messages");
		if (c2m_messages) {
			let messageHtml = this.generateMessageHtml(this.model.wordConverter.mammothResult.messages);
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
			console.log(message);
			messageHtml += `
			<div class="c2m-message">
			  <span class="c2m-message-type">${message.type}</span>
			  <span class="c2m-message-message">${message.message}</span>
			</div>`;
		});
		return messageHtml;
	}



}