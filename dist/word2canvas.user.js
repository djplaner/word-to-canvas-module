// ==UserScript==
// @name         Word 2 Canvas Module
// @namespace    http://tampermonkey.net/
// @version      0.0.0
// @description  Userscript to create a new Canvas LMS Module from a Word document
// @author       David Jones
// @match        *://*/courses/.*/modules.*
// @grant        none
// @source       https://github.com/djplaner/word-to-canvas-module.git
// @license      MIT
// @homepage     https://github.com/djplaner/word-to-canvas-module
// ==/UserScript==

// src/c2m_controller.js
/**
 * c2m_controller.js
 */


// import { c2m_View } from './view/c2m_View.js';

// import { c2m_Model} from './model/c2m_Model.js';


class c2m_controller {
	constructor( ){
	    // get all the div with ids starting with context_module_ within div#context_modules
/*	    this.moduleElements = document.querySelectorAll( 'div#context_modules > div[id^=context_module_]');
    
	    this.currentCollection = DEFAULT_ACTIVE_COLLECTION;
    
	    // loop thru each moduleElement and construct a cc_Module object
	    this.modules = Array.from( this.moduleElements).map( ( moduleElement) => {
		return new cc_Module( moduleElement);
	    });
    
	    // simple dump
	    console.log(this.modules);*/

        console.log("hello world");
	}
}

// src/index.js
/**
 * Launch the c2m controller and do any additional pre-setup
 * Main task is to wait for the entire Canvas page to load
 * before launch
 */

function canvas2Module(){

 window.addEventListener('load', function(){
        // getting very kludgy here, haven't got a good solution...yet #14
        // - module content is dynamically loaded, wait (dumbly) for it to finish
        this.setTimeout(
            () => {
                let controller = new c2m_controller();
            }, 2000);
    });
}

/**
 * Initial launch code
 */
canvas2Module();