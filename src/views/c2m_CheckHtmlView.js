
import { c2m_View } from './c2m_View.js';

const CHECK_HTML_HTML = `
<div class="item-group-container" id="w2c-container">
  <div class="item-group-condensed context_module">

    <div class="ig-header header">
       <span class="name">.docx 2 + Canvas Module</span> <span class="w2c-version">v1.7.0</span>
       <div class="ig-header-admin">
         <button aria-label="Close .docx 2 Canvas Module" id="w2c-btn-close">X</button>
       </div>
    </div> <!-- end ig-header -->

    <div class="content border border-trbl">

<div class="w2c-nav">
  <ul>
    <li class="w2c-nav"><a href="#">1. Choose .docx</a></li>
	<li class="w2c-nav w2c-active"><a href="#">2. Check HTML</a> </li>
	<li class="w2c-nav"><a href="#">3. Check Module</a> </li>
	<li class="w2c-nav"><a href="#">4. Complete?</a></li>
  </ul>
</div>


<div class="w2c-content pad-box-mini">

<div id="w2c-choice">
  <button id="w2c-btn-start-again" class="btn">
    <i class="icon-arrow-left"></i>
    Choose another .docx
  </button>
  <button id="w2c-btn-confirm" class="btn" style="display:none">
    Check module structure
    <i class="icon-arrow-right"></i>
  </button>
</div>


<div class="w2c-waiting-results">
<p><em>Waiting for conversion...</em></p>
<div class="w2c-loading"></div>
</div>

<div class="w2c-received-results" style="display:none">
  <h4>.docx to HTML conversion completed</h4>
<div class="pad-box-micro border border-trbl muted">
    <i class="icon-info"></i> 
    <small>
      Checking and fixing 
	  <a target="_blank" href="https://github.com/djplaner/word-to-canvas-module/blob/main/docs/word2html-messages.md#word-2-html-messages">
	  HTML conversion outcomes</a>
    </small>
</div>
  <div id="c2m_summary">
  <p>Use the following to check the conversion.</p>
  <p>If any issues, modify the Word doc and "chose another .docx". If ok, check the 
  module structure. </p>
  <p>Open <em>Messages</em> accordion to show conversion messages</p>
  <p>Open <em>HTML</em> to the HTML conversion of the Word document content.</p>
  </div>


<button class="w2c-accordion" id="c2m_result">Messages</button>
<div class="w2c_panel">
  <div id="c2m_messages"></div>
</div>

<button class="w2c-accordion">HTML</button>
<div class="w2c_panel" id="c2m_html"></div>
</div>

<div class="w2c-error" style="display:none">
  <h4>Problem with conversion</h4>
  <p>Unable to convert the Word document. Erorr message:
  <blockquote><span class="text-error" id="c2m_error_message"></span></blockquote>
  </p>

  <h5>What next?</h5>
  <p class="text-warning">
  <i class="icon-Solid icon-warning" aria-hidden="true"></i>
  Some <em>.docx</em> files format may be "off". A solution
  for some has been to save the document again using the Word app (i.e. not in the browser)
  ensuring it's saved as a Word 2007-365 .docx file.</p>
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


.w2c-message-warning {
	background-color: #fcf8e3;
	list-style: none;
	padding: 0.1em;
	padding-left: 1em;
}

.w2c-message-error {
	background-color: #f2dede;
	list-style: none;
	padding: 0.1em;
	padding-left: 1em;
}

span.w2c-error {
    font-size: 50%;
    margin: 1em;
    background-color: #ff0000;
    color: white;
    border-radius: 0.5em;
    padding: 0.5em;
    line-height: inherit;
    vertical-align: middle;
    box-shadow: 5px 5px 5px black;
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



.w2c-received-results .c2m-error {
	margin-top: 0.5em;
}

.w2c-loading {
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
.w2c-accordion {
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

/* Add a background color to the button if it is clicked on 
   (add the .active class with JS), and when you move the mouse over it (hover) 
 */
.w2c-active-accordion, .w2c-accordion:hover {
  background-color: #ccc;
}

/* Style the accordion panel. Note: hidden by default */
.w2c_panel {
  padding: 0 18px;
  background-color: #eeeeee;
  display: none;
  overflow: hidden;
}

.w2c-accordion:after {
  content: '+'; /* Unicode character for "plus" sign (+) */
  font-size: 13px;
  color: #777;
  float: right;
  margin-left: 5px;
}

.w2c-active-accordion:after {
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
		c2mDiv.addEventListener('mammoth-results', this.renderUpdateResults.bind(this));
		//c2mDiv.addEventListener('mammoth-results', (e) => this.controller.handleMammothResult(e));
		c2mDiv.addEventListener('mammoth-error', this.renderUpdateError.bind(this));

		// insert the new stage html
		c2mDiv.insertAdjacentHTML('afterbegin', CHECK_HTML_HTML);

		// insert it before div.item-group-container
		let itemGroupContainer = document.querySelector("div#context_modules_sortable_container");
		itemGroupContainer.parentNode.insertBefore(c2mDiv, itemGroupContainer);

		// TODO check the model's mammoth member to access the html and
		// also to check progress

		// configure accordions
		this.configureAccordions();

		// add onClick event handlers TODO fix these
		let closeButton = document.getElementById("w2c-btn-close");
		closeButton.onclick = () => this.controller.handleClick(c2m_Initialised);

		let confirmButton = document.getElementById("w2c-btn-confirm");
		confirmButton.onclick = () => this.controller.handleClick(c2m_CheckModule);

		let startAgainButton = document.getElementById("w2c-btn-start-again");
		startAgainButton.onclick = () => this.controller.handleClick(c2m_ChooseWord);

	}

	/**
	 * Mammoth results are in, update the messages and html with the results
	 */
	renderUpdateResults() {
		// TODO update the div with the results

		// Show the converted html
		// update div#c2m_html with the result html
		let c2m_html = document.getElementById("c2m_html");
		if (c2m_html) {
			c2m_html.innerHTML = this.model.wordConverter.mammothResult.value;
		}

		// Show the messages from mammoth
		let c2m_messages = document.getElementById("c2m_messages");
		if (c2m_messages) {
			const numMessages = this.model.wordConverter.mammothResult.messages.length;
			// update the title of the c2m_result div
			let c2m_result = document.getElementById("c2m_result");
			// add num messages to c2m_result text
			c2m_result.innerHTML += `: ${numMessages} messages from conversion`;

			// add html of messages to the div
			let messageHtml = this.generateMessageHtml(this.model.wordConverter.mammothResult.messages);
			c2m_messages.innerHTML = messageHtml;
		}

		// hide div.w2c-waiting-results
		document.querySelector("div.w2c-waiting-results").style.display = "none";
		// display div.w2c-received-results
		document.querySelector("div.w2c-received-results").style.display = "block";
		document.querySelector("button#w2c-btn-confirm").style.display = "inline";
	}

	/**
	 * Given an array of Mammoth messages ({'type': ?? 'message': ??}) generate 
	 * HTML to add in page 
	 * @param {Array} messages 
	 * @returns {String} html representing messages 
	 */

	generateMessageHtml(messages) {
		let messageHtml = "<ul>";
		messages.forEach(function (message) {
			console.log(message);
			messageHtml += `
			   <li class="w2c-message-${message.type}">${message.message}</li>`;
		});
		messageHtml+= "</ul>";
		return messageHtml;
	}

	/**
	 * Mammoth results are in, update the messages and html with the results
	 */
	renderUpdateError() {
		// TODO update the div with the results

		// Show the converted html
		// update div#c2m_html with the result html
		let c2m_html = document.getElementById("c2m_html");
		if (c2m_html) {
			c2m_html.innerHTML = `<p>Error while converting the Word document</p>`;
		}

		// Show the messages from mammoth
		let c2m_messages = document.getElementById("c2m_error_message");
		if (c2m_messages) {
			c2m_messages.innerHTML = this.model.wordConverter.mammothError;
		}

		// hide div.w2c-waiting-results
		document.querySelector("div.w2c-waiting-results").style.display = "none";
		// display div.w2c-received-results
		document.querySelector("div.w2c-error").style.display = "block";
	}


}