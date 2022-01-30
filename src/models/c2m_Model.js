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

// Define enum for stage


export default class c2m_Model {
	constructor( ){

		// indicate which of the four stages we're up to
//		this.stage = c2m_initialise;
		this.wordConverter = new c2m_WordConverter();



	}

	convertWordDoc(event) {
		console.log('c2m_Model -> convertWordDoc')

		this.wordConverter.handleFileSelect(event);
	}
}