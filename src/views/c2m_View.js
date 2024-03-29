/**
 * c2m_View.js
 * Parent view class, define
 * - createEmptyDialogDiv
 * - configureAccordions 
 */

//const BOOTSTRAP_CSS = '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">';
//const BOOTSTRAP_JS = '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>';




export default class c2m_View {
	/**
	 * create view object
	 * @param {Object} model
	 * @param {Object} controller
	 */
	constructor(model, controller) {
		this.model = model;
		this.controller = controller;

		this.version = "2.0.21";
	}


	/**
	 * Add version information to span.w2c-version
	 */
	addW2cVersion() {
		// find span.w2c-version
		let w2cVersion = document.querySelector("span.w2c-version");
		if (w2cVersion) {
			w2cVersion.innerHTML = `(v${this.version})`;
		}
	}

	/**
	 * Add an empty div.c2m_dialog to the page or empty the existing one
	 */
	createEmptyDialogDiv() {

		// check for existing div.c2m_dialog
		let c2mDiv = document.querySelector("div.c2m_dialog");

		if (c2mDiv) {
			// renive c2mDiv from document
            c2mDiv.parentNode.removeChild(c2mDiv);
		} 

		c2mDiv = document.createElement('div');
		c2mDiv.classList.add("c2m_dialog");
		return c2mDiv;
	}

	configureAccordions() {
		let acc = document.getElementsByClassName("w2c-accordion");

		for (let i = 0; i < acc.length; i++) {
			acc[i].addEventListener("click", function () {

				/* Toggle between adding and removing the "active" class,
				to highlight the button that controls the panel */
				this.classList.toggle("w2c-active-accordion");

				/* Toggle between hiding and showing the active panel */
				let panel = this.nextElementSibling;
				if (panel.style.display === "block") {
					panel.style.display = "none";
				} else {
					panel.style.display = "block";
				}
			});
		}
	}
}
