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
			})
	}

	/**
	 * Create the item for item object
	 * - create/link to the existing element of that type
	 * - create the item for the module 
	 * @param {Object} item - object describing the item to create 
	 */

	async createModuleItem(moduleId, position, item) {
		let callUrl = `/api/v1/courses/${this.courseId}/modules/${moduleId}/items`;

		// clear the error ready for any fresh error
		// TODO how for this
//		this.createdModuleError = undefined;
//		this.createdModule = undefined;

		await fetch(callUrl, {
			method: 'POST', credentials: 'include',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"X-CSRF-Token": this.csrfToken
			},
			body: JSON.stringify({
				"module_item" : {
					"title": item.title,
					"position": position,
					"type": "SubHeader", // for testing -- item.type,
					// "content_id": ??  required for everything but:
					//   ExternalUrl, Page, SubHeader
					//"page_url": item.page_url, required for page
					//"external_url": item.external_url, required for page
				}
			})
		})
			.then(this.status)
			.then((response) => {
				return response.json();
			})
			.then((json) => {
				// push json onto this.createdItems array
				this.createdModuleItems.push(json);
				console.log(`c2m_Modules -> createItems: ${this.createdModuleItems}`);
				console.log(json);
			})

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
}