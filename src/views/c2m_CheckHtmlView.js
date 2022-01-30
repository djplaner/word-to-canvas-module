
import { c2m_View } from './c2m_View.js';

export default class c2m_CheckHtmlView extends c2m_View {


	constructor(model, controller) {
		// all a bit kludgy and unnecessary ATM
		// Will that change??
		this.model = model;
		this.controller = controller;
	}

	render() {
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

}