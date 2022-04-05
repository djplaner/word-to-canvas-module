// ==UserScript==
// @name         Word 2 Canvas Module
// @namespace    http://tampermonkey.net/
// @version      1.6.0
// @description  Userscript to create a new Canvas LMS Module from a Word document
// @author       David Jones
// @match        https://*/courses/*
// @grant        none
// @source       https://github.com/djplaner/word-to-canvas-module.git
// @license      MIT
// @homepage     https://github.com/djplaner/word-to-canvas-module
// @require      https://cdnjs.cloudflare.com/ajax/libs/mammoth/0.3.10/mammoth.browser.min.js
// ==/UserScript==

// src/views/c2m_View.js
/**
 * c2m_View.js
 * Parent view class, define
 * - createEmptyDialogDiv
 * - configureAccordions 
 */

//const BOOTSTRAP_CSS = '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">';
//const BOOTSTRAP_JS = '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>';




class c2m_View {
	/**
	 * create view object
	 * @param {Object} model
	 * @param {Object} controller
	 */
	constructor(model, controller) {
		this.model = model;
		this.controller = controller;
	}



	/**
	 * Add an empty div.c2m_dialog to the page or empty the existing one
	 */
	createEmptyDialogDiv() {

		// check for existing div.c2m_dialog
		let c2mDiv = document.querySelector("div.c2m_dialog");

		if (c2mDiv) {
			// renive c2mDiv from document
            c2mDiv.parentNode.removeChild(c2mDiv);
		} 

		c2mDiv = document.createElement('div');
		c2mDiv.classList.add("c2m_dialog");
		return c2mDiv;
	}

	configureAccordions() {
		let acc = document.getElementsByClassName("w2c-accordion");

		for (let i = 0; i < acc.length; i++) {
			acc[i].addEventListener("click", function () {

				/* Toggle between adding and removing the "active" class,
				to highlight the button that controls the panel */
				this.classList.toggle("w2c-active-accordion");

				/* Toggle between hiding and showing the active panel */
				let panel = this.nextElementSibling;
				if (panel.style.display === "block") {
					panel.style.display = "none";
				} else {
					panel.style.display = "block";
				}
			});
		}
	}
}

// src/views/c2m_InitialisedView.js
class c2m_InitialisedView extends c2m_View {


	constructor(model, controller) {
		super(model,controller);
	}

	render() {
		console.log("0. Initialise");

		// is there a button.add_module_link
		let addModuleButton = document.querySelector("button.add_module_link");
		if (addModuleButton) {
			// Only add the add button if there's isn't one
			let button = document.querySelector("button.c2m_word_2_module");
			if (!button) {
				// create a dom element button.c2m_word_2_module
				button = document.createElement("button");
				// add margin-right to button style
				button.style = "margin-right: 0.2em";
				button.classList.add("c2m_word_2_module");
				button.classList.add("btn");
				button.classList.add("btn-primary");
				button.onclick = () => this.controller.handleClick(c2m_ChooseWord);
				button.innerHTML = `
			.docx 2 <i class="icon-plus"></i> 
			<span class="screenreader-only">Add</span>
			Module
			`;

				// get the collapse al button and insert + docx button before it
				// TODO this didn't strangely work, unresovled and maybe better design
				//let collapseAllButton = document.querySelector("button#expand_collapse_all");
				//collapseAllButton.parentElement.insertBefore(collapseAllButton, addModuleButton);

				// insert it before + Module
				addModuleButton.parentElement.insertBefore(button, addModuleButton);
			}

			// if there is already a div.c2m_dialog, remove it.
			let dialog = document.querySelector("div.c2m_dialog");
			if (dialog) {
				// remove dialog from document
				dialog.parentElement.removeChild(dialog);
			}
		}
	}

}

// src/views/c2m_ChooseWordView.js
const CHOOSE_WORD_HTML = `

<div class="item-group-container" id="w2c-container">
  <div class="item-group-condensed context_module">

    <div class="ig-header header">
       <span class="name">.docx 2 + Canvas Module</span><span class="w2c-version">(v1.7.0)</span>
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


class c2m_ChooseWordView extends c2m_View {


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

// src/views/c2m_CheckHtmlView.js
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


class c2m_CheckHtmlView extends c2m_View {


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

// src/views/canvas/c2m_ModuleView.js
/**
 * c2m_ModuleView.js
 * Convert an internal "Canvas modules" data structure into an approximation
 * of the Canvas module view
 * 
 */



class c2m_ModuleView extends c2m_View {


	constructor(model, controller) {
		super(model,controller);
	}

	/**
	 * Render the view as a string to be included via another view
	 */

	renderString() {
		const name = this.model.name;
		const items = this.model.items;
    const typeToIcon = {
      'Page' : 'icon-document',
      'ExistingPage' : 'icon-document',
      'File' : 'icon-paperclip',
      'Discussion' : 'icon-discussion',
      'Assignment' : 'icon-assignment',
      'Quiz': 'icon-quiz',    // TODO not sure we can add these
      'ExternalUrl': 'icon-link',
      'ExternalTool': 'icon-link',
      'SubHeader': 'icon-subheader'
    }
    const typeToItemClass = {
      'Page' : 'wiki_page',
      'ExistingPage' : 'wiki_page',
      'File' : 'attachment',
      'Discussion' : 'discussion-topic',
      'Assignment' : 'assignment',
      'Quiz': 'lti-quiz',
      'ExternalUrl': 'external_url',
      'SubHeader': 'context_module_sub_header'
    }

/*		return `
			<h4>${this.model.moduleTitle}</h4>

			<p>With ${this.model.moduleItems.length} items</p>
			`; */
        return `

<div class="item-group-container">
<div class="ig-list ui-sortable"> <!-- overall list of modules (1 here) div -->

<!-- start of module div -->
<div class="item-group-condensed context_module"
  aria-label="${name}" data-workflow-state="active" style="">
  <a id="c2m_sample_module"></a>

  <!-- start of module title/name div -->
  <div class="ig-header header" id="c2m_sample_module_header">
    <h2 class="screenreader-only">${name}</h2>
	<span class="name" title="${name}">${name}</span>

    <!-- prerequisites -->

    <div class="prerequisites">
        <!-- need to set/unset display:none as required -->
      <div class="prerequisites_message" title="Prerequisites: " style="display: none;" >
        Prerequisites: <!-- TODO have a mechanism to set this -->
      </div>
    </div>

    <div class="requirements_message"><!-- TODO --></div>

  </div>

<!-- add the items -->
    <!-- start of the items -->

  <div class="content" id="context_module_content_150" style="display: block;">
    <ul class="ig-list items context_module_items manageable ui-sortable">

  ${items.map(item => `
      <li id="${item.title}" style="" class="context_module_item ${typeToItemClass[item.type]}">
        <div class="ig-row">
          <a aria-label="${item.title}" tabindex="-1" class="for-nvda">
		    ${item.title}
          </a>

            <span class="type_icon" role="none">
              <i class="${typeToIcon[item.type]}" style="display:inline-block !important"></i>
            </span>
 
          <div class="ig-info">
            <div class="module-item-title">
              <span class="item_name">
                <a title="${item.title}" class="ig-title title item_link">
                  ${item.title}  - (${item.type})
                </a>
                <span title="{item.title}" class="title locked_title">
                  ${item.title} - (${item.type})
                  </span>
                <span class="points_possible" style="display: none;">TODO</span>
                <span class="requirement" style="display: none;">TODO</span>
                <span class="completion_requirement" style="display: none;">TODO</span>
                <span class="position" style="display: none;">2</span>
                <!-- TODO this is the URL for the actual external link -->
                <span class="url" style="display: none;">TODO</span>
                <span class="new_tab" style="display: none;">0</span>
              </span>
            </div>

            <div class="module_item_icons nobr">
              <!-- dead code? -->
              <span class="criterion ">
                <span class="min_score" style="display: none;">&nbsp;</span>
                <span class="criterion_type" style="display: none;" >&nbsp;</span >
              </span>
              <!-- /dead code -->
              <span class="type" style="display: none;">external_url</span>
              <span class="id" style="display: none;">1078</span>
              <span class="graded" style="display: none;">0</span>
            </div>

            <div class="ig-details">
              <div class="requirement-description ig-details__item">
                <span class="completion_requirement">
                  <span class="requirement_type min_score_requirement">
                    <span class="unfulfilled">
                      Score at least <span class="min_score">&nbsp;</span>
                      <span class="screenreader-only" >Must score at least
                        <span class="min_score">&nbsp;</span> to complete this
                        module item</span
                      >
                    </span>
                    <span class="fulfilled">
                      Scored at least <span class="min_score">&nbsp;</span>
                      <span class="screenreader-only"
                        >Module item has been completed by scoring at least
                        <span class="min_score">&nbsp;</span></span >
                    </span>
                  </span>
                  <span class="requirement_type must_view_requirement">
                    <span class="unfulfilled">
                      View
                      <span class="screenreader-only"
                        >Must view in order to complete this module item</span
                      >
                    </span>
                    <span class="fulfilled">
                      Viewed
                      <span class="screenreader-only"
                        >Module item has been viewed and is complete</span
                      >
                    </span>
                  </span>
                  <span class="requirement_type must_mark_done_requirement">
                    <span class="unfulfilled">
                      Mark as done
                      <span class="screenreader-only"
                        >Must mark this module item done in order to
                        complete</span
                      >
                    </span>
                    <span class="fulfilled">
                      Marked as done
                      <span class="screenreader-only"
                        >Module item marked as done and is complete</span
                      >
                    </span>
                  </span>
                  <span class="requirement_type must_contribute_requirement">
                    <span class="unfulfilled">
                      Contribute
                      <span class="screenreader-only"
                        >Must contribute to this module item to complete
                        it</span
                      >
                    </span>
                    <span class="fulfilled">
                      Contributed
                      <span class="screenreader-only"
                        >Contributed to this module item and is complete</span
                      >
                    </span>
                  </span>
                  <span class="requirement_type must_submit_requirement">
                    <span class="unfulfilled">
                      Submit
                      <span class="screenreader-only"
                        >Must submit this module item to complete it</span
                      >
                    </span>
                    <span class="fulfilled">
                      Submitted
                      <span class="screenreader-only"
                        >Module item submitted and is complete</span
                      >
                    </span>
                  </span>
                </span>
              </div>
              <!-- requirement description end -->
            </div>
          </div>
          <div class="ig-admin">
          </div> 
        </div>
      </li>


  `.trim()).join("")}
    </ul>
	<div class="footer"></div>
	</div>
</div>
</div>
  `;
	}
}

// src/views/c2m_CheckModuleView.js
const CHECK_MODULE_HTML = `
<div class="item-group-container" id="w2c-container">
  <div class="item-group-condensed context_module">

    <div class="ig-header header">
       <span class="name">.docx 2 + Canvas Module</span>
       <div class="ig-header-admin">
         <button aria-label="Close .docx 2 Canvas Module" id="w2c-btn-close">X</button>
       </div>
    </div> <!-- end ig-header -->

    <div class="content border border-trbl">

<div class="w2c-nav">
  <ul>
    <li class="w2c-nav"><a href="#">1. Choose .docx</a></li>
	<li class="w2c-nav"><a href="#">2. Check HTML</a> </li>
	<li class="w2c-nav w2c-active"><a href="#">3. Check Module</a> </li>
	<li class="w2c-nav"><a href="#">4. Complete?</a></li>
  </ul>
</div>


<div class="w2c-content pad-box-mini">

<div id="w2c-choice">
  <button id="w2c-btn-start-again" class="btn">
    <i class="icon-arrow-left"></i>
    Choose another .docx
  </button>
  <button id="w2c-btn-confirm" class="btn">
    Create module
    <i class="icon-arrow-right"></i>
  </button>
</div>

  <div id="c2m_summary">
  <h4>HTML to Canvas Module conversion completed</h4>

  <p>Use the following to check the conversion before creating the module.</p>
  </div>


<button class="w2c-accordion" id="c2m_result">Messages - generated during conversion</button>
<div class="w2c-panel">
  <div id="c2m_messages"></div>
</div>

<button class="w2c-accordion">Module structure - generated by conversion</button>
<div class="w2c-panel" id="c2m_module"></div>
</div>

    </div> <!-- end content -->

  </div> <!-- end item-group-condensed -->
</div> <!-- end of w2c-container -->


<style>


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

.c2m-received-results {
	margin-top: 0.5em;
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

/* Add a background color to the button if it is clicked on (add the .active class with JS), and when you move the mouse over it (hover) */
.w2c-active-accordion, .w2c-accordion:hover {
  background-color: #ccc;
}

/* Style the accordion panel. Note: hidden by default */
.w2c-panel {
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


class c2m_CheckModuleView extends c2m_View {


	constructor(model, controller) {
		super(model,controller);
	}

	render() {
		console.log("3. Check the Canvas Module");

		// perform the test conversion of the HTML (Mammoth) to Canvas Module
    this.model.postProcessMammothResult();
		this.model.testHtmlToModule();

		let c2mDiv = this.createEmptyDialogDiv();
		// insert the new stage html
		c2mDiv.insertAdjacentHTML('afterbegin', CHECK_MODULE_HTML);

		// insert it before div.item-group-container
		let itemGroupContainer = document.querySelector("div.item-group-container");
		itemGroupContainer.parentNode.insertBefore(c2mDiv, itemGroupContainer);

		// add event handlers
		let closeButton = document.getElementById("w2c-btn-close");
		closeButton.onclick = () => this.controller.handleClick(c2m_Initialised);

		let startAgainButton = document.getElementById("w2c-btn-start-again");
		startAgainButton.onclick = () => this.controller.handleClick(c2m_ChooseWord);

		let confirmButton = document.getElementById("w2c-btn-confirm");
		confirmButton.onclick = () => this.controller.handleClick(c2m_Completed);

		// check to see if conversion results are in
		// does the model have a htmlConvert property
		if (
			Object.prototype.hasOwnProperty.call(this.model, "htmlConverter") &&
			this.model.htmlConverter.items_count > 0
			) { 
				// if so, show the results 
				this.renderConversionResults(); 
			}
	}

	/**
	 * Conversion to a module has been completed
	 * - set the messages area
	 * - create the Canvas module view
	 */
	renderConversionResults() {

		// TODO update the div with the results
		// handle any error messages
		const converter = this.model.htmlConverter;

		this.configureAccordions();
		// Show the converted html
		// update div#c2m_html with the result html
		let c2m_html = document.getElementById("c2m_module");
		if (c2m_html) {
			let moduleView = new c2m_ModuleView(converter);
			// TODO need to call a module view
			c2m_html.innerHTML = moduleView.renderString();
		}

		// Show the messages from mammoth
		let c2m_messages = document.getElementById("c2m_messages");
		if (c2m_messages) {
			//let messageHtml = this.generateMessageHtml(this.model.wordConverter.mammothResult.messages);
			c2m_messages.innerHTML = 'no messages yet';
		}
	}

}

// src/views/c2m_CompletedView.js
/**
 * c2m_CompletedView.js
 * Handles the completed view state. i.e. user has clicked to create a new module
 * from a converted Word doc. This view will create the new view and display the 
 * result
 */
 /* jslint: esversion: 6 */




const COMPLETE_HTML = `

<div class="item-group-container" id="w2c-container">
  <div class="item-group-condensed context_module">

    <div class="ig-header header">
       <span class="name">.docx 2 + Canvas Module</span>
       <div class="ig-header-admin">
         <button aria-label="Close .docx 2 Canvas Module" id="w2c-btn-close">X</button>
       </div>
    </div> <!-- end ig-header -->

    <div class="content border border-trbl">

<div class="w2c-nav">
  <ul>
    <li class="w2c-nav"><a href="#">1. Choose .docx</a></li>
	<li class="w2c-nav"><a href="#">2. Check HTML</a> </li>
	<li class="w2c-nav"><a href="#">3. Check Module</a> </li>
	<li class="w2c-nav w2c-active"><a href="#">4. Complete?</a></li>
  </ul>
</div>


<div class="w2c-content pad-box-mini">

<div id="w2c-choice">
  <button id="w2c-btn-start-again" class="btn">
    <i class="icon-arrow-left"></i>
    Choose another .docx
  </button>
</div>

<div class="w2c-recieved-results" style="display:none">
  <h4 class="text-success">Module created</h4>
  <div id="w2c-summary">
  <p>The module "<span id="w2c_module_name"></span>" was created with 
  <span id="w2c_module_num_items"></span> items.</p>
  <p>Close this dialog to view the module and then choose to <a href="https://community.canvaslms.com/t5/Instructor-Guide/How-do-I-move-or-reorder-a-module/ta-p/1150">
  move it</a> to its proper place.</p>
  </div>
</div>


<div class="w2c-error" style="display:none">
  <h4>Problem with creating the module</h4>
  <p>Unable to create the new Module. Erorr message:
  <blockquote><span class="text-error" id="c2m_error_message"></span></blockquote>
  </p>

  <h5>What next?</h5>
  <p class="text-warning">
  <i class="icon-Solid icon-warning" aria-hidden="true"></i>
  <em>offer some sage advice</em>
  </p>
</div>


<div class="w2c-waiting-results">
<p><em>Waiting for creation of new module "<span id="w2c-module-name"></span>"</em></p>
<div class="w2c-loading"></div>
</div>

<div class="w2c-progress">
<h4>Progress</h4>
<ol id="w2c-progress-list">
  <li> <span class="w2c-progress-label">Module creation started</span> </li>
</ol>
</div>



    </div> <!-- end content -->

  </div> <!-- end item-group-condensed -->
</div> <!-- end of w2c-container -->

<style>


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



.w2c-recieved-results .w2c-error {
	margin-top: 0.5em;
}

#w2c-progress-list {
    font-size: small;
}

.w2c-progress-label {
    font-size: small;
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

</style>


`;

class c2m_CompletedView extends c2m_View {


    constructor(model, controller) {
        console.log("c2m_CompletedView constructor --------------");
        super(model, controller);
    }

    /**
     * Start the call to create the module and set up the display
     * once created an event will cause "renderUpdate"
     */
    render() {
        console.log("4. Complete");

        let c2mDiv = this.createEmptyDialogDiv();

        // register the event handlers for module creation
        //c2mDiv.addEventListener('w2c_module_created', this.renderCreationResults.bind(this));
        c2mDiv.addEventListener(
            'w2c-empty-module-created', this.checkEmptyModuleCreated.bind(this));
        c2mDiv.addEventListener(
            'w2c-file-found', this.checkFileLinksFound.bind(this));
        c2mDiv.addEventListener(
            'w2c-item-found-created', this.checkItemFoundCreated.bind(this));
        c2mDiv.addEventListener(
            'w2c-module-item-added', this.checkModuleItemAdded.bind(this));
        c2mDiv.addEventListener('w2c-module-error', this.renderCreationError.bind(this));

        // insert the new stage html
        c2mDiv.insertAdjacentHTML('afterbegin', COMPLETE_HTML);

        // insert it before div.item-group-container
        let itemGroupContainer = document.querySelector("div.item-group-container");
        itemGroupContainer.parentNode.insertBefore(c2mDiv, itemGroupContainer);

        // add event handlers
        let closeButton = document.getElementById("w2c-btn-close");
        closeButton.onclick = () => this.controller.handleClick(c2m_Initialised);

        let startAgainButton = document.getElementById("w2c-btn-start-again");
        startAgainButton.onclick = () => this.controller.handleClick(c2m_ChooseWord);

        // for now just get a list of all messages, testing the event handling
        // TODO update this to starting to create the module and its items
        console.log("---- trying to create the module");

        this.model.createModule();
    }

    /**
     * Event handler for w2c-empty-module-created event.
     * Indicates that an empty Canvas module has been created.
     * - Update the w2c-progress-list and call this.model.findOrCreateItems
     */
    checkEmptyModuleCreated() {
        // get and check the module name
        let moduleName = this.model.canvasModules.createdModule.name;
        let id = this.model.canvasModules.createdModule.id;

        // TODO some sort of check that the module is actually created

        console.log(`created new module ${moduleName} with id ${id}`);

        this.addProgressList(`Empty module create: <em>${moduleName}</em>`);

        this.numFoundCreatedItems = 0;
        this.model.findFileLinks();
//        this.model.findOrCreateModuleItems();
    }

    /**
     * Event handler for the w2c-file-found event 
     * - check if the correct number of files have been created
     * - if not, do nothing but update the display status
     * - is all created, then call findOrCreateModuleItems
     * 
     * May also need to update the model structure with details of each fileLink
     * that needs to be found with the results of the event
     * @param {Event} e
     */

    checkFileLinksFound(e) {
        console.log("---------------------- checkFileLinksFound");
        console.log(e);
        let index = e.detail.file;
        let file = this.model.canvasModules.fileLinks[index];

        console.log(`found file ${file.name} with id ${index}`);
        console.log(file);

        // check that the file has been found correctly
        if ( file.status==="found") {
            // add to the progress display
            this.addProgressList(
                `File "<em>${file.name}</em>": found` );
        } else {
            // failed to find it
            this.addProgressList(
                `<span class="text-error">File "<em>${file.name}</em>": not found</span>`
            )
        }

        // increment the number of files we've heard about
        this.model.canvasModules.numFoundFileLinks+=1;

        // if we've heard from all 
        if ( this.model.canvasModules.numFoundFileLinks===this.model.canvasModules.fileLinks.length) {
            // then we've found all the files
            // so now we can find or create the items
            // TODO but not yet
            this.model.findOrCreateModuleItems();
        }
    }

    /**
     * Event handler for w2c-item-found-created event.
     * The event (e) detail property contains index for the item that was
     * created
     * return by the model
     * @param {Event} e
     */
    checkItemFoundCreated(e) {
        console.log('OOOOOOOOOOOOOOOOOOO checkItemFoundCreated');
        console.log(e)

        let index = e.detail.item;
        // TODO what if index greater than # items
        let item = this.model.canvasModules.items[index];
        // TODO check the content of the item, esp. createdItem (the JSON)

        // if item.createdItem has a property "error" then handle error
        if (
            Object.hasOwnProperty.call(item, 'createdItem') &&
            Object.hasOwnProperty.call(item.createdItem, 'error')
        ) {
            const error = item.createdItem.error;

            this.addProgressList(`
                Error finding item "<em>${item.title}</em>": error - 
                <span class="text-error">${error}</span>`
            );
            return;
        }

        this.numFoundCreatedItems++;

        this.addProgressList(
            `item "<em>${item.title}</em>" found or created
              (created ${this.numFoundCreatedItems} out of 
                ${this.model.canvasModules.items.length})`
        );

        // TODO check the JSON in item.createdItem

        // increment the number of found/created items
        // check if all items have been found/created
        if (this.numFoundCreatedItems == this.model.canvasModules.items.length) {
            this.addProgressList(`
            <span class="text-success">
              <strong>All ${this.numFoundCreatedItems} items found or created
              (created ${this.numFoundCreatedItems} out of ${this.model.canvasModules.items.length})</strong>
            </span>`
            );
            this.addProgressList('Starting to add items to the module');
            // numAddedItems counts number already added and used to
            // identify which item to add next
            this.numAddedItems = 0;
            //this.model.addItemsToModule();
            this.model.addModuleItem(this.numAddedItems);
        }
    }

    /**
     * Called everytime an item successfully added to the current module.
     * - check whether the addition worked (or not)
     *   TODO need to handle this better
     * - update the progress list
     * - increment num added
     * - if not all items added
     *   - call addItemToModule
     * @param {Event} e - the generated event, include detail object
     * with properly item
     * 
     */

    checkModuleItemAdded(e) {
        console.log('OOOOOOOOOOOOOOOOOOO checkItemFoundCreated');
        console.log(e)

        let index = e.detail.item;
        // TODO what if index greater than # items
        let item = this.model.canvasModules.items[index];
        this.numAddedItems++;

        //        console.log(`created item ${item.createdItem}`);
        this.addProgressList(
            `item (${item.title}) added to module in position ${index} 
            (added ${this.numAddedItems} out of ${this.model.canvasModules.items.length})`
        );

        // TODO check the JSON in item.createdItem
        // this is where error checking should happen

        // increment the number of found/created items
        // check if all items have been found/created
        if (this.numAddedItems != this.model.canvasModules.items.length) {
            this.model.addModuleItem(this.numAddedItems);
        } else {
            this.addProgressList(`
            <span class="text-success"><strong>
              All ${this.numFoundCreatedItems} items added to the module
              (created ${this.numAddedItems} out of ${this.model.canvasModules.items.length})
              </strong>
            </span>`
            );
            this.addProgressList(`<span class="text-success"><strong>Module created!</strong></span>`);
            this.renderCreationResults();
        }
    }


    /**
     * Update the ul#w2c-progress-list with a new message
     * @param {String} message
     */
    addProgressList(message) {
        let progressList = document.getElementById("w2c-progress-list");
        // get number of items in progressList
        let li = document.createElement("li");
        li.innerHTML = `
        <span class="w2c-progress-label">${message}</span>
        `;
        // add li to progressList
        progressList.appendChild(li);
    }

    /**
     * Update the view based on the completed creation of the module
     * Sparked by an event when the creation is complete
     */

    renderCreationResults() {
        let receivedDiv = document.querySelector("div.w2c-recieved-results");

        const result = this.model.canvasModules.createdModule;

        let nameSpan = document.getElementById("w2c_module_name");
        nameSpan.innerHTML = result.name;
        let numItemsSpan = document.getElementById("w2c_module_num_items");
        //numItemsSpan.innerHTML = result.items_count;
        numItemsSpan.innerHTML = this.model.canvasModules.items.length;

        // hide div.w2c-waiting-results
        let waitingDiv = document.querySelector("div.w2c-waiting-results");
        waitingDiv.style.display = "none";
        // show div.w2c-recieved-results
        receivedDiv.style.display = "block";
    }

    renderCreationError() {
        let receivedDiv = document.querySelector("div.w2c-error");
        const error = this.model.canvasModules.createdModuleError;

        // populate recievedDiv with error message
        receivedDiv.innerHTML = `<h4>Error</h4>
		 <p class="text-warning">${error}</p>`;


        // hide div.w2c-waiting-results
        let waitingDiv = document.querySelector("div.w2c-waiting-results");
        waitingDiv.style.display = "none";
        // show div.w2c-error
        receivedDiv.style.display = "block";


    }

}

// src/models/c2m_WordConverter.js
/**
 * WordConverter.js
 * Define c2m_Converter class which is responsible for converting a Word doc 2 html
 * using Mammoth.js
 */


const DEFAULT_OPTIONS = {
    styleMap: [
        "p[style-name='Existing Canvas Page'] => h1.existingCanvasPage",
        "p[style-name='Canvas Discussion'] => h1.canvasDiscussion",
        "p[style-name='Canvas Assignment'] => h1.canvasAssignment",
        "p[style-name='Canvas Quiz'] => h1.canvasQuiz",
        "p[style-name='Canvas File'] => h1.canvasFile",
        "p[style-name='Canvas SubHeader'] => h1.canvasSubHeader",
        "p[style-name='Canvas External Url'] => h1.canvasExternalUrl",
        "p[style-name='Canvas External Tool'] => h1.canvasExternalTool",
        "r[style-name='Talis Canvas Link'] => span.talisCanvasLink",
        "r[style-name='Canvas File Link'] => span.canvasFileLink",
        "p[style-name='Canvas File Link'] => span.canvasFileLink",

        "p[style-name='Hide'] => div.Hide > p:fresh",

        // kludges to tidy up common messy word cruft
        "p[style-name='List Bullet'] => ul > li:fresh",
        "p[style-name='heading 6'] => h6:fresh",

        "p[style-name='Section Title'] => h1:fresh",
        "p[style-name='Quote'] => blockquote:fresh",
        "p[style-name='Quotations'] => blockquote:fresh",
        "p[style-name='Quotation'] => blockquote:fresh",
        "p[style-name='Body Text'] => p:fresh",
        "p[style-name='Text'] => p:fresh",
        "p[style-name='Default'] => p:fresh",
        "p[style-name='Normal (Web)'] => p:fresh",
        "p[style-name='Normal'] => p:fresh",
        "p[style-name='Text body'] => p:fresh",
        "p[style-name='Textbody1'] => p:fresh",
        "p[style-name='Picture'] => div.ci_container > div.picture",
        "p[style-name='Picture Right'] => div.pictureRight",
        "p[style-name='PictureRight'] => div.pictureRight",
        "r[style-name='University Date'] => span.universityDate",
        "p[style-name='Video'] => div.video",
        "p[style-name='Aside'] => aside",
        "p[style-name='Film Watching Options'] => film-watch-options",
        "r[style-name='Checkbox Char'] => span.checkbox",
        "p[style-name='Checkbox'] => span.checkbox",
        "r[style-name='Blue'] => span.blue",
        "r[style-name='Red'] => span.red",
        "p[style-name='Example'] => div.example > p:fresh",
        "p[style-name='Example Centered'] => div.exampleCentered > p:fresh",
        "p[style-name='Flashback']:ordered-list(1) => div.flashback > ol > li:fresh",
        "p[style-name='Flashback']:unordered-list(1) => div.flashback > ul > li:fresh",
        "p[style-name='Flashback'] => div.flashback > p:fresh",

        "p[style-name='Weekly Workout']:ordered-list(1) => div.weeklyWorkout > ol > li:fresh",
        "p[style-name='Weekly Workout']:unordered-list(1) => div.weeklyWorkout > ul > li:fresh",
        "p[style-name='Weekly Workout'] => div.weeklyWorkout > p:fresh",

        "p[style-name='Poem'] => div.poem > p:fresh",
        "r[style-name='Poem Right'] => div.poemRight > p:fresh",

        "p[style-name='Canary Exercise']:ordered-list(1) => div.canaryExercise > div.instructions > ol > li:fresh",
        "p[style-name='Canary Exercise']:unordered-list(1) => div.canaryExercise > div.instructions > ul > li:fresh",
        "p[style-name='Canary Exercise'] => div.canaryExercise > div.instructions > p:fresh",
        "p[style-name='Coming Soon'] => div.comingSoon > div.instructions > p:fresh",
        "p[style-name='ActivityTitle'] => div.activity > h2:fresh",
        "p[style-name='Activity Title'] => div.activity > h2:fresh",
        "p[style-name='ActivityText'] => div.activity > div.instructions > p:fresh",
        "p[style-name='Activity Text'] => div.activity > div.instructions > p:fresh",
        //"r[style-name='Activity'] => div.activity > div.instructions > p:fresh",
        "p[style-name='Activity']:ordered-list(1) => div.activity > div.instructions > ol > li:fresh",
        "p[style-name='Activity']:unordered-list(1) => div.activity > div.instructions > ul > li:fresh",
        "p[style-name='Activity'] => div.activity > div.instructions > p:fresh",
        "p[style-name='activity'] => div.activity > div.instructions > p:fresh",
        /*"p[style-name='Activity'] => span.activity",*/
        "p[style-name='Bibliography'] => div.apa > p:fresh",
        "p[style-name='Reading']:ordered-list(1) => div.reading > div.instructions > ol > li:fresh",
        "p[style-name='Reading']:unordered-list(1) => div.reading > div.instructions > ul > li:fresh",
        "p[style-name='Reading'] => div.reading > div.instructions > p:fresh",
        "p[style-name='Title'] => div.moduleTitle",
        "p[style-name='Card'] => div.gu_card",
        "r[style-name='Emphasis'] => em:fresh",
        "p[style-name='Timeout'] => span.timeout",
        "p[style-name='Embed'] => span.embed",
        "p[style-name='Note']:ordered-list(1) => div.ael-note > div.instructions > ol > li:fresh",
        "p[style-name='Note']:unordered-list(1) => div.ael-note > div.instructions > ul > li:fresh",
        "p[style-name='Note'] => div.ael-note > div.instructions > p:fresh",
        /* Adding cards */
        "p[style-name='Blackboard Card'] => div.bbCard:fresh",
        /* Blackboard item conversion */
        "p[style-name='Blackboard Item Heading'] => h1.blackboard",
        "p[style-name='Blackboard Item Heading 2'] => h2.blackboard",
        "r[style-name='Blackboard Item Link'] => span.blackboardLink",
        "p[style-name='Blackboard Item Link'] => span.blackboardlink",
        "r[style-name='Blackboard Item Link Char'] => span.blackboardLink",
        "r[style-name='Blackboard Content Link'] => span.blackboardContentLink",
        "r[style-name='Blackboard Menu Link'] => span.blackboardMenuLink",
        /* tables?? */
        "r[style-name='small'] => span.smallText",
        "r[style-name='StrongCentered'] => span.strongCentered",
        "r[style-name='Centered'] => span.centered",
        // Underline

        // GO style
        "p[style-name='GO Start Here'] => div.goStartHere",
        "p[style-name='GO Reflect'] => div.goReflect",
        "p[style-name='GO Watch'] => div.goWatch",
        "p[style-name='GO Download'] => div.goDownload",
        // TODO numbered list, need to detect the original image or order???
        "p[style-name='GO Numbered List'] => div.goNumberedList",
        "p[style-name='GO Activity'] => div.goActivity",
        "p[style-name='GO Reading'] => div.goReading > div.instructions > p:fresh",
    ],

};

// Wrap arounds for various types of activity always required because
// Mammoth isn't able (as I've configured it) to do it all
// - key indicates <div style to be preprended
// - value is what will be prepended
const CI_STYLE_PREPEND = {
  reading: `<div class="readingImage">&nbsp;</div>`,
  activity: `<div class="activityImage">&nbsp;</div>`,
  flashback: `<div class="flashbackImage">&nbsp;</div>`,
  //"canaryExercise" : `<div class="canaryImage"></div>`,
  // COM14
  canaryExercise: `<div class="canaryImage">&nbsp;</div>`,
  //"ael-note": `<div class="noteImage"><img src="https://filebucketdave.s3.amazonaws.com/banner.js/images/Blk-Warning.png" style="max-width:100%"></div>`,
  "ael-note": `<div class="noteImage">&nbsp;</div>`,
  weeklyWorkout: `<div class="weeklyWorkoutImage">&nbsp;</div>`,
  comingSoon: `<div class="comingSoonImage">&nbsp;</div>`,
  filmWatchingOptions: `<div class="filmWatchingOptionsImage">&nbsp;</div>`,
  goReading: `<div class="goReadingImage">&nbsp;</div>`,
};

const CI_EMPTY_STYLE_PREPEND = {
  goStartHere: `<div class="goStartHereImage"> <img src="https://app.secure.griffith.edu.au/gois/ultra/icons-regular/start-here.svg" /> </div>`,
  goActivity: `<div class="goActivityImage"> <img src="https://app.secure.griffith.edu.au/gois/ultra/icons-regular/activity.svg" /> </div>`,
  goReflect: `<div class="goReflectImage"> <img src="https://app.secure.griffith.edu.au/gois/ultra/icons-regular/reflection.svg" /> </div>`,
  goWatch: `<div class="goWatchImage"> <img src="https://app.secure.griffith.edu.au/gois/ultra/icons-regular/video.svg" /> </div>`,
  goDownload: `<div class="goDownloadImage"> <img src="https://app.secure.griffith.edu.au/gois/ultra/icons-regular/download.svg" /> </div>`,
  goNumberedList: `<div class="goNumberedListImage"> <img src="https://app.secure.griffith.edu.au/gois/ultra/icons-regular/number-1.svg" /> </div>`,
};

const TABLE_CLASS= ["table", "stripe-row-odd"];

class c2m_WordConverter {

    /**
     * construct the object
     * - if event is defined then we're converting from .docx to html
     * - if no event initialise
     */
    constructor() {

        //		this.mammothConvert();

        //		this.handleFileSelect(event);
    }


    decodeEntities(encodedString) {
        let textArea = document.createElement('textarea');
        textArea.innerHTML = encodedString;
        return textArea.value;
    }

    /**
     * Called when mammoth is complete.  Will set the mammoth response
     * as a data member and then dispatch an event on div.c2m_dialog 
     * to spark the view into displaying the results 
     * @param {Object} result Mammoth result response
     */
    displayResult(result) {

        this.mammothResult = result;

        // CONTEXTUAL CHANGES
        // TODO do Content Interface translations here??
        // TODO move this out an additional class
        // find all span.embed in mammothResult and log innerhtml
        // parse the string 
        this.postConvert();

        this.generateWarnings();

        // generate mammoth-results event
        const event = new Event('mammoth-results');
        let c2m_dialog = document.querySelector('div.c2m_dialog');
        if (c2m_dialog) {
            c2m_dialog.dispatchEvent(event);
        }
    }

    /**
     * After conversion and post conversion check for various known
     * warnings or errors and update the mammothResult object and the
     * messages
     * - messages are stored in this.mammothResult.messages);
     */

    generateWarnings() {
        let parser = new DOMParser();
        let doc = parser.parseFromString(this.mammothResult.value, "text/html");

        // headings with no text/name can't be used
        this.checkEmptyHeadings(doc);

        // Canvas culls the base64 images and they pose a size problem
        this.checkBase64Images(doc);

        this.mammothResult.value = doc.documentElement.outerHTML;
    }

    /**
     * Check all the Heading 1 equivalents and see if any are empty
     * - these need to be highlighted, reported as an error and then
     *   removed before the next step
     * 
     * :param doc: the document (as parser) to check
     */
    checkEmptyHeadings(doc) {

        // get all the h1 elements
        let h1s = doc.querySelectorAll('h1');

        // loop through the h1s and check for empty text
        let empty = 0;
        for (let i = 0; i < h1s.length; i++) {
            let h1 = h1s[i];
            if (h1.innerHTML.trim() === "") {
                empty+=1;
                // insert a <span class="w2c-error"> into the h1
                const error = '<span class="w2c-error">empty heading 1</span>';
                h1.insertAdjacentHTML('beforeend', error);
            }
        }

        if (empty>0) {
                this.mammothResult.messages.push({
                    "type": "error",
                    "message": `Found ${empty} empty Heading 1s (see below). Remove and try again.`,
                });
        }
    }

    /**
     * Check the doc for any img tags using base64 encoded images
     * @param {DOM} doc 
     */

    checkBase64Images(doc) {
        // get all the img tags
        let imgs = doc.querySelectorAll('img');

        // loop through the imgs and check for base64 encoded images
        let base64 = 0;
        for (let i = 0; i < imgs.length; i++) {
            let img = imgs[i];
            if (img.src.indexOf('base64') > 0) {
                base64+=1;
                // insert a <span class="w2c-error"> into the img
                const error = '<span class="w2c-error">base64 image</span>';
                img.insertAdjacentHTML('beforebegin', error);
            }
        }
        if (base64>0) { 
            this.mammothResult.messages.push({
                "type": "error",
                "message": `Found ${base64} base64 images <small>(labeled in HTML)</small>. 
                           These will be replaced with placeholders.<br /> 
                           <small><strong>
                             <a target="_blank" href="https://djplaner.github.io/word-to-canvas-module/docs/warnings/htmlConversion.html#base64-images">For more <i class="icon-question"></i></a></strong></small>`,
                });
        }

    } 

    /**
     * Do all post mammoth conversions
     * - span.embed decoded HTML
     * - span.talisCanvasLink to a link
     */
    postConvert() {
        let parser = new DOMParser();
        let doc = parser.parseFromString(this.mammothResult.value, "text/html");

        // span.embed
        let embeds = doc.querySelectorAll('span.embed');
        // iterate over the embeds and use this.decodeEntities to decode the innerHTML
        for (let i = 0; i < embeds.length; i++) {
            let embed = embeds[i];
            embed.innerHTML = this.decodeEntities(embed.innerHTML);
        }

        // convert span.talisCanvasLink innerHTML to a link
        let links = doc.querySelectorAll('span.talisCanvasLink');
        for (let i = 0; i < links.length; i++) {
            let link = links[i];
            // create new anchor element
            let anchor = document.createElement('a');
            anchor.href = 'https://lms.griffith.edu.au/courses/252/external_tools/111';
            anchor.innerHTML = link.innerHTML;
            // replace link.innerHTML with anchor
            link.innerHTML = '';
            link.appendChild(anchor);
        }

        // remove the div.Hide
        let hiddenElems = doc.querySelectorAll('div.Hide');
        for (let i = 0; i < hiddenElems.length; i++) {
            let hiddenElem = hiddenElems[i];
            hiddenElem.parentNode.removeChild(hiddenElem);
        }

        // Content Interface pre-pends
        this.contentInterfacePreprends(doc);

        // add class TABLE_CLASS to all of the tables
        doc.querySelectorAll('table').forEach( (elem) => {
            // add class TABLE_CLASS to elem 
            TABLE_CLASS.forEach( (tableClass) => {
                elem.classList.add(tableClass);

            });
        });


        // convert the doc back to a string
        this.mammothResult.value = doc.documentElement.outerHTML;
    }

    /**
     * Add in the necessary Content Interface prepends 
     * @param {DomElement} doc - containing Mammoth html conversion
     */

    contentInterfacePreprends(doc) {
        for (const divstyle in CI_STYLE_PREPEND) {
            let selector = `div.${divstyle}`;
            // find all elements matching css selector
            doc.querySelectorAll(selector).forEach(function (elem) {
                elem.insertAdjacentHTML('afterbegin', CI_STYLE_PREPEND[divstyle]);
            });
        }

        // and styles we wish to empty and prepend
        for (const divstyle in CI_EMPTY_STYLE_PREPEND) {
            let selector = `div.${divstyle}`;
            // find all elements matching css selector
            doc.querySelectorAll(selector).forEach(function (elem) {
                elem.insertAdjacentHTML('afterbegin', CI_EMPTY_STYLE_PREPEND[divstyle]);
            });
        }
    }

    /**
     * There was an error converting the file, generate event
     * indicating error
     * @param {Object} result Mammoth result response
     */

    displayError(error) {
        this.mammothError = error;
        this.mammothResult = undefined;

        // generate mammoth-results event
        const event = new Event('mammoth-error');
        let c2m_dialog = document.querySelector('div.c2m_dialog');
        if (c2m_dialog) {
            c2m_dialog.dispatchEvent(event);
        }
    }


    /**
     * Grab the content of a file selector and run it thru Mammoth
     * - adapted from Mammoth.js demo
     * https://github.com/mwilliamson/mammoth.js/blob/master/browser-demo/demo.js
     */

    handleFileSelect(event) {
        let file = event.target.files[0];

        let reader = new FileReader();

        // where is loadEvent coming from
        reader.onload = (loadEvent) => this.callBack(loadEvent);

        reader.readAsArrayBuffer(file);
    }

    callBack(loadEvent) {
        let arrayBuffer = loadEvent.target.result;

        console.log('-------------- doing the call back');

        // TODO: more flexibility with choosing options
        // Call mammoth, if successful display result
        // but fail otherise
        mammoth.convertToHtml({ arrayBuffer: arrayBuffer }, DEFAULT_OPTIONS)
            .then((result) => this.displayResult(result))
            .catch((error) => this.displayError(error))
            .done();
        console.log('-------------- done the call back');
    }

    /**
     * Read a file from the event
     * - adapted from Mammoth.js demo
     * https://github.com/mwilliamson/mammoth.js/blob/master/browser-demo/demo.js
     */
    readFileInputEventAsArrayBuffer(event) {
        let file = event.target.files[0];

        let reader = new FileReader();

        // where is loadEvent coming from
        reader.onload = (loadEvent) => this.callBack(loadEvent);

        reader.readAsArrayBuffer(file);
    }




}

// src/models/c2m_HtmlConverter.js
/**
 * HtmlConverter.js
 * - convert a section of HTML in a defined format and convert it into
 *   a module like structure
 * Uses exceprts from the Canvas API as structure
 * https://canvas.instructure.com/doc/api/modules.html
 */


/** ModuleObject 
 {
	 // NON CANVAS content
	 // The content of the word document will be included in this data structure
	 // Will need to create an actual item object to insert into Canvas
	 'content' : string

  // CANVAS content
  // the name of this module
  "name": "Imaginary Numbers and You",
  // The number of items in the module
  "items_count": 10,
  // The contents of this module, as an array of Module Items. (Present only if
  // requested via include[]=items AND the module is not deemed too large by
  // Canvas.)
  "items": null,

  **** TODO ****
  // (Optional) the date this module will unlock
  "unlock_at": "2012-12-31T06:00:00-06:00",
  // Whether module items must be unlocked in order
  "require_sequential_progress": true,
  // IDs of Modules that must be completed before this one is unlocked
  "prerequisite_module_ids": [121, 122],
  // The API URL to retrive this module's items
  "items_url": "https://canvas.example.com/api/v1/modules/123/items",
  // The state of this Module for the calling user one of 'locked', 'unlocked',
  // 'started', 'completed' (Optional; present only if the caller is a student or
  // if the optional parameter 'student_id' is included)
  "state": "started",
  // the date the calling user completed the module (Optional; present only if the
  // caller is a student or if the optional parameter 'student_id' is included)
  "completed_at": null,
  // if the student's final grade for the course should be published to the SIS
  // upon completion of this module
  "publish_final_grade": null,
  // (Optional) Whether this module is published. This field is present only if
  // the caller has permission to view unpublished modules.
  "published": true
} */

/**ModuleItem object
 {
  // the position of this item in the module (1-based)
  "position": 1,
  // the title of this item
  "title": "Square Roots: Irrational numbers or boxy vegetables?",
  // 0-based indent level; module items may be indented to show a hierarchy
  "indent": 0,
  "type": "Assignment",

  ***** TODO *****

  // the unique identifier for the module item
  "id": 768,
  // the id of the Module this item appears in
  "module_id": 123,
  // the type of object referred to one of 'File', 'Page', 'Discussion',
  // 'Assignment', 'Quiz', 'SubHeader', 'ExternalUrl', 'ExternalTool'
  // the id of the object referred to applies to 'File', 'Discussion',
  // 'Assignment', 'Quiz', 'ExternalTool' types
  "content_id": 1337,
  // link to the item in Canvas
  "html_url": "https://canvas.example.edu/courses/222/modules/items/768",
  // (Optional) link to the Canvas API object, if applicable
  "url": "https://canvas.example.edu/api/v1/courses/222/assignments/987",
  // (only for 'Page' type) unique locator for the linked wiki page
  "page_url": "my-page-title",
  // (only for 'ExternalUrl' and 'ExternalTool' types) external url that the item
  // points to
  "external_url": "https://www.example.com/externalurl",
  // (only for 'ExternalTool' type) whether the external tool opens in a new tab
  "new_tab": false,
  // Completion requirement for this module item
  "completion_requirement": {"type":"min_score","min_score":10,"completed":true},
  // (Present only if requested through include[]=content_details) If applicable,
  // returns additional details specific to the associated object
  "content_details": {"points_possible":20,"due_at":"2012-12-31T06:00:00-06:00","unlock_at":"2012-12-31T06:00:00-06:00","lock_at":"2012-12-31T06:00:00-06:00"},
  // (Optional) Whether this module item is published. This field is present only
  // if the caller has permission to view unpublished items.
  "published": true
} 
 */


/**
 * Define the translation between a html class for h1 and Canvas item type
 */
const HTML_CLASS_TO_ITEM_TYPE = {
	'canvasFile': 'File',
	'canvasPage': 'Page',
	'existingCanvasPage': 'ExistingPage',
	'canvasDiscussion': 'Discussion',
	'canvasAssignment': 'Assignment',
	'canvasQuiz': 'Quiz',
	'canvasSubHeader': 'SubHeader',
	'canvasExternalUrl': 'ExternalUrl',
	'canvasExternalTool': 'ExternalTool'
};

class c2m_HtmlConverter {

	constructor(html) {

		this.html = html;
		this.name = '';
		this.items = [];

		// set up a div for the html to be able to use dom element methods
		this.htmlDiv = document.createElement('div');
		this.htmlDiv.innerHTML = html.trim();

		this.updateModuleTitle();
		this.updateModuleItems();

		this.dump();
	}

	/**
	 * Extract the module title from HTML
	 * Module title == div.name
	 * @param {String} html - collection of html to be converted
	 */
	updateModuleTitle() {
		// get all the div.name
		let titleDivs = this.htmlDiv.querySelectorAll('div.moduleTitle');
		// if only 1 titleDiv set it
		if (titleDivs.length === 1) {
			this.name = titleDivs[0].innerText;
			// if the name remains empty (or just whitespace) set it to Untitled
			if (this.name.trim() === '') {
				this.name = 'Untitled';
			}
		} else {
			console.error(
				`c2m_HtmlConverter -> updateModuleTitle: wrong # (${titleDivs.length}) div.name found `);
		}

	}

	/**
	 * Create an array of item objects 
	 *    { title: '', content: '', type: '' }
	 * from the current html.
	 */
	updateModuleItems() {

		// get all the h1 elements
		let h1s = this.htmlDiv.querySelectorAll('h1');

		this.items = [];

		// for each h1, get the following siblings until the next h1
		//h1s.forEach((h1, index) => {
		h1s.forEach((h1) => {
			let item = {};
			item.title = h1.innerText;
			item.type = this.getType(h1);
			item.content = this.getContent(h1, item.type);
			item.error = false;

			// is text a valid URL by regex
			if (item.type === "ExternalUrl" || item.type === "ExternalTool") {
				if (!item.content.match(/^(http|https):\/\/[^ "]+$/)) {
					item.error = true;
					item.errorString = "Couldn't find a valid URL";
				}
			}

			// A File should generate two specific bits of content
			// - displayName - the name of the item to be added to the module
			// - fileName - the name of the file to be searched
			// - fileUrl - optional URL for the file, if already provided???? TODO
			if (item.type === "File") {
				let contentObj = {
					displayName: item.title,
					fileName: item.title
				}
				// if item.content is not empty, then it must be the filename
				if ( item.content.trim()!=='' ) {
					contentObj.fileName = item.content;
				}
				item.content = contentObj;
			}

			// TODO set type from the class of h1
			this.items.push(item);
		});
		this.items_count = this.items.length;
	}

	/**
	 * Check the class of the h1 element to determine the type of item
	 * 
	 * @param {DomElement} h1 
	 * @returns {String} item's canvas type
	 */
	getType(h1) {
		// get the class of the h1
		let className = h1.className;
		// if the class is in the HTML_CLASS_TO_ITEM_TYPE map, return the value
		if (HTML_CLASS_TO_ITEM_TYPE[className]) {
			return HTML_CLASS_TO_ITEM_TYPE[className];
		}
		// default to a page
		return 'Page';
	}

	/**
	 * Given a dom element, get all the content until the next h1
	 * @param {dom eLement} h1 
	 * @param {String} type - the type of Canvas item
	 */
	getContent(h1, type) {
		let content = this.nextUntil(h1, 'h1');

		// for an externalUrl, tool and file, we want the text and need to check
		// that what is left is a URL (or similar)
		if (["ExternalUrl", "ExternalTool", "File"].includes(type)) {
			let text = "";
			// loop thru each DomElement in content list and add innerText to text
			content.forEach((element) => {
				text += element.innerText;
			});
			return text;
		}

		// for other types convert content elements into html string
		content = content.map(elem => elem.outerHTML);
		// join content array strings into single string
		content = content.join('');

		return content;
	}

	/** 
	 * 
	 * Get all following siblings of each element up to but not including the element matched by the selector
	 * (c) 2017 Chris Ferdinandi, MIT License, https://gomakethings.com
	 * @param  {Node}   elem     The element
	 * @param  {String} selector The selector to stop at
	 * @param  {String} filter   The selector to match siblings against [optional]
	 * @return {Array}           The siblings
	 */
	nextUntil(elem, selector, filter) {

		// Setup siblings array
		var siblings = [];

		// Get the next sibling element
		elem = elem.nextElementSibling;

		// As long as a sibling exists
		while (elem) {

			// If we've reached our match, bail
			if (elem.matches(selector)) break;

			// If filtering by a selector, check if the sibling matches
			if (filter && !elem.matches(filter)) {
				elem = elem.nextElementSibling;
				continue;
			}

			// Otherwise, push it to the siblings array
			siblings.push(elem);

			// Get the next sibling element
			elem = elem.nextElementSibling;

		}

		return siblings;

	}


	/**
	 * Simple dump of current object via console.log
	 */
	dump() {
		console.log('c2m_HtmlConverter -> dump:');
		console.log(`name: ${this.name} with ${this.items_count} items`);
		// display each item
		this.items.forEach((item, index) => {
			console.log(`item ${index}: ${item.title} (type:${item.type})`);
			console.log(item);
		});
	}
}

// src/models/canvas/c2m_Modules.js
/**
 * Model object for dealing with Canvas modules via the 
 * Canvas API
 * 
 * Data members
 * - csrfToken - Canvas API token
 * - courseId - Canvas course ID 
 * - allModules - JSON for all modules in course - results of getAllModules
 */


class c2m_Modules {
    constructor(courseId, token) {
        this.courseId = courseId;
        this.csrfToken = token;

    }

    /**
     * Canvas API to get info on all modules for the courseId
     * - async function to simplify handling the results???
     * @param {Boolean} items default true - include items for each module 
     */
    async getAllModules(items = true) {
        // handle the options
        let itemsOption = "?include=items";
        let pagesOption = "&per_page=100";
        if (!items) {
            itemsOption = "";
            pagesOption = "?per_page=100";
        }

        let callUrl = `/api/v1/courses/${this.courseId}/modules${itemsOption}${pagesOption}`;


        await fetch(callUrl, {
            method: 'GET', credentials: 'include',
            headers: {
                "Accept": "application/json",
                "X-CSRF-Token": this.csrfToken
            }
        })
            .then(this.status)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                this.allModules = json;
                console.log(`c2m_Modules -> getAllModules: ${this.allModules}`);
                console.log(json);
            })
            .catch((error => {
                console.error(`c2m_Modules -> getAllModules error: ${error}`);
            }));
    }

    /**
     * Use Canvas API create a new module with current name in 
     * first place ready to be populate with item
     * 
     */
    async createModule(newModule) {

        let callUrl = `/api/v1/courses/${this.courseId}/modules`;

        // clear the error ready for any fresh error
        this.createdModuleError = undefined;
        this.createdModule = undefined;
        this.createdModuleItems = [];

        await fetch(callUrl, {
            method: 'POST', credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-CSRF-Token": this.csrfToken
            },
            body: JSON.stringify({
                "module": {
                    "name": newModule.name,
                    "position": 1
                }
            })
        })
            .then(this.status)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                this.createdModule = json;
                console.log(`c2m_Modules -> createModules: ${this.createdModule}`);
                console.log(json);
                this.dispatchEvent( 'w2c-empty-module-created');
            })
    }

    /**
     * Add an existing item to the current createdModule
     * @param {int} index - position in module
     */

    async addModuleItem(index) {
        // TODO check index within items.length
        let item = this.items[index];
        let moduleId = this.createdModule.id;

        let callUrl = `/api/v1/courses/${this.courseId}/modules/${moduleId}/items`;

        let body = {
            "module_item": {
                "title": item.title,
                "position": index+1, // index+1 because position is 1-based, not 0
                "type": item.type,
            }
        };

        if ([ "File", "Discussion", "Assignment", "Quiz"].includes(item.type) ) {
            body.module_item['content_id'] = item.createdItem.id;
        }

        if (item.type === "Page" || item.type==="ExistingPage") {
//            body.module_item['content_id'] = item.createdItem.page_id;
            body.module_item['page_url'] = item.createdItem.url;
            body.module_item['type'] = 'Page';
        }

        if (["ExternalUrl","ExternalTool"].includes(item.type)) {
            // TODO need to do more to extract the URL here
            body.module_item['external_url'] = item.content;
        }
//        console.log('creating module item');
//        console.log(body);

        await fetch(callUrl, {
            method: 'POST', credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-CSRF-Token": this.csrfToken
            },
            body: JSON.stringify(body)
        })
            .then(this.status)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                // update the createdItem property for the item 
                // with the results of the JSON call
                item['addedItem'] = json;

                // if we have a SubHeader dispatch('w2c-item-found-created')
//                if (item.type === "SubHeader") {
//                    this.dispatchEvent( 'w2c-item-found-created',{'item':index});
 //               } else {
                this.dispatchEvent( 'w2c-module-item-added',{'item':index});
  //              }
            })

    }


    /**
     * Create anew page using the title and the content of the item object
     * @param {Number} index basic information about page to create
     */
    async createPage(index) {
        let item = this.items[index];
        let callUrl = `/api/v1/courses/${this.courseId}/pages`;

        await fetch(callUrl, {
            method: 'POST', credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-CSRF-Token": this.csrfToken
            },
            body: JSON.stringify({
                "wiki_page": {
                    "title": item.title,
                    "body": item.content,
                    "editing_roles": "teachers"
                }
            })
        })
            .then(this.status)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                // push json onto this.createdItems array
                item.createdItem = json;
                console.log(`c2m_Modules -> createPage: index ${index} title ${item.createdItem.title}`);
                console.log(json);
                this.dispatchEvent( 'w2c-item-found-created',{'item':index});
            })

    }

    /**
     * Call find file API using this.fileLinks array 
     * {
     *   itemIndex: index of this.items i.e. the module item this link belongs to
     *   name:  name of the file
     *   descriptor:  descriptor for link
     *   status:
     *   response:
     * }
     * @param {*} index 
     */

    async findFile(index) {
        let file = this.fileLinks[index];

        let searchTerm = file.name;

        let callUrl = `/api/v1/courses/${this.courseId}/files?` + new URLSearchParams(
            {'search_term': searchTerm});

        // indicate that we're about to start searching
        file.status = 'searching';

        await fetch(callUrl, {
            method: 'GET', credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-CSRF-Token": this.csrfToken,
            }
        }) 
        .then(this.status) 
        .then((response) => { 
            return response.json(); 
        }) 
        .then((json) => {
            // json - list of files from Canvas API matching request
            // see if we can find our file (fileLinks[index]) in the list
            this.findFileInList(json, index);
            // do the same event, regardless, the item will be set to indicate
            // success or failure
            this.dispatchEvent( 'w2c-file-found',{'file':index});
        }).catch((error) => {
            console.log(`canvas::c2m_Modules::findFile - caught error - ${error}`);
            file.status = 'error';
            this.dispatchEvent( 'w2c-file-found',{'file':index});
        });
    }

    /**
     * Find an existing item based on the title/name of this.items[index]
     * Support different types: Page, File, Discussion, ...(Quiz, Assignment)
     * Set the createdItem to some sort of FAILURE if didn't find
     * @param {Number} index basic information about page to create
     */
    async findItem(index) {
        let item = this.items[index];
        let type = item.type;

        // depending on type, use a different URL
        const TYPE_API_URL = {
            "ExistingPage": `/api/v1/courses/${this.courseId}/pages?`,
            "File": `/api/v1/courses/${this.courseId}/files?`,
            "Discussion": `/api/v1/courses/${this.courseId}/discussion_topics?`,
            "Assignment" : `/api/v1/courses/${this.courseId}/assignments?`,
            "Quiz" : `/api/v1/courses/${this.courseId}/quizzes?`
        }

        let searchTerm = item.title;

        // if looking for a File item, we need to search for the filename
        if (type==="File") {
            searchTerm = item.content.fileName;
        } 

        // do a List pages api call
        // https://canvas.instructure.com/doc/api/pages.html#method.wiki_pages_api.index
        let callUrl = TYPE_API_URL[type] + new URLSearchParams({'search_term': searchTerm});

        await fetch(callUrl, {
            method: 'GET', credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-CSRF-Token": this.csrfToken,
            }
        })
            .then(this.status)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                // JSON now contains list of Page objects
                // need to search them for a match and return
                // the matched Page object
                this.findItemInList(json, index);
                // do the same event, regardless, the content of item.createdItem
                // will indicate failure or not
                this.dispatchEvent( 'w2c-item-found-created',{'item':index});
            })
    }

    /**
     * Search through a list of File objects to find a File that matches
     * (exactly) the title for the item at index
     * If found, set the page object, otherwise not found error
     * https://canvas.instructure.com/doc/api/plagiarism_detection_submissions.html#File
     * @param {Array} list - json list of objects returned from Canvas API
     * @param {Number} index - to item object we're looking for a match for
     */

    findItemInList(list, index) {
        let item = this.items[index];
        let type = item.type;

        // loop through the discussions
        for (let i = 0; i < list.length; i++) {
            let element = list[i];
            let elementName = '';
            let itemName = item.title.trim();

            // the name to match in the list element, depends on type
            if ( type==="File") {
                elementName = element.display_name.trim();
                itemName = item.content.fileName.trim();
            } else if ( type==="Assignment") {
                elementName = element.name.trim();
            } else {
                elementName = element.title.trim();
            }
            // if itemName is substr of fileName
            if ( elementName.includes(itemName)) {
                item.createdItem = element;
                return;
            }
        }
        item.createdItem = {
            "error": `file not found: ${item.title}`,
            "index": index
        }
    }

    /**
     * Look for the file we're after this.fileLinks[index] in the list
     * of JSON 
     * Set the item.status and item.response respectively
     * @param {Array} list - JSON list of Files returned by Canvas API 
     * @param {Integer} index - index info this.fileLinks list of required files
     */

    findFileInList( list, index ) {
        let file = this.fileLinks[index];

        for (let i = 0; i < list.length; i++) {
            let element = list[i];
            let elementName = element.display_name.trim();
            let fileName = file.name.trim();

            if ( elementName.includes(fileName)) {
//                console.log(
//                    `findFileInList: elementName ${elementName} includes ${fileName}`);
                file.response = element;
                file.status = 'found';
                return;
            }
        }
        file.status = 'not found';
    }

    /*
     * Function which returns a promise (and error if rejected) if response status is OK
     * @param {Object} response
     * @returns {Promise} either error or response
     */
    status(response) {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response)
        } else {
            console.log("---- STATUS bad response status");
            console.log(response);
            return Promise.reject(new Error(response.statusText))
        }
    }
    /*
     * Function which returns json from response
     * @param {Object} response
     * @returns {string} json from response
     */
    json(response) {
        return response.json();
    }

    /**
     * dispatch an event on the w2c_dialog box 
     * @param {String} eventName 
     * @param {Object} eventData 
     */
    dispatchEvent(eventName, eventData = {}) {
        const event = new CustomEvent(eventName, {
            detail: eventData
        });
        let c2m_dialog = document.querySelector('div.c2m_dialog');
        if (c2m_dialog) {
            c2m_dialog.dispatchEvent(event);
        }
    }
}

// src/models/c2m_Model.js
/**
 * Model used to 
 * - track which stage of the conversion process is current
 * - store details about (separate classess to do this?)
 *   - Word document
 *   - Mammoth object - method to convert to HTML
 *   - conversion to HTML results
 *   - method for converting to Canvas Module data structure
 *   - method for inserting module into Canvas
 * 
 */

// Import the c2m_Converter class





// Define enum for stage


class c2m_Model {
    constructor(controller) {

        this.controller = controller;
        // indicate which of the four stages we're up to
        //		this.stage = c2m_initialise;
        this.wordConverter = new c2m_WordConverter();
        //		this.moduleCreator = new c2m_ModuleCreator();
        this.canvasModules = new c2m_Modules(
            this.controller.courseId, this.controller.csrfToken
        );

    }

    getCurrentModules() {
        // pre-populate canvasModules with the items
        // it will add the property createdItem to each item
        this.canvasModules.getAllModules()
            .then(() => {
                console.log(`c2m_Model -> getAllModules: finished `);
                console.log(this.canvasModules.allModules);

            });
        // TODO catch any errors???
    }

    /**
     * Generate API request to create new module based on module title
     * in this.htmlConverter. When finished will generate a signal accepted
     * by View that will call createModuleItems
     */
    createModule() {
        // No need to do a check - previous step should take care of this
        this.canvasModules.items = this.htmlConverter.items;
        this.canvasModules.createModule(this.htmlConverter)
            .then(
                // this is done in modules, because that's where it 
                // actually waits
                //                this.dispatchEvent('w2c-empty-module-created')
            )
    }

    /**
     * Generate events and appropriate infrastrcutre to find all the 
     * necessary canvasFileLink spans
     */

    findFileLinks() {
/*        console.log("-----------------------------");
        console.log("-----------------------------");
        console.log("FIND FILE LINKS");
        console.log("-----------------------------");
*/
        let items = this.htmlConverter.items;
//        console.log(items);

        // set up infrastructure
        // - this.fileLinks array of objects for required fileLinks
        //   - name of file link
        //   - index of the item for which it's required
        //   - status of find API call
        //   - response from find API call
        // - this.numFoundFileLinks - count of the number file links found

        this.canvasModules.fileLinks = [];
        this.canvasModules.numFoundFileLinks = 0;

        let parser = new DOMParser();

        // loop thru this.htmlConverter.items
        for (let i = 0; i<items.length; i++ ) {
            // extract all span.canvasFileLink from the body of the item
            let body = items[i].content;
            console.log('item ${i} content');
            console.log(body);
            let bodyDoc = parser.parseFromString(body, "text/html");
            // find all the canvasFileLinks
            let fileLinks = bodyDoc.querySelectorAll('span.canvasFileLink');

            console.log(`found ${fileLinks.length} file links in item ${i}`);

            // loop thru the fileLinks
            for (let j = 0; j < fileLinks.length; j++) {
//                console.log(fileLinks[j]);

                let {name, descriptor} = this.setNameDescriptor( fileLinks[j]);

                let newFileLink = {
                    itemIndex: i,
                    name: name,
                    descriptor: descriptor,
                    status: "initialised",
                    response: undefined
                };
                // append newFileLink to fileLinks
                this.canvasModules.fileLinks.push(newFileLink);
            }
        }

//        console.log("Found the following links")
//       console.log(this.canvasModules.fileLinks);

        // if there are no fileLinks
        if (this.canvasModules.fileLinks.length === 0) {
            // ignore this step and start finding/creating other items
            this.findOrCreateModuleItems();
        }

        // loop through each fileLinks and call find API
        for (let i = 0; i < this.canvasModules.fileLinks.length; i++) {
            this.canvasModules.findFile(i).then(() => {});
        }
    }

    /**
     * Check if the fileLink element has a parent that is a link
     * and which only contains fileLink -- indicating a need to change
     * name (filename) to the value in the link href and descriptor as
     * the body of the span (fileLink)
     * @param {DOMElement} fileLink - element containins <span class="canvasFileLink">
     * @returns {Object} - {name, descriptor}
     */
    setNameDescriptor(fileLink) {
        let parent = fileLink.parentElement;
        // set default values (if there's no link wrapper)
        let name = fileLink.innerText;
        let descriptor = fileLink.innerText;

        if (parent.tagName === 'A') {
            // how many children of parent?
            let children = parent.children;
            if (children.length === 1) {
                // if there is only one child, it's the fileLink
                // so change the name and descriptor
                name = decodeURI(parent.href);
                // get just the text after the last /
                name = name.substring(name.lastIndexOf('/') + 1);
                descriptor = decodeURI(parent.innerText);
            } 
        }

        return { name, descriptor };
    }

    /**
     * create each of the module items for the newly created
     *   this.canvasModules.createdModule
     * Loop thru each this.htmlConverter.items and create the item
     * and create the moduleItem
     */
    findOrCreateModuleItems() {
        console.log('c2m_Model -> findOrCreateModuleItems');
        //		console.log('Shogin htmlConverter with item information')
        //		console.log(this.htmlConverter);

        // loop thru array this.htmlConverter.items and
        // call createModuleItem
        let items = this.htmlConverter.items;
        //		const moduleId = this.canvasModules.createdModule.id;

        for (let i = 0; i < items.length; i++) {
            // find the item we're trying to link to
            this.findOrCreateItem(i);
        }
        console.log("------------- END of create module items")
    }


    /**
     * For a given this.htmlConverter.items[index] replace any
     *   <span class="canvasFileLink"> as appropriate
     * Two cases
     * - just a span with a filename
     * - span wrapped with a link
     * 
     * Only called when creating a new page
     * 
     * @param {*} index 
     */

    replaceCanvasFileLinks( index ){
        // are there any this.canvasModules.fileLinks with itemIndex = index?
        let fileLinks = this.canvasModules.fileLinks.filter(
            fileLink => fileLink.itemIndex === index
        );
        // if there are no fileLinks, then there's nothing to do
        if (fileLinks.length === 0) {
            return;
        }
        console.log("------------- replaceCanvasFileLinks");

        // Parse the item content for span.fileLinks and replace
        let item = this.htmlConverter.items[index];
        let parser = new DOMParser();
        let itemDoc = parser.parseFromString(item.content, "text/html");

        // the number fileLinks found should match the number of links we find
        // below
        let htmlFileLinks = itemDoc.querySelectorAll('span.canvasFileLink');
        // check length of htmlFileLinks and fileLinks
        if (htmlFileLinks.length !== fileLinks.length) {
            console.log(
                `replaceCanvasFileLinks: number of fileLinks ${fileLinks.length} \
                does not match number of htmlFileLinks ${htmlFileLinks.length}`);
        }

        // find and replace all the span.canvasFileLink
        for (let i = 0; i < htmlFileLinks.length; i++) {
            if ( fileLinks[i].status === "found" ) {
                let response = fileLinks[i].response; 
                let fileUrl = `https://${document.host}/courses/${this.canvasModules.courseId}/files/${response.id}`;
                // remove "/download?download_frd=1" from the end of the url

                // What we're going to replace <span class="canvasFileLink"> with
                let template = `
                <a id="${response.id}" class="instructure_file_link instructure_scribd_file inline_disabled" 
                   href="${fileUrl}?wrap=1" target="_blank" rel="noopener" 
                   data-canvas-previewable="true" 
                   data-api-endpoint="${fileUrl}" data-api-returntype="File">
                   ${fileLinks[i].descriptor}
                </a>`;

                // find the link
                let originalLink = htmlFileLinks[i].outerHTML;

                // replace originalLink with template in item.content
                console.log(`replaceCanvasFileLinks: replacing **${originalLink}** with **${template}**`);
                item.content = item.content.replace(originalLink, template);
//                let newLink = parser.parseFromString(template, "text/html");
                // TODO if fileLinks name and descriptor don't match, then we have
                // a htmlFileLinks with a anchor wrapper, replace the parent
 //               htmlFileLinks[i].parentNode.replaceChild(newLink.body.firstElementChild, htmlFileLinks[i]);
//                console.log(htmlFileLinks[i]);
                console.log(item.content);
                //
            } else {
                // replace the span.canvasFileLink with an error
            }
        }
    }

    /**
     * Depending on item type and contents, either find the matching
     * existing item or create a new item
     * When item found/created 
     * - update the local item data structure
     * - generate signal indicating done 
     * 
     * Exactly what happens will be dependent upon type of item
     * - Page - create a new page (always)
     * - SubHead - nothing to do
     * - External Url - nothing to create
     * - File - need to find - can't create
     * - Discussion - find or create
     * - ExternalTool - ???
     * - Quiz - find
     * Default - if unable to find or create the necessary type
     * then create a sub-head with an error message
     * @param {Number} index - indicate into items list for the item being found/created
     */

    findOrCreateItem(index) {
        let item = this.canvasModules.items[index];
        // switch on item.type
        console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCC");
        console.log("findORCreateItem");

        switch (item.type) {
            case 'Page':
                this.replaceCanvasFileLinks(index);
                // TODO could do check of item to see if trying to find
                // an existing page
                // create a new page
                this.canvasModules.createPage(index).then(() => {
                });
                break;
            case 'ExistingPage':
                this.canvasModules.findItem(index).then(() => {});
                break;
            case 'SubHeader':
                // Don't need to find/create just generate event
                this.dispatchEvent('w2c-item-found-created', { item: index });
//                this.canvasModules.addModuleItem(index).then(() => {
//                });
                break;
            case 'File':
                this.canvasModules.findItem(index).then(() => {});
                break;
            case 'Discussion':
                this.canvasModules.findItem(index).then(() => {});
                break;
            case 'Assignment':
                this.canvasModules.findItem(index).then(() => {});
                break;
            case 'Quiz':
                this.canvasModules.findItem(index).then(() => {});
                break;
            case 'ExternalUrl':
                // ?? don't need to create anything, can just add it below?
                this.dispatchEvent( 'w2c-item-found-created',{'item':index});
                break;
            case 'ExternalTool':
                // ?? don't need to create anything, can just add it below?
                this.dispatchEvent( 'w2c-item-found-created',{'item':index});
                break;
            default:
                console.log(`Not yet creating items of type ${item.type}`);
                break;
        }
    }

    /**
     * called once module has been created and all items found or created
     * Will loop through all the items of the new module and generate
     * API calls to add them in order to the module 
     */
    addItemsToModule() {
        console.log('c2m_Model -> addItemsToModule');

        // loop thru array this.htmlConverter.items and
        // call createModuleItem
        //		let items = this.htmlConverter.items;
        //		const moduleId = this.canvasModules.createdModule.id;

        for (let i = 0; i < this.canvasModules.items.length; i++) {
            // find the item we're trying to link to

            // don't need to add some items
 //           const notToAdd = ['SubHeader'];

//            let item = this.canvasModules.items[i];
            this.addModuleItem(i);
        }
    }


    /**
     * Add an existing item to the current module
     * @param {Integer} moduleId id module to add item to
     * @param {Object} item detail about the item to add
     * @param {Integer} itemIndex the 0-based index for the item array +1 for Canvas position 
     */
    addModuleItem(itemIndex) {

        console.log('Shogin createdModuleItem')

        // may need to pass in item order
        //this.canvasModules.addModuleItem(moduleId, itemIndex + 1, item)
        this.canvasModules.addModuleItem(itemIndex)
            .then(() => {
                // TODO generate signal when item is added
//                console.log(`c2m_Model -> createModuleItems: item ${itemIndex + 1} - ${item.title} created`);
//                console.log(this.canvasModules.createdModuleItems);
            });

    }

    convertWordDoc(event) {
        console.log('c2m_Model -> convertWordDoc')

        try {
            this.wordConverter.handleFileSelect(event);
        }
        catch (e) {
            console.error(`c2m_Model -> convertWordDoc error: ${e}`);
        }
    }

    
    /**
     * Perform any necessary cleanup of the HTML generated by Mammoth
     */
    postProcessMammothResult() {
        // create dom element from mammoth result
        let parser = new DOMParser();
        let doc = parser.parseFromString(this.wordConverter.mammothResult.value, "text/html");

        // remove any span.w2c-error 
        this.removeSpanErrors(doc);

        // replace base64 images with placeholder images
        this.replaceBase64Images(doc);

        this.wordConverter.mammothResult.value = doc.documentElement.outerHTML;
    }

    /**
     * remove all the span.w2c-error elements from the document
     * @param {DOM} doc 
     */
    removeSpanErrors(doc) {
        // find all span.w2c-error elements
        doc.querySelectorAll('span.w2c-error').forEach( (elem) => {
            elem.remove();
        });
    }

    replaceBase64Images(doc) {
        // find all img elements
        doc.querySelectorAll('img').forEach( (elem) => {
            // if the src starts with data:
            if (elem.src.startsWith('data:')) {
                const width = 320;
                const height = 200;
                // replace with placeholder image
                elem.src = `https://dummyimage.com/${width}x${height}/000/fff&text=Base64Image`;
            }
        });
    }

    /**
     * Convert Mammoth result HTML into a dummy Canvas module data 
     * structure to present to the user
     */
    testHtmlToModule() {
        // if there's no result in the mammoth object, error
        if (
            !Object.prototype.hasOwnProperty.call(this.wordConverter, 'mammothResult') ||
            !Object.prototype.hasOwnProperty.call(this.wordConverter.mammothResult, 'value')) {
            console.error('c2m_Model -> testHtmlToModule: no mammoth result');
            return;
        }

        this.htmlConverter = new c2m_HtmlConverter(this.wordConverter.mammothResult.value);
        this.htmlConverter.dump();

    }

    /**
     * dispatch an event on the w2c_dialog box 
     * @param {String} eventName 
     * @param {Object} eventData 
     */
    dispatchEvent(eventName, eventData = {}) {
        const event = new CustomEvent(eventName, {
            detail: eventData
        });
        let c2m_dialog = document.querySelector('div.c2m_dialog');
        if (c2m_dialog) {
            c2m_dialog.dispatchEvent(event);
        }
    }

}

// src/c2m_controller.js
/* eslint-disable no-unused-vars */
/**
 * c2m_controller.js
 */


//import { c2m_View } from './views/c2m_View.js';










// Define the states

const c2m_Initialised = "c2m_Initialised";
const c2m_ChooseWord = "c2m_ChooseWord";
const c2m_CheckHtml = "c2m_CheckHtml";
const c2m_CheckModule = "c2m_CheckModule";
const c2m_Completed = "c2m_Completed";
//const c2m_Close = "close";


class c2m_Controller {
	constructor() {

		this.currentState = c2m_Initialised;
		this.csrfToken = this.getCsrfToken();
		this.courseId = this.getCourseId(); // TODO actually get the course id

		// ?? passed to views for the services it provides with
		// Mammoth and Canvas Module converters??
		this.model = new c2m_Model(this);

		this.render();
	}

	/**
	 * Following adapted from https://github.com/msdlt/canvas-where-am-I
	 * Function which returns csrf_token from cookie see: 
	 * https://community.canvaslms.com/thread/22500-mobile-javascript-development
	 * @returns {string} csrf token
	 */
	getCsrfToken() {
		var csrfRegex = new RegExp('^_csrf_token=(.*)$');
		var csrf;
		var cookies = document.cookie.split(';');
		for (var i = 0; i < cookies.length; i++) {
			var cookie = cookies[i].trim();
			var match = csrfRegex.exec(cookie);
			if (match) {
				csrf = decodeURIComponent(match[1]);
				break;
			}
		}
		return csrf;
	}

	/**
	* Following adapted from https://github.com/msdlt/canvas-where-am-I
	* Function which gets find course id from wherever it is available - currently ONLY ON WEB
	* @returns {string} id of course
	*/

	getCourseId() {
		let courseId = ENV.COURSE_ID || ENV.course_id;
		if (!courseId) {
			var urlPartIncludingCourseId = window.location.href.split("courses/")[1];
			if (urlPartIncludingCourseId) {
				courseId = urlPartIncludingCourseId.split("/")[0];
			}
		}
		return courseId;
	}

	render() {
		console.log('----------------- render -----------------');
		console.log(`rendering state ${this.currentState}`);
		console.log(` -- token ${this.csrfToken}`);

		// select li.section > a.syllabus
/*		const syllabus = document.querySelector('li.section > a.syllabus');
		if (syllabus) {
			syllabus.style.display = 'none';
		}*/

		// inject on module as well
		this.injectCss();
		// but if only on a pages page, finish up
		let currentPageUrl = window.location.href;
		if (currentPageUrl.match(/courses\/[0-9]*\/pages/)) {
			return;
		}

		const view = eval(`new ${this.currentState}View(this.model, this)`);
		view.render();
	}

	/**
	 * Inject the CI CSS into a Canvas page 
	 */
	injectCss() {
//		let css = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/djplaner/word-to-canvas-module@master/css/content-interface.css">';
		let css = '<link rel="stylesheet" href="https://raw.githack.com/djplaner/word-to-canvas-module/main/css/content-interface.css">';

		// inject css string element at end of head
		document.getElementsByTagName("head")[0].insertAdjacentHTML('beforeend', css);
	}

	/**
	 * Event handler for clicks on navigation buttons between app states.
	 * Given the new state, modify the model and render
	 * @param {String} newState 
	 */

	handleClick(newState) {
		console.log(`handle click switching to ...${newState}`);

		// if c2m_completed moving to c2m_initialised, reload the page
		if (this.currentState===c2m_Completed && newState===c2m_Initialised) {
			window.location.reload();
		}

		this.currentState = newState;
		this.render();
	}

	/**
	 * Event handler for uploading a Word doc
	 * Use the model's convertWordDoc method, modify state to checkHtml
	 * and render
	 */

	handleUpload(event) {
		console.log("handle upload");

		// do the conversion, it will be async
		// handleUpdateResults will be called when it is done
		this.model.convertWordDoc(event);

		// move the state on and render, ready for the results
		this.currentState = c2m_CheckHtml;
		this.render();
	}

}

// src/index.js
/**
 * Launch the c2m controller and do any additional pre-setup
 * Main task is to wait for the entire Canvas page to load
 * before launch
 */

function canvas2Module(){

 window.addEventListener('load', function(){
        // getting very kludgy here, haven't got a good solution...yet #14
        // - module content is dynamically loaded, wait (dumbly) for it to finish
//        this.setTimeout(
//            () => {
                let controller = new c2m_Controller();
 //           }, 2000);
    });
}

/**
 * Initial launch code
 */
canvas2Module();