/**
 * c2m_controller.js
 */


import { c2m_View } from './views/c2m_View.js';

import { c2m_Model} from './models/c2m_Model.js';


export default class c2m_controller {
	constructor( ){

		this.model = new c2m_Model();
		this.view = new c2m_View(this.model);

		switch(this.model.stage) {
			case c2m_chooseWord:
				this.view.renderChooseWord();
				break;
			case c2m_checkHtml:
				this.view.renderCheckHtml();
				break;
			case c2m_checkModule:
				this.view.renderCheckModule();
				break;
			case c2m_complete:
				this.view.renderComplete();
				break;
			default:
				console.log("Unknown stage");
		}	
	}
}
