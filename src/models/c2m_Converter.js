/**
 * Converter.js
 * Define c2m_Converter class which is responsible for doing the conversion of the
 * the new module from docx to HTML to Canvas module 
 */



export default class c2m_Converter {

	/**
	 * construct the object
	 * - if event is defined then we're converting from .docx to html
	 * - if no event initialise
	 */
	constructor( ){

//		this.mammothConvert();

//		this.handleFileSelect(event);
	}

	displayResult(result){
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
			 // to set options, use this one e.g. how to do conversion
            mammoth.convertToHtml({arrayBuffer: arrayBuffer})
                .then( (result) => this.displayResult(result))
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