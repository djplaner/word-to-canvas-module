/**
 * c2m_controller.js
 */


import { c2m_View } from './views/c2m_View.js';

import { c2m_Model} from './models/c2m_Model.js';


export default class c2m_controller {
	constructor( ){

		this.model = new c2m_Model();
		this.view = new c2m_View(this.model,this);

	}




}
