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

// Define enum for stage

const c2m_initialise = Symbol("initialise");
const c2m_chooseWord = Symbol("choseWord");
const c2m_checkHtml = Symbol("createHtml");
const c2m_checkModule = Symbol("checkModule");
const c2m_complete = Symbol("complete");

export default class c2m_Model {
	constructor( ){

		// indicate which of the four stages we're up to
		this.stage = c2m_initialise;
    
	}
}