
import { c2m_View } from './c2m_View.js';

export default class c2m_CompletedView extends c2m_View {


	constructor(model, controller) {
		// all a bit kludgy and unnecessary ATM
		// Will that change??
		this.model = model;
		this.controller = controller;
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
		closeButton.onclick = () => this.handleClick(c2m_initialise);

		let startAgainButton = document.getElementById("c2m-btn-start-again");
		startAgainButton.onclick = () => this.handleClick(c2m_chooseWord);

	}

}