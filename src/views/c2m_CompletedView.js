
import { c2m_View } from './c2m_View.js';


const COMPLETE_HTML = `
<div class="border border-trbl c2m_dialog">
<h3>Create new module from Word document</h3>

<p color="secondary">Step 4 of 4: Complete</p>

<div id="c2m_choice">
  <button id="c2m-btn-confirm" class="btn-success">Confirm</button>
  <button id="c2m-btn-start-again" class="btn-danger">Start again</button>
  <button id="c2m-btn-close" class="btn-primary">Close</button>
</div>

<div id="c2m_outcome">
</div>

</div>

<style>
.c2m_dialog {
	  padding: 1em;
}
</style>

`;

export default class c2m_CompletedView extends c2m_View {


	constructor(model, controller) {
		super(model,controller);
	}

	render() {
		console.log("4. Complete");

		let c2mDiv = this.createEmptyDialogDiv();
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

	}

}