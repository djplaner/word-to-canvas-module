

import { c2m_View } from './c2m_View.js';

const CHOOSE_WORD_HTML = `
<div class="border border-trbl pad-box">
<h3>Create new module from Word document</h3>

<p color="secondary">Step 1 of 4: Provide Word document</p>

<div class="c2m-upload">
  <p>Select a .docx file:
    <input id="c2m-docx" type="file" accept=".docx" />
  </p>
</div>

<div id="c2m_choice">
  <button id="c2m-btn-close" class="btn btn-primary">Close</button>
</div>

<p><em>Some link to documentation</em></p>
<p><em>Some method to cancel operation</em></p>
<p><em>Visual indication of process - e.g. tabs</em></p>

</div>

`;


export default class c2m_ChooseWordView extends c2m_View {


	constructor(model, controller) {
		super(model,controller);
	}

	render() {
		console.log("1. Choose the Word document");

		let c2mDiv = this.createEmptyDialogDiv();
		// insert the new stage html
		c2mDiv.insertAdjacentHTML('afterbegin', CHOOSE_WORD_HTML);

		// insert it before div.item-group-container
		let itemGroupContainer = document.querySelector("div.item-group-container");
		itemGroupContainer.parentNode.insertBefore(c2mDiv, itemGroupContainer);

		// add onChange event handler for c2m-docx
		let c2mDocx = document.querySelector("input#c2m-docx");
		c2mDocx.addEventListener('change', (e) => this.controller.handleUpload(e));

		// add onClick event handlers - for navigation buttons
		let closeButton = document.getElementById("c2m-btn-close");
		let confirmButton = document.getElementById("c2m-btn-confirm");
		closeButton.onclick = () => this.controller.handleClick(c2m_Initialised);
	}

}