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

import c2m_WordConverter from './c2m_WordConverter';
import c2m_HtmlConverter from './c2m_HtmlConverter';
import c2m_Modules from './canvas/c2m_Modules';

// Define enum for stage


export default class c2m_Model {
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
