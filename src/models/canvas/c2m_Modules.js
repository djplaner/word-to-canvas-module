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
        // only proceed if there's a module.name
        console.log(`c2m_Modules -> createModule: **${newModule.name}**`);
        console.log(newModule);
        if (newModule.name === "") {
            console.error(`c2m_Modules -> createModule: no name for module`);
            this.createdModuleError = "No name for module (possibly because no text with <em>Title</em> style)";
            this.dispatchEvent('w2c-module-error');
            return;
        }

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
                this.dispatchEvent('w2c-empty-module-created');
            });
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

        // TODO
        // - Can I get the span.indent from item and use that to set the indent?

        let body = {
            "module_item": {
                "title": item.title,
                "position": index + 1, // index+1 because position is 1-based, not 0
                "type": item.type,
                "indent": item.indent
            }
        };

        if (["File", "Discussion", "Assignment", "Quiz"].includes(item.type)) {
            body.module_item.content_id = item.createdItem.id;
        }

        if (item.type === "Page" || item.type === "ExistingPage") {
            //            body.module_item['content_id'] = item.createdItem.page_id;
            body.module_item.page_url = item.createdItem.url;
            body.module_item.type = 'Page';
        }

        if (["ExternalUrl", "ExternalTool"].includes(item.type)) {
            // TODO need to do more to extract the URL here
            body.module_item.external_url = item.content;
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
                item.addedItem = json;
                item.added = true;

                // if we have a SubHeader dispatch('w2c-item-found-created')
                //                if (item.type === "SubHeader") {
                //                    this.dispatchEvent( 'w2c-item-found-created',{'item':index});
                //               } else {
                this.dispatchEvent('w2c-module-item-added', { 'item': index });
                //              }
            }).catch((error) => {
                console.log(`canvas::c2m_Modules::addModuleItem - caught error - ${error}`);
                item.error = error;
                item.added = false;
                this.dispatchEvent('w2c-module-item-added', { 'item': index });
            });

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
                this.dispatchEvent('w2c-item-found-created', { 'item': index });
            });

    }

    /**
     * Call find file API using this.fileLinks array 
     * {
     *   itemIndex: index of this.items i.e. the module item this link belongs to
     *   name:  name of the file
     *   descriptor:  descriptor for link
     *   status:
     *   response:
     *   event:
     * }
     * @param {Integer} index - index into array of files to find
     * @param {String} event - name of event/object to find
     */

    async findFile(index, event = 'w2c-file-found') {
        //        let itemList = undefined;
        // figure out which list of items to search for
        let itemList;
        if (event === 'w2c-file-found') {
            itemList = this.fileLinks;
        } else if (event === 'w2c-imageLink-found') {
            itemList = this.imageLinks;
        }
        let file = itemList[index];
        let searchTerm = file.name;

        searchTerm = encodeURIComponent(searchTerm);
        console.log(`--- FindFile: ${searchTerm}`);

        let callUrl = `/api/v1/courses/${this.courseId}/files?search_term=${searchTerm}`;

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
                this.findFileInList(json, index, itemList);
                // do the same event, regardless, the item will be set to indicate
                // success or failure
                this.dispatchEvent(event, { 'file': index });
            }).catch((error) => {
                console.log(`canvas::c2m_Modules::findFile - caught error - ${error}`);
                file.status = 'error';
                this.dispatchEvent(event, { 'file': index });
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

        console.log(`--- FindItem: ${item.title} type **${type}**`);
        console.log(type);

        // depending on type, use a different URL
        const TYPE_API_URL = {
            "ExistingPage": `/api/v1/courses/${this.courseId}/pages?`,
            "File": `/api/v1/courses/${this.courseId}/files?`,
            "Discussion": `/api/v1/courses/${this.courseId}/discussion_topics?`,
            "Assignment": `/api/v1/courses/${this.courseId}/assignments?`,
            "Quiz": `/api/v1/courses/${this.courseId}/quizzes?`
        };

        let searchTerm = item.title;

        // if looking for a File item, we need to search for the filename
        if (type === "File") {
            // replace smart quotes and em dashes in name with normal ones
            let name = item.content.fileName;
            name = name.replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]/g, "'");
            name = name.replace(/[\u201C\u201D\u201E\u201F\u2033\u2036]/g, '"');
            name = name.replace(/[\u2013\u2014]/g, '-');

            // kludge replace %20 with space
            name = name.replace(/%20/g, ' ');
            item.content.fileName = name;

            searchTerm = name;
        }

        const newSearchTerm = encodeURIComponent(searchTerm);

        // do a List pages api call
        // https://canvas.instructure.com/doc/api/pages.html#method.wiki_pages_api.index
        //let callUrl = TYPE_API_URL[type] + new URLSearchParams({ 'search_term': searchTerm });
        let callUrl = `${TYPE_API_URL[type]}search_term=${newSearchTerm}`;

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
                this.dispatchEvent('w2c-item-found-created', { 'item': index });
            }).catch((error) => {
                console.log(`canvas::c2m_Modules::findItem - caught error - ${error}`);
                this.dispatchEvent('w2c-item-found-created', {
                    'item': index,
                    'error': `Error finding item - ${error}`
                });
            });

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
            if (type === "File") {
                elementName = element.display_name.trim();
                itemName = item.content.fileName.trim();
            } else if (type === "Assignment") {
                elementName = element.name.trim();
            } else {
                elementName = element.title.trim();
            }
            // if itemName is substr of fileName
            if (elementName.includes(itemName)) {
                item.createdItem = element;
                return;
            }
        }
        item.createdItem = {
            "error": `file not found: ${item.title}`,
            "index": index
        };
    }

    /**
     * Look for the file we're after this.fileLinks[index] in the list
     * of JSON 
     * Set the item.status and item.response respectively
     * @param {Array} list - JSON list of Files returned by Canvas API 
     * @param {Integer} index - index info this.fileLinks list of required files
     * @param {Array} searchlist - array of files/images we're looking for (index keys on this)
     */

    findFileInList(list, index, searchList) {
        //let file = this.fileLinks[index];
        let file = searchList[index];

        for (let i = 0; i < list.length; i++) {
            let element = list[i];
            let elementName = element.display_name.trim();
            let fileName = file.name.trim();

            if (elementName.includes(fileName)) {
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
            return Promise.resolve(response);
        } else {
            console.log("---- STATUS bad response status");
            console.log(response);
            return Promise.reject(new Error(response.statusText));
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
