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

import c2m_Converter from './c2m_Converter';

// Define enum for stage

const c2m_initialise = "initialise";
const c2m_chooseWord = "choseWord";
const c2m_checkHtml = "createHtml";
const c2m_checkModule = "checkModule";
const c2m_complete = "complete";
const c2m_close = "close";

export default class c2m_Model {
	constructor( ){

		// indicate which of the four stages we're up to
		this.stage = c2m_initialise;
		this.converter = new c2m_Converter();

	}

	convertWordDoc(event) {
		console.log('c2m_Model -> convertWordDoc')

		this.converter.handleFileSelect(event);
	}
}