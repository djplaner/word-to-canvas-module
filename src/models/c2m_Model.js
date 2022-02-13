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