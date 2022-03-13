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
        "r[style-name='Talis Canvas Link'] => span.talisCanvasLink",
        "r[style-name='Canvas File Link'] => span.canvasFileLink",
        "p[style-name='Canvas File Link'] => span.canvasFileLink",

        "p[style-name='Hide'] => div.Hide > p:fresh",

        // kludges to tidy up common messy word cruft
        "p[style-name='List Bullet'] => ul > li:fresh",
        "p[style-name='heading 6'] => h6:fresh",

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
        "p[style-name='activity'] => div.activity > div.instructions > p:fresh",
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

// Wrap arounds for various types of activity always required because
// Mammoth isn't able (as I've configured it) to do it all
// - key indicates <div style to be preprended
// - value is what will be prepended
const CI_STYLE_PREPEND = {
  reading: `<div class="readingImage">&nbsp;</div>`,
  activity: `<div class="activityImage">&nbsp;</div>`,
  flashback: `<div class="flashbackImage">&nbsp;</div>`,
  //"canaryExercise" : `<div class="canaryImage"></div>`,
  // COM14
  canaryExercise: `<div class="canaryImage">&nbsp;</div>`,
  //"ael-note": `<div class="noteImage"><img src="https://filebucketdave.s3.amazonaws.com/banner.js/images/Blk-Warning.png" style="max-width:100%"></div>`,
  "ael-note": `<div class="noteImage">&nbsp;</div>`,
  weeklyWorkout: `<div class="weeklyWorkoutImage">&nbsp;</div>`,
  comingSoon: `<div class="comingSoonImage">&nbsp;</div>`,
  filmWatchingOptions: `<div class="filmWatchingOptionsImage">&nbsp;</div>`,
  goReading: `<div class="goReadingImage">&nbsp;</div>`,
};

const CI_EMPTY_STYLE_PREPEND = {
  goStartHere: `<div class="goStartHereImage"> <img src="https://app.secure.griffith.edu.au/gois/ultra/icons-regular/start-here.svg" /> </div>`,
  goActivity: `<div class="goActivityImage"> <img src="https://app.secure.griffith.edu.au/gois/ultra/icons-regular/activity.svg" /> </div>`,
  goReflect: `<div class="goReflectImage"> <img src="https://app.secure.griffith.edu.au/gois/ultra/icons-regular/reflection.svg" /> </div>`,
  goWatch: `<div class="goWatchImage"> <img src="https://app.secure.griffith.edu.au/gois/ultra/icons-regular/video.svg" /> </div>`,
  goDownload: `<div class="goDownloadImage"> <img src="https://app.secure.griffith.edu.au/gois/ultra/icons-regular/download.svg" /> </div>`,
  goNumberedList: `<div class="goNumberedListImage"> <img src="https://app.secure.griffith.edu.au/gois/ultra/icons-regular/number-1.svg" /> </div>`,
};

const TABLE_CLASS= ["table", "stripe-row-odd"];

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

        // CONTEXTUAL CHANGES
        // TODO do Content Interface translations here??
        // TODO move this out an additional class
        // find all span.embed in mammothResult and log innerhtml
        // parse the string 
        this.postConvert();

        this.generateWarnings();

        // generate mammoth-results event
        const event = new Event('mammoth-results');
        let c2m_dialog = document.querySelector('div.c2m_dialog');
        if (c2m_dialog) {
            c2m_dialog.dispatchEvent(event);
        }
    }

    /**
     * After conversion and post conversion check for various known
     * warnings or errors and update the mammothResult object and the
     * messages
     * - messages are stored in this.mammothResult.messages);
     */

    generateWarnings() {
        let parser = new DOMParser();
        let doc = parser.parseFromString(this.mammothResult.value, "text/html");

        // headings with no text/name can't be used
        this.checkEmptyHeadings(doc);

        // Canvas culls the base64 images and they pose a size problem
        this.checkBase64Images(doc);

        this.mammothResult.value = doc.documentElement.outerHTML;
    }

    /**
     * Check all the Heading 1 equivalents and see if any are empty
     * - these need to be highlighted, reported as an error and then
     *   removed before the next step
     * 
     * :param doc: the document (as parser) to check
     */
    checkEmptyHeadings(doc) {

        // get all the h1 elements
        let h1s = doc.querySelectorAll('h1');

        // loop through the h1s and check for empty text
        let empty = 0;
        for (let i = 0; i < h1s.length; i++) {
            let h1 = h1s[i];
            if (h1.innerHTML.trim() === "") {
                empty+=1;
                // insert a <span class="w2c-error"> into the h1
                const error = '<span class="w2c-error">empty heading 1</span>';
                h1.insertAdjacentHTML('beforeend', error);
            }
        }

        if (empty>0) {
                this.mammothResult.messages.push({
                    "type": "error",
                    "message": `Found ${empty} empty Heading 1s (see below). Remove and try again.`,
                });
        }
    }

    /**
     * Check the doc for any img tags using base64 encoded images
     * @param {DOM} doc 
     */

    checkBase64Images(doc) {
        // get all the img tags
        let imgs = doc.querySelectorAll('img');

        // loop through the imgs and check for base64 encoded images
        let base64 = 0;
        for (let i = 0; i < imgs.length; i++) {
            let img = imgs[i];
            if (img.src.indexOf('base64') > 0) {
                base64+=1;
                // insert a <span class="w2c-error"> into the img
                const error = '<span class="w2c-error">base64 image</span>';
                img.insertAdjacentHTML('beforebegin', error);
            }
        }
        if (base64>0) { 
            this.mammothResult.messages.push({
                "type": "error",
                "message": `Found ${base64} base64 images <small>(labeled in HTML)</small>. 
                           These will be replaced with placeholders.<br /> 
                           <small><strong>
                             <a target="_blank" href="https://djplaner.github.io/word-to-canvas-module/docs/warnings/htmlConversion.html#base64-images">For more <i class="icon-question"></i></a></strong></small>`,
                });
        }

    } 

    /**
     * Do all post mammoth conversions
     * - span.embed decoded HTML
     * - span.talisCanvasLink to a link
     */
    postConvert() {
        let parser = new DOMParser();
        let doc = parser.parseFromString(this.mammothResult.value, "text/html");

        // span.embed
        let embeds = doc.querySelectorAll('span.embed');
        // iterate over the embeds and use this.decodeEntities to decode the innerHTML
        for (let i = 0; i < embeds.length; i++) {
            let embed = embeds[i];
            embed.innerHTML = this.decodeEntities(embed.innerHTML);
        }

        // convert span.talisCanvasLink innerHTML to a link
        let links = doc.querySelectorAll('span.talisCanvasLink');
        for (let i = 0; i < links.length; i++) {
            let link = links[i];
            // create new anchor element
            let anchor = document.createElement('a');
            anchor.href = 'https://lms.griffith.edu.au/courses/252/external_tools/111';
            anchor.innerHTML = link.innerHTML;
            // replace link.innerHTML with anchor
            link.innerHTML = '';
            link.appendChild(anchor);
        }

        // remove the div.Hide
        let hiddenElems = doc.querySelectorAll('div.Hide');
        for (let i = 0; i < hiddenElems.length; i++) {
            let hiddenElem = hiddenElems[i];
            hiddenElem.parentNode.removeChild(hiddenElem);
        }

        // Content Interface pre-pends
        this.contentInterfacePreprends(doc);

        // add class TABLE_CLASS to all of the tables
        doc.querySelectorAll('table').forEach( (elem) => {
            // add class TABLE_CLASS to elem 
            TABLE_CLASS.forEach( (tableClass) => {
                elem.classList.add(tableClass);

            });
        });


        // convert the doc back to a string
        this.mammothResult.value = doc.documentElement.outerHTML;
    }

    /**
     * Add in the necessary Content Interface prepends 
     * @param {DomElement} doc - containing Mammoth html conversion
     */

    contentInterfacePreprends(doc) {
        for (const divstyle in CI_STYLE_PREPEND) {
            let selector = `div.${divstyle}`;
            // find all elements matching css selector
            doc.querySelectorAll(selector).forEach(function (elem) {
                elem.insertAdjacentHTML('afterbegin', CI_STYLE_PREPEND[divstyle]);
            });
        }

        // and styles we wish to empty and prepend
        for (const divstyle in CI_EMPTY_STYLE_PREPEND) {
            let selector = `div.${divstyle}`;
            // find all elements matching css selector
            doc.querySelectorAll(selector).forEach(function (elem) {
                elem.insertAdjacentHTML('afterbegin', CI_EMPTY_STYLE_PREPEND[divstyle]);
            });
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
