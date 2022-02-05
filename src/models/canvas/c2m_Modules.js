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

	/*
	 * Function which returns a promise (and error if rejected) if response status is OK
	 * @param {Object} response
	 * @returns {Promise} either error or response
	 */
	status(response) {
		if (response.status >= 200 && response.status < 300) {
			return Promise.resolve(response)
		} else {
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