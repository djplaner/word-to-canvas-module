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
		// TODO check for existence of canvasModules
		this.canvasModules.getAllModules()
			.then(() => {
				console.log(`c2m_Model -> getAllModules: finished `);
				console.log(this.canvasModules.allModules);

			});
		// TODO catch any errors???
	}

	/**
	 * Harness to create modules within context of this app
	 * TODO after creating the module, should check to see if the
	 * module response is okay and then generate the appropriate event
	 * Not just automatically 
	 */
	createModule() {
		this.canvasModules.createModule(this.htmlConverter)
			.then(() => {
				// if createdModules is defined generated created event
				if (this.canvasModules.createdModule) {
					const event = new Event('c2m-module-created');
					let c2m_dialog = document.querySelector('div.c2m_dialog');
					if (c2m_dialog) {
						c2m_dialog.dispatchEvent(event);
						console.log('c2m_Model -> createModule: event dispatched');
					}
				} else {
					console.error(`c2m_Model -> createModule error: `);
					const event = new Event('c2m-module-error');
					let c2m_dialog = document.querySelector('div.c2m_dialog');
					if (c2m_dialog) {
						c2m_dialog.dispatchEvent(event);
						console.log('c2m_Model -> createModule: ERROR event dispatched');
					}
				}
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
}