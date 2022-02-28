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
                console.log(`c2m_Modules -> createPage: ${this.createdItem}`);
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
        })
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