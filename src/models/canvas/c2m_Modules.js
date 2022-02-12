/**
 * Model object for dealing with Canvas modules via the 
 * Canvas API
 * 
 * Data members
 * - csrfToken - Canvas API token
 * - courseId - Canvas course ID 
 * - allModules - JSON for all modules in course - results of getAllModules
 */


export default class c2m_Modules {
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

        if (item.type==="File" ) {
            body.module_item['content_id'] = item.createdItem.id;
        }

        if (item.type === "Page" || item.type==="ExistingPage") {
//            body.module_item['content_id'] = item.createdItem.page_id;
            body.module_item['page_url'] = item.createdItem.url;
            body.module_item['type'] = 'Page';
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
                console.log(`c2m_Modules -> createPage: ${this.createdItem}`);
                console.log(json);
                this.dispatchEvent( 'w2c-item-found-created',{'item':index});
            })

    }

    /**
     * Find a page matching the title/name of this.items[index]
     * Set the createdItem to some sort of FAILURE if didn't find
     * @param {Number} index basic information about page to create
     */
    async findPage(index) {
        let item = this.items[index];

        // do a List pages api call
        // https://canvas.instructure.com/doc/api/pages.html#method.wiki_pages_api.index
        let callUrl = `/api/v1/courses/${this.courseId}/pages?` +
                    new URLSearchParams({'search_term': item.title});

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
                this.findPageInPageList(json, index);
                // do the same event, regardless, the content of item.createdItem
                // will indicate failure or not
                this.dispatchEvent( 'w2c-item-found-created',{'item':index});
            })
    }

    /**
     * Find a file matching the title/name of this.items[index]
     * Set the createdItem to some sort of FAILURE if didn't find
     * @param {Number} index basic information about page to create
     */
    async findFile(index) {
        let item = this.items[index];

        // do a List pages api call
        // https://canvas.instructure.com/doc/api/pages.html#method.wiki_pages_api.index
        let callUrl = `/api/v1/courses/${this.courseId}/files?` +
                    new URLSearchParams({'search_term': item.title});

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
                this.findFileInFileList(json, index);
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
     * @param {Array} files - list of File objects
     * @param {Number} index - to item object
     */

    findFileInFileList(files, index) {
        let item = this.items[index];

        // loop through the pages
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            const fileName = file.display_name.trim();
            const itemName = item.title.trim();
            // if itemName is substr of fileName
            if ( fileName.includes(itemName)) {
                item.createdItem = file;
                return;
            }
        }
        item.createdItem = {
            "error": `file not found: ${item.title}`    
        }
    }


    /**
     * Search through a list of Page objects to find a page that matches
     * (exactly) the title for the item at index
     * If found, set the page object, otherwise not found error
     * @param {Array} pages - list of Page objects
     * @param {Number} index - to item object
     */

    findPageInPageList(pages, index) {
        let item = this.items[index];

        // loop through the pages
        for (let i = 0; i < pages.length; i++) {
            let page = pages[i];
            // trim both titles and if the page title matches, 
            // set the createdItem to the page object
            if (page.title.trim() === item.title.trim()) {
                item.createdItem = page;
                return;
            }
        }
        item.createdItem = {
            "error": `Page not found: ${item.title}`    
        }
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