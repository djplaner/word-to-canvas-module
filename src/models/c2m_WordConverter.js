/**
 * WordConverter.js
 * Define c2m_Converter class which is responsible for converting a Word doc 2 html
 * using Mammoth.js
 */


const DEFAULT_OPTIONS = {
	styleMap: [
		"p[style-name='Existing Canvas Page'] => h1.existingCanvasPage",
		"p[style-name='Canvas Discussion'] => h1.canvasDiscussion",
		"p[style-name='Canvas Assignment'] => h1.canvasAssignment",
		"p[style-name='Canvas Quiz'] => h1.canvasQuiz",
		"p[style-name='Canvas File'] => h1.canvasFile",
		"p[style-name='Canvas SubHeader'] => h1.canvasSubHeader",
		"p[style-name='Canvas External Url'] => h1.canvasExternalUrl",
		"p[style-name='Canvas External Tool'] => h1.canvasExternalTool",

		"p[style-name='Section Title'] => h1:fresh",
		"p[style-name='Quote'] => blockquote:fresh",
		"p[style-name='Quotations'] => blockquote:fresh",
		"p[style-name='Quotation'] => blockquote:fresh",
		"p[style-name='Body Text'] => p:fresh",
		"p[style-name='Text'] => p:fresh",
		"p[style-name='Default'] => p:fresh",
		"p[style-name='Normal (Web)'] => p:fresh",
		"p[style-name='Normal'] => p:fresh",
		"p[style-name='Text body'] => p:fresh",
		"p[style-name='Textbody1'] => p:fresh",
		"p[style-name='Picture'] => div.ci_container > div.picture",
		"p[style-name='Picture Right'] => div.pictureRight",
		"p[style-name='PictureRight'] => div.pictureRight",
		"r[style-name='University Date'] => span.universityDate",
		"p[style-name='Video'] => div.video",
		"p[style-name='Aside'] => aside",
		"p[style-name='Film Watching Options'] => film-watch-options",
		"r[style-name='Checkbox Char'] => span.checkbox",
		"p[style-name='Checkbox'] => span.checkbox",
		"r[style-name='Blue'] => span.blue",
		"r[style-name='Red'] => span.red",
		"p[style-name='Example'] => div.example > p:fresh",
		"p[style-name='Example Centered'] => div.exampleCentered > p:fresh",
		"p[style-name='Flashback']:ordered-list(1) => div.flashback > ol > li:fresh",
		"p[style-name='Flashback']:unordered-list(1) => div.flashback > ul > li:fresh",
		"p[style-name='Flashback'] => div.flashback > p:fresh",

		"p[style-name='Weekly Workout']:ordered-list(1) => div.weeklyWorkout > ol > li:fresh",
		"p[style-name='Weekly Workout']:unordered-list(1) => div.weeklyWorkout > ul > li:fresh",
		"p[style-name='Weekly Workout'] => div.weeklyWorkout > p:fresh",

		"p[style-name='Poem'] => div.poem > p:fresh",
		"r[style-name='Poem Right'] => div.poemRight > p:fresh",

		"p[style-name='Canary Exercise']:ordered-list(1) => div.canaryExercise > div.instructions > ol > li:fresh",
		"p[style-name='Canary Exercise']:unordered-list(1) => div.canaryExercise > div.instructions > ul > li:fresh",
		"p[style-name='Canary Exercise'] => div.canaryExercise > div.instructions > p:fresh",
		"p[style-name='Coming Soon'] => div.comingSoon > div.instructions > p:fresh",
		"p[style-name='ActivityTitle'] => div.activity > h2:fresh",
		"p[style-name='Activity Title'] => div.activity > h2:fresh",
		"p[style-name='ActivityText'] => div.activity > div.instructions > p:fresh",
		"p[style-name='Activity Text'] => div.activity > div.instructions > p:fresh",
		//"r[style-name='Activity'] => div.activity > div.instructions > p:fresh",
		"p[style-name='Activity']:ordered-list(1) => div.activity > div.instructions > ol > li:fresh",
		"p[style-name='Activity']:unordered-list(1) => div.activity > div.instructions > ul > li:fresh",
		"p[style-name='Activity'] => div.activity > div.instructions > p:fresh",
		/*"p[style-name='Activity'] => span.activity",*/
		"p[style-name='Bibliography'] => div.apa > p:fresh",
		"p[style-name='Reading']:ordered-list(1) => div.reading > div.instructions > ol > li:fresh",
		"p[style-name='Reading']:unordered-list(1) => div.reading > div.instructions > ul > li:fresh",
		"p[style-name='Reading'] => div.reading > div.instructions > p:fresh",
		"p[style-name='Title'] => div.moduleTitle",
		"p[style-name='Card'] => div.gu_card",
		"r[style-name='Emphasis'] => em:fresh",
		"p[style-name='Timeout'] => span.timeout",
		"p[style-name='Embed'] => span.embed",
		"p[style-name='Note']:ordered-list(1) => div.ael-note > div.instructions > ol > li:fresh",
		"p[style-name='Note']:unordered-list(1) => div.ael-note > div.instructions > ul > li:fresh",
		"p[style-name='Note'] => div.ael-note > div.instructions > p:fresh",
		/* Adding cards */
		"p[style-name='Blackboard Card'] => div.bbCard:fresh",
		/* Blackboard item conversion */
		"p[style-name='Blackboard Item Heading'] => h1.blackboard",
		"p[style-name='Blackboard Item Heading 2'] => h2.blackboard",
		"r[style-name='Blackboard Item Link'] => span.blackboardLink",
		"p[style-name='Blackboard Item Link'] => span.blackboardlink",
		"r[style-name='Blackboard Item Link Char'] => span.blackboardLink",
		"r[style-name='Blackboard Content Link'] => span.blackboardContentLink",
		"r[style-name='Blackboard Menu Link'] => span.blackboardMenuLink",
		/* tables?? */
		"r[style-name='small'] => span.smallText",
		"r[style-name='StrongCentered'] => span.strongCentered",
		"r[style-name='Centered'] => span.centered",
		// Underline

		// GO style
		"p[style-name='GO Start Here'] => div.goStartHere",
		"p[style-name='GO Reflect'] => div.goReflect",
		"p[style-name='GO Watch'] => div.goWatch",
		"p[style-name='GO Download'] => div.goDownload",
		// TODO numbered list, need to detect the original image or order???
		"p[style-name='GO Numbered List'] => div.goNumberedList",
		"p[style-name='GO Activity'] => div.goActivity",
		"p[style-name='GO Reading'] => div.goReading > div.instructions > p:fresh",
	],

};

export default class c2m_WordConverter {

	/**
	 * construct the object
	 * - if event is defined then we're converting from .docx to html
	 * - if no event initialise
	 */
	constructor() {

		//		this.mammothConvert();

		//		this.handleFileSelect(event);
	}


    decodeEntities(encodedString) {
        let textArea = document.createElement('textarea');
        textArea.innerHTML = encodedString;
        return textArea.value;
    }

	/**
	 * Called when mammoth is complete.  Will set the mammoth response
	 * as a data member and then dispatch an event on div.c2m_dialog 
	 * to spark the view into displaying the results 
	 * @param {Object} result Mammoth result response
	 */
	displayResult(result) {

		this.mammothResult = result;

		// TODO do Content Interface translations here??
        // TODO move this out an additional class
		// find all span.embed in mammothResult and log innerhtml
        // parse the string 
        let parser = new DOMParser();
        let doc = parser.parseFromString(this.mammothResult.value, "text/html");
		let embeds = doc.querySelectorAll('span.embed');
        // iterate over the embeds and use this.decodeEntities to decode the innerHTML
        for (let i = 0; i < embeds.length; i++) {
            let embed = embeds[i];
            embed.innerHTML = this.decodeEntities(embed.innerHTML);
        }
        // convert the doc back to a string
        this.mammothResult.value = doc.documentElement.outerHTML;

		// generate mammoth-results event
		const event = new Event('mammoth-results');
		let c2m_dialog = document.querySelector('div.c2m_dialog');
		if (c2m_dialog) {
			c2m_dialog.dispatchEvent(event);
		}
	}

	/**
	 * There was an error converting the file, generate event
	 * indicating error
	 * @param {Object} result Mammoth result response
	 */

	displayError(error) {
		this.mammothError = error;
		this.mammothResult = undefined;

		// generate mammoth-results event
		const event = new Event('mammoth-error');
		let c2m_dialog = document.querySelector('div.c2m_dialog');
		if (c2m_dialog) {
			c2m_dialog.dispatchEvent(event);
		}
	}


	/**
	 * Grab the content of a file selector and run it thru Mammoth
	 * - adapted from Mammoth.js demo
	 * https://github.com/mwilliamson/mammoth.js/blob/master/browser-demo/demo.js
	 */

	handleFileSelect(event) {
		let file = event.target.files[0];

		let reader = new FileReader();

		// where is loadEvent coming from
		reader.onload = (loadEvent) => this.callBack(loadEvent);

		reader.readAsArrayBuffer(file);
	}

	callBack(loadEvent) {
		let arrayBuffer = loadEvent.target.result;

		console.log('-------------- doing the call back');

		// TODO: more flexibility with choosing options
		// Call mammoth, if successful display result
		// but fail otherise
		mammoth.convertToHtml({ arrayBuffer: arrayBuffer }, DEFAULT_OPTIONS)
			.then((result) => this.displayResult(result))
			.catch((error) => this.displayError(error))
			.done();
		console.log('-------------- done the call back');
	}

	/**
	 * Read a file from the event
	 * - adapted from Mammoth.js demo
	 * https://github.com/mwilliamson/mammoth.js/blob/master/browser-demo/demo.js
	 */
	readFileInputEventAsArrayBuffer(event) {
		let file = event.target.files[0];

		let reader = new FileReader();

		// where is loadEvent coming from
		reader.onload = (loadEvent) => this.callBack(loadEvent);

		reader.readAsArrayBuffer(file);
	}




}
