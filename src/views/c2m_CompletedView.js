/* eslint-disable no-undef */
/**
 * c2m_CompletedView.js
 * Handles the completed view state. i.e. user has clicked to create a new module
 * from a converted Word doc. This view will create the new view and display the 
 * result
 */
/* jshint: esversion: 6 */

import { c2m_View } from './c2m_View.js';


const COMPLETE_HTML = `

<div class="item-group-container" id="w2c-container">
  <div class="item-group-condensed context_module">

    <div class="ig-header header">
       <span class="name">.docx 2 + Canvas Module</span>
       <span class="w2c-version"></span>
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
  <h4 id="w2c-completion-summary" class="text-success"></h4>
  <div id="w2c-summary">
  <p>The module "<em><span id="w2c-module-name"></span></em>" was created with 
  <span id="w2c-module-num-items"></span> items.</p>
  <p>Close this dialog to view the module and then choose to <a href="https://community.canvaslms.com/t5/Instructor-Guide/How-do-I-move-or-reorder-a-module/ta-p/1150">
  move it</a> to its proper place.</p>
  </div>
  <div id="w2c-completion-category">
     <p>Summary of errors:</p>
    <ul id="w2c-conversion-errors">
      <li> <span id="w2c-num-add-errors">0</span> errors adding items to the module.</li>
      <li> <span id="w2c-num-image-errors">0</span> errors trying to link to images in the Canvas files area.</li>
      <li> <span id="w2c-num-file-errors">0</span> errors trying to link to files in the Canvas files area.</li>
    </ul>
  </div>
</div>


<div class="w2c-error" style="display:none">
  <h4>Problem with creating the module</h4>
  <p>Unable to create the new Module. Error message:
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

div#w2c-completion-category {
}

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

export default class c2m_CompletedView extends c2m_View {


    constructor(model, controller) {
        console.log("c2m_CompletedView constructor --------------");
        super(model, controller);
    }

    /**
     * Start the call to create the module and set up the display
     * once created an event will cause "renderUpdate"
     * 
     * All events require
     * - an event name/label
     * - an intiator
     * - an event handler (which also calls the next initiator in sequence)
     */
    render() {
        console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX 4. Complete");

        let c2mDiv = this.createEmptyDialogDiv();

        // initialise some error variables
        this.imageLinkErrors = 0;
        this.fileLinkErrors = 0;

        // register the event handlers for module creation
        //c2mDiv.addEventListener('w2c_module_created', this.renderCreationResults.bind(this));
        c2mDiv.addEventListener(
            'w2c-empty-module-created', this.checkEmptyModuleCreated.bind(this));
        c2mDiv.addEventListener(
            'w2c-imageLink-found', this.checkImageLinkFound.bind(this));
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

        this.addW2cVersion();
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
        this.numItemErrors = 0;
        this.findImageMessage = false;
        this.model.findImageLinks();
        //this.model.findFileLinks();
        //        this.model.findOrCreateModuleItems();
    }

    /**
 * Event handler for the w2c-imageLink-found event.
 * ???
 * Call the file link intiator
 */

    checkImageLinkFound(e) {
        let index = e.detail.file;
        let image = this.model.canvasModules.imageLinks[index];

        if (!this.findImageMessage) {
            this.findImageMessage = true;
            // first image found, update the progress list
            this.addProgressList(
                `<span class="text-info">Trying to find links for ${this.model.canvasModules.imageLinks.length} images</span>`
            );
        }

        // check that the image has been found correctly
        if (image.status === "found") {
            if (image.response.mime_class === "image") {
                this.addProgressList(
                    `Link for image named <em>${image.name}</em>: found`);
            } else {
                this.addProgressList(
                    `<span class="text-error">Wanted image file named 
                    <em><span class="w2c-broken-image">${image.name}</a></em> 
                    but found <em>${image.response.mime_class}</span>`
                );
                this.imageLinkErrors += 1;
            }
        } else {
            // failed to find it
            this.addProgressList(
                `<span class="text-error">Link for image named 
                   <em><span class="w2c-broken-image">${image.name}</span></em>: 
                   not found</span>`
            );
            this.imageLinkErrors += 1;
        }

        // increment the number of files we've heard about
        this.model.canvasModules.numFoundImageLinks += 1;


        // if we've heard from all 
        if (this.model.canvasModules.numFoundImageLinks === this.model.canvasModules.imageLinks.length) {

            if (this.imageLinkErrors === 0) {
                this.addProgressList(
                    `<span class="text-success">All image links found</span>`
                );
            } else {
                this.addProgressList(
                    `<span class="text-error">Errors finding image links: ${this.imageLinkErrors} </span>`
                );
            }
            // then we've found all the files
            // so now we can find or create the items
            // TODO but not yet
            this.model.findFileLinks();
        }

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

        if (this.model.canvasModules.numFoundFileLinks === 0) {
            // first image found, update the progress list
            this.addProgressList(
                `<span class="text-info">Trying to find links for ${this.model.canvasModules.fileLinks.length} files</span>`
            );
        }

        // check that the file has been found correctly
        if (file.status === "found") {
            // add to the progress display
            this.addProgressList(
                `File <em>${file.name}</em>: found`);
        } else {
            // failed to find it
            this.addProgressList(
                `<span class="text-error">File 
                <em><span class="w2c-broken-file">${file.name}</span></em>: not found</span>`
            );
            this.fileLinkErrors += 1;
        }

        // increment the number of files we've heard about
        this.model.canvasModules.numFoundFileLinks += 1;


        // if we've heard from all 
        if (this.model.canvasModules.numFoundFileLinks === this.model.canvasModules.fileLinks.length) {
            if (this.fileLinkErrors === 0) {
                this.addProgressList(
                    `<span class="text-success">${this.model.canvasModules.numFoundFileLinks} of ${this.model.canvasModules.fileLinks.length} files found</span>`
                );
            } else {
                this.addProgressList(
                    `<span class="text-error">${this.model.canvasModules.numFoundFileLinks} of ${this.model.canvasModules.fileLinks.length} files found
                    - with ${this.fileLinkErrors} errors
                    </span>
                    `
                );
            }
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
        console.log(e);

        let index = e.detail.item;
        // TODO what if index greater than # items
        let item = this.model.canvasModules.items[index];
        // TODO check the content of the item, esp. createdItem (the JSON)

        // increment the num found regardless of error or not
        this.numFoundCreatedItems++;

        // Caught and error when trying to find item
        if (Object.hasOwnProperty.call(e, 'error')) {
            this.addProgressList(`
                Error finding item "<em>${item.title}</em>": error - 
                <span class="text-error">${error}</span>`
            );
            this.numItemErrors++;
        } else if (
            // if item.createdItem has a property "error" then handle error
            Object.hasOwnProperty.call(item, 'createdItem') &&
            Object.hasOwnProperty.call(item.createdItem, 'error')
        ) {
            const error = item.createdItem.error;

            this.addProgressList(`
                Error finding item "<em>${item.title}</em>": error - 
                <span class="text-error">${error}</span>`
            );
            this.numItemErrors++;
        } else {
            this.addProgressList(
                `item "<em>${item.title}</em>" found or created
              (created ${this.numFoundCreatedItems} out of 
                ${this.model.canvasModules.items.length})`
            );
        }

        // TODO check the JSON in item.createdItem

        // increment the number of found/created items
        // check if all items have been found/created
        if (this.numFoundCreatedItems == this.model.canvasModules.items.length) {
            if (this.numItemErrors === 0) {
                this.addProgressList(`
            <span class="text-success">
              <strong>All ${this.numFoundCreatedItems} items found or created
              (created ${this.numFoundCreatedItems} out of ${this.model.canvasModules.items.length})</strong>
            </span>`
                );
            } else {
                this.addProgressList(`
            <span class="text-error">
              <strong>Unable to find ${this.numItemErrors} items (out of ${this.model.canvasModules.items.length}) for this module</strong>.
              Ignoring those for now.
            </span>`
                );
            }
            this.addProgressList('Starting to add items to the module');
            // numAddedItems counts number already added and used to
            // identify which item to add next
            this.numAddedItems = 0;
            this.numAddErrors = 0;
            //this.model.addItemsToModule();
            this.model.addModuleItem(this.numAddedItems);
        }
    }

    /**
     * Update screen based on errors or successes found during the conversion
     * process
     * 
     * Possible errors include
     * - addErrors
     * - imageLinkErrors
     * - fileLinkErrors
     */

    updateCompletionCategory() {

        // find div#w2c-completion-category
        let completionCategory = document.querySelector('#w2c-completion-category');

        // if there are no errors then set the class to success
        if (this.numAddErrors === 0 && this.imageLinkErrors === 0 && this.fileLinkErrors === 0) {
            completionCategory.classList.add('w2c-success');
            return;
        }

        completionCategory.classList.add('w2c-success-but');

        // look for li#w2c-add-errors and set innerText to numAddErrors
        let addErrors = document.querySelector('#w2c-num-add-errors');
        if (addErrors) {
            addErrors.innerText = this.numAddErrors;
        }
        // look for li#w2c-image-errors and set innerText to imageLinkErrors
        let imageErrors = document.querySelector('#w2c-num-image-errors');
        if (imageErrors) {
            imageErrors.innerText = this.imageLinkErrors;
        }
        // look for li#w2c-file-errors and set innerText to fileLinkErrors
        let fileErrors = document.querySelector('#w2c-num-file-errors');
        if (fileErrors) {
            fileErrors.innerText = this.fileLinkErrors;
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
        console.log(e);


        let index = e.detail.item;
        // TODO what if index greater than # items
        let item = this.model.canvasModules.items[index];

        if (item.added) {
            this.addProgressList(
                `item (${item.title}) added to module in position ${index} 
                (added ${this.numAddedItems} out of ${this.model.canvasModules.items.length})`
            );
            this.numAddedItems++;
        } else {
            console.log(`OOOOOOOOOOOOOOOOOOOO error adding item ${item.title} -- ${item.error}`);
            this.addProgressList(
                `<span class="text-error">Error adding item 
                   <span class="w2c-broken-add">
                      <span class="w2c-broken-add-title"><em>${item.title}</em></span>
                      (<span class="w2c-broken-add-type">${item.type}</span>):
                      error <span class="w2c-broken-add-error"><em>${item.error}</em></span>
                  </span>
                </span>`
            );
            this.numAddErrors++;
        }

        // TODO check the JSON in item.createdItem
        // this is where error checking should happen

        // increment the number of found/created items
        // check if all items have been found/created
        if (  (this.numAddedItems+this.numAddErrors) != this.model.canvasModules.items.length) {
            // nope not everything added, add the next one
            this.model.addModuleItem(this.numAddedItems);
        } else {
            // all items added tidy up

            // Set the result
            const totalErrors = this.numAddErrors + this.imageLinkErrors + this.fileLinkErrors;
            let creationResult = '<span class="text-success"><strong>Module created!</strong></span>';
            if (totalErrors > 0) {
                creationResult = `<span class="text-error"><strong>Module created with ${totalErrors} errors</strong></span>`;
            }
            // get the div#w2c-completion-summary
            let completionSummary = document.querySelector('#w2c-completion-summary');
            // set the innerHTML to the result of the creation
            if (completionSummary) {
                completionSummary.innerHTML = creationResult;
            }

            // display final error count at end of list
            if (this.numAddErrors === 0) {

                this.addProgressList(`
            <span class="text-success"><strong>
              All ${this.numFoundCreatedItems} items added to the module
              (created ${this.numAddedItems} out of ${this.model.canvasModules.items.length})
              </strong>
            </span>`
                );
                this.addProgressList(creationResult);
                // find div#w2c-completion-category and set class to w2c-success
                let completionCategoryDiv = document.getElementById("w2c-completion-category");
                if (completionCategoryDiv) {
                    completionCategoryDiv.classList.add("w2c-success");
                }
            } else {
                this.addProgressList(`
            <strong>Module created, but
            <span class="text-error">
              Unable to add ${this.numAddErrors} items (out of ${this.model.canvasModules.items.length}) for this module
            </span>
              </strong>`
                );
            }
            this.renderCreationResults();
        }
        this.updateCompletionCategory();
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

        let nameSpan = document.getElementById("w2c-module-name");
        nameSpan.innerHTML = result.name;
        let numItemsSpan = document.getElementById("w2c-module-num-items");
        //numItemsSpan.innerHTML = result.items_count;
        //numItemsSpan.innerHTML = this.model.canvasModules.items.length;
        numItemsSpan.innerHTML = this.numAddedItems;



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
          <div id="w2c-completion-category" class="wc2-no-creation">
            <p class="text-warning">${error}</p></div>`;


        // hide div.w2c-waiting-results
        let waitingDiv = document.querySelector("div.w2c-waiting-results");
        waitingDiv.style.display = "none";
        // show div.w2c-error
        receivedDiv.style.display = "block";


    }

}
