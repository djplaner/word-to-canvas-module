

import { c2m_View } from './c2m_View.js';

const CHOOSE_WORD_HTML = `

<div class="border border-trbl">
<h4>Create new module from Word document</h4>
<div class="w2c-nav">
  <ul>
    <li class="w2c-nav w2c-active"><a href="#">1. Choose .docx</a></li>
	<li class="w2c-nav"><a href="#">2. Check HTML</a> </li>
	<li class="w2c-nav"><a href="#">3. Check Module</a> </li>
	<li class="w2c-nav"><a href="#">4. Complete?</a></li>
    <li class="w2c-nav w2c-close"> <a class="icon-x"></a> </li>
  </ul>
</div>

<div class="w2c-content pad-box-mini">

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

</div>

<style>

.w2c-content {
    clear:both;
}

.w2c-nav ul  {
	list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden ;
    background-color: #eee; 
    width:100%;
}

li.w2c-active {
    background-color: #aaa;
    font-weight: bold;
}

li.w2c-close {
    float: right !important;
    border-right: none !important;
}

.w2c-nav ul li {
    float:left;
    border-right: 1px solid #000;
}

li.w2c-nav a {
    display: block;
    padding: 0.5em;
    text-align: center;
    text-decoration: none;
    color: black;
}

.w2c-nav li a:hover {
    background-color: #111;
}

.w2c-nav li:nth-child(4) {
    border-right: none;
}


</style>

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