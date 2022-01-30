
import { c2m_View } from './c2m_View.js';


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


export default class c2m_CheckModuleView extends c2m_View {


	constructor(model, controller) {
		super(model,controller);
	}

	render() {
		console.log("3. Check the Canvas Module");

		let c2mDiv = this.createEmptyDialogDiv();
		// insert the new stage html
		c2mDiv.insertAdjacentHTML('afterbegin', CHECK_MODULE_HTML);

		// insert it before div.item-group-container
		let itemGroupContainer = document.querySelector("div.item-group-container");
		itemGroupContainer.parentNode.insertBefore(c2mDiv, itemGroupContainer);

		// add event handlers
		let closeButton = document.getElementById("c2m-btn-close");
		closeButton.onclick = () => this.controller.handleClick(c2m_Initialised);

		let startAgainButton = document.getElementById("c2m-btn-start-again");
		startAgainButton.onclick = () => this.controller.handleClick(c2m_ChooseWord);

		let confirmButton = document.getElementById("c2m-btn-confirm");
		confirmButton.onclick = () => this.controller.handleClick(c2m_Completed);
	}
}