/**
 * Converter.js
 * Define c2m_Converter class which is responsible for doing the conversion of the
 * the new module from docx to HTML to Canvas module 
 */


var DEFAULT_OPTIONS = {
	styleMap: [
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
		"p[style-name='Title'] => div.invisible",
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
		"u => u",

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

export default class c2m_Converter {

	/**
	 * construct the object
	 * - if event is defined then we're converting from .docx to html
	 * - if no event initialise
	 */
	constructor() {

		//		this.mammothConvert();

		//		this.handleFileSelect(event);
	}

	displayResult(result) {
		console.log("Converter display result");

		this.mammothResult = result;

		// generate mammoth-results event
		const event = new Event('mammoth-results');
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
		// TODO: more flexibility with choosing options
		mammoth.convertToHtml({ arrayBuffer: arrayBuffer }, DEFAULT_OPTIONS)
			.then((result) => this.displayResult(result))
			.done();
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

function displayResult(result) {
	console.log(result);

	return result;
	/*document.getElementById("output").innerHTML = result.value;
    
	var messageHtml = result.messages.map(function(message) {
		return '<li class="' + message.type + '">' + escapeHtml(message.message) + "</li>";
	}).join("");
    
	document.getElementById("messages").innerHTML = "<ul>" + messageHtml + "</ul>"; */
}