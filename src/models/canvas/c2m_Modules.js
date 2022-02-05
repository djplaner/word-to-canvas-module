/**
 * Model object for dealing with Canvas modules via the 
 * Canvas API
 */


export default class c2m_Modules {
	constructor(courseId,token) {
		this.courseId = courseId;
		this.csrfToken = token;

	}

	getModules() { 
		let callUrl = `/api/v1/courses/${this.courseId}/modules?include=items&per_page=100`;

		fetch(callUrl, {
			method: 'GET', credentials: 'include',
			headers: {
				"Accept": "application/json",
				"X-CSRF-Token": this.csrfToken
			}
		})
		.then(this.status)
		.then(this.json)
		.then( function(data) {
			console.log('c2m_Model -> getModules -> then');
			console.log(data);
		})
		.catch(function(error) {
			console.error('c2m_Model -> getModules -> catch');
			console.error(error);
		});
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