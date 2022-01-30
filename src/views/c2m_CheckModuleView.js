
import { c2m_View } from './c2m_View.js';

export default class c2m_CheckModuleView extends c2m_View {


	constructor(model, controller) {
		// all a bit kludgy and unnecessary ATM
		// Will that change??
		this.model = model;
		this.controller = controller;
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
		closeButton.onclick = () => this.handleClick(c2m_initialise);

		let startAgainButton = document.getElementById("c2m-btn-start-again");
		startAgainButton.onclick = () => this.handleClick(c2m_chooseWord);

		let confirmButton = document.getElementById("c2m-btn-confirm");
		confirmButton.onclick = () => this.handleClick(c2m_complete);

	}

}