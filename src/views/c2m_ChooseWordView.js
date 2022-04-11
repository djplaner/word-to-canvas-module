

import { c2m_View } from './c2m_View.js';

const CHOOSE_WORD_HTML = `

<div class="item-group-container" id="w2c-container">
  <div class="item-group-condensed context_module">

    <div class="ig-header header">
       <span class="name">.docx 2 + Canvas Module</span><span class="w2c-version">(v1.7.2)</span>
       <div class="ig-header-admin">
         <button aria-label="Close .docx 2 Canvas Module" id="w2c-btn-close">X</button>
       </div>
    </div> <!-- end ig-header -->

    <div class="content border border-trbl">

<div class="w2c-nav">
  <ul>
    <li class="w2c-nav w2c-active"><a href="#">1. Choose .docx</a></li>
	<li class="w2c-nav"><a href="#">2. Check HTML</a> </li>
	<li class="w2c-nav"><a href="#">3. Check Module</a> </li>
	<li class="w2c-nav"><a href="#">4. Complete?</a></li>
  </ul>
</div>


<div class="w2c-content pad-box-mini">
<div class="w2c-upload">
  <h4>Choose a .docx file</h4>
  <div class="pad-box-micro border border-trbl muted">
    <i class="icon-info"></i> 
    <small>
      More on <a target="_blank" href="https://github.com/djplaner/word-to-canvas-module/blob/main/docs/create.md#create-a-word-2-canvas-word-document">word-2-canvas Word styles</a>
    </small>
  </div>
  <p>Select the Word document to create a Canvas module</p>
    <input id="w2c-docx" type="file" accept=".docx" />


</div>

</div>

    </div> <!-- end content -->

  </div> <!-- end item-group-condensed -->
</div> <!-- end of w2c-container -->

<style>

.w2c-version {
  font-size: 60%;
  color: #999;
  vertical-align:text-bottom;
  margin-left: 1em;
}

.w2c-content {
    clear:both;
}

.w2c-nav { 
    font-size: small;
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

li.w2c-active a {
    color: black !important;
}

li.w2c-nav a {
    display: block;
    padding: 0.5em;
    text-align: center;
    text-decoration: none;
    color: #ccc; 
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

		// add onChange event handler for w2c-docx
		let c2mDocx = document.querySelector("input#w2c-docx");
		c2mDocx.addEventListener('change', (e) => this.controller.handleUpload(e));

		// add onClick event handlers - for navigation buttons
		let closeButton = document.getElementById("w2c-btn-close");
		let confirmButton = document.getElementById("w2c-btn-confirm");
		closeButton.onclick = () => this.controller.handleClick(c2m_Initialised);
	}

}