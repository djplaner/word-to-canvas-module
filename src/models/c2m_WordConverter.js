/**
 * WordConverter.js
 * Define c2m_Converter class which is responsible for converting a Word doc 2 html
 * using Mammoth.js
 */

import { CI_CSS } from '../views/ci_css.js';

const JUICE_IT = true;

const DEFAULT_OPTIONS = {
    styleMap: [
        "p[style-name='Heading 1 - indent 1'] => h1:fresh > span.w2c-indent-1",
        "p[style-name='Existing Canvas Page'] => h1.existingCanvasPage",
        "p[style-name='Canvas Discussion'] => h1.canvasDiscussion",
        "p[style-name='Canvas Assignment'] => h1.canvasAssignment",
        "p[style-name='Canvas Quiz'] => h1.canvasQuiz",
        "p[style-name='Canvas File'] => h1.canvasFile",
        "p[style-name='Canvas Image'] => span.canvasImage",
        "p[style-name='Canvas SubHeader'] => h1.canvasSubHeader",
        "p[style-name='Canvas External Url'] => h1.canvasExternalUrl",
        "p[style-name='Canvas External Tool'] => h1.canvasExternalTool",
        "r[style-name='Talis Canvas Link'] => span.talisCanvasLink",
        "r[style-name='Canvas File Link'] => span.canvasFileLink",
        "p[style-name='Canvas File Link'] => span.canvasFileLink",
        "r[style-name='Canvas Menu Link'] => span.canvasMenuLink",
        "p[style-name='Canvas Menu Link'] => span.canvasMenuLink",
        "r[style-name='Blackboard Image'] => span.blackboardImage",
        "p[style-name='Blackboard Image p'] => p.blackboardImage",
        "r[style-name='placeholder'] => mark",
        "p[style-name='flashback'] => p.flashback",
        "p[style-name='Weekly Workout'] => p.weeklyWorkout",
        "p[style-name='Canary Exercise'] => p.canaryExercise",
//        "p[style-name='Note'] => p.ael-note",
        "p[style-name='Note'] => div.ael-note > div.instructions > p:fresh", 
        "p[style-name='Added Advice'] => p.guAddedAdvice",
        "p[style-name='activity'] => p.activity",
//        "p[style-name='Reading'] => p.reading",
        "p[style-name='Reading'] => div.reading > div.instructions > p:fresh", 
        "p[style-name='Coming Soon'] => p.comingSoon",
        "p[style-name='Picture'] => p.picture",
        "p[style-name='PictureRight'] => p.pictureRight",
        "p[style-name='Quote'] => p.quote",
        "p[style-name='Poem'] => div.poem",
        "r[style-name='Poem Right'] => div.poemRight",


        "p[style-name='Hide'] => div.Hide > p:fresh",

        "p[style-name='FAQ Heading 1'] => div.faqHeading > p:fresh",
        "p[style-name='FAQ body 1'] => div.faqBody > p:fresh",

        // kludges to tidy up common messy word cruft
        "p[style-name='List Bullet'] => ul > li:fresh",
        "p[style-name='List Number'] => ol > li:fresh",
        "p[style-name='heading 6'] => h6:fresh",

        "p[style-name='Section Title'] => h1:fresh",
        "p[style-name='Quotations'] => blockquote:fresh",
        "p[style-name='Quotation'] => blockquote:fresh",
        "p[style-name='Body Text'] => p:fresh",
        "p[style-name='Text'] => p:fresh",
        "p[style-name='Default'] => p:fresh",
        "p[style-name='Normal (Web)'] => p:fresh",
        "p[style-name='Normal'] => p:fresh",
        "p[style-name='Text body'] => p:fresh",
        "p[style-name='Textbody1'] => p:fresh",
        /*        "p[style-name='Picture'] => div.ci_container > div.picture",
                "p[style-name='Picture Right'] => div.pictureRight",
                "p[style-name='PictureRight'] => div.pictureRight", */
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
        /*        "p[style-name='Flashback']:ordered-list(1) => div.flashback > ol > li:fresh",
                "p[style-name='Flashback']:unordered-list(1) => div.flashback > ul > li:fresh",
                "p[style-name='Flashback'] => div.flashback > p:fresh", */

        /*        "p[style-name='Weekly Workout']:ordered-list(1) => div.weeklyWorkout > ol > li:fresh",
                "p[style-name='Weekly Workout']:unordered-list(1) => div.weeklyWorkout > ul > li:fresh",
                "p[style-name='Weekly Workout'] => div.weeklyWorkout > p:fresh", */


        /*        "p[style-name='Canary Exercise']:ordered-list(1) => div.canaryExercise > div.instructions > ol > li:fresh",
                "p[style-name='Canary Exercise']:unordered-list(1) => div.canaryExercise > div.instructions > ul > li:fresh",
                "p[style-name='Canary Exercise'] => div.canaryExercise > div.instructions > p:fresh", */
        //        "p[style-name='Coming Soon'] => div.comingSoon > div.instructions > p:fresh",
        /*        "p[style-name='ActivityTitle'] => div.activity > h2:fresh",
                "p[style-name='Activity Title'] => div.activity > h2:fresh",
                "p[style-name='ActivityText'] => div.activity > div.instructions > p:fresh",
                "p[style-name='Activity Text'] => div.activity > div.instructions > p:fresh",
                //"r[style-name='Activity'] => div.activity > div.instructions > p:fresh",
                "p[style-name='Activity']:ordered-list(1) => div.activity > div.instructions > ol > li:fresh",
                "p[style-name='Activity']:unordered-list(1) => div.activity > div.instructions > ul > li:fresh",
                "p[style-name='Activity'] => div.activity > div.instructions > p:fresh",
                "p[style-name='activity'] => div.activity > div.instructions > p:fresh", */
        /*"p[style-name='Activity'] => span.activity",*/
        "p[style-name='Bibliography'] => div.apa > p:fresh",
        /*        "p[style-name='Reading']:ordered-list(1) => div.reading > div.instructions > ol > li:fresh",
                "p[style-name='Reading']:unordered-list(1) => div.reading > div.instructions > ul > li:fresh",
                "p[style-name='Reading'] => div.reading > div.instructions > p:fresh", */
        "p[style-name='Title'] => div.moduleTitle",
        "p[style-name='Card'] => div.gu_card",
        "r[style-name='Emphasis'] => em:fresh",
        "p[style-name='Timeout'] => span.timeout",
        "p[style-name='Embed'] => span.embed",
        /*        "p[style-name='Note']:ordered-list(1) => div.ael-note > div.instructions > ol > li:fresh",
                "p[style-name='Note']:unordered-list(1) => div.ael-note > div.instructions > ul > li:fresh",
                "p[style-name='Note'] => div.ael-note > div.instructions > p:fresh", */
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
    reading: `<div class="readingImage"><img src="https://filebucketdave.s3.amazonaws.com/banner.js/images/icons8-reading-48.png" alt="Reading" style="max-width:100%" /></div>`,
    activity: `<div class="activityImage"><img src="https://filebucketdave.s3.amazonaws.com/banner.js/images/icons8-dancing-48.png" alt="Dancing Man - activity" style="max-width:100%" /></div>`,
    flashback: `<div class="flashbackImage"><img src="https://s3.amazonaws.com/filebucketdave/banner.js/images/com14/flashback.png" style="max-width:100%" /></div>`,
    //"canaryExercise" : `<div class="canaryImage"></div>`,
    // COM14
    canaryExercise: `<div class="canaryImage"><img src="https://s3.amazonaws.com/filebucketdave/banner.js/images/com14/Tweety.svg.png" style="max-width:100%" alt="Tweety bird" /></div>`,
    //"ael-note": `<div class="noteImage"><img src="https://filebucketdave.s3.amazonaws.com/banner.js/images/Blk-Warning.png" style="max-width:100%"></div>`,
    "ael-note": `<div class="noteImage"><img src="https://filebucketdave.s3.amazonaws.com/banner.js/images/Blk-Warning.png" style="max-wdith:100%" alt="Warning! Exclamation mark in a circle" /></div>`,
    weeklyWorkout: `<div class="weeklyWorkoutImage"><img src="https://filebucketdave.s3.amazonaws.com/banner.js/images/com14/weeklyWorkout.png" style="max-width:100%" alt="Female weight lifter" /></div>`,
    comingSoon: `<div class="comingSoonImage"><img src="https://filebucketdave.s3.amazonaws.com/banner.js/images/com14/comingSoon.jpg" alt="Coming Soon Road Sign - yellow diamond shape" /> </div>`,
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

const CHECK_HTML_ONCLICK = `
onclick='if((document.getElementById("c2m_html").style.display === "")||(document.getElementById("c2m_html").style.display ==="none")){ console.log("--- gong to click");document.getElementById("c2m_html_button").click(); } '`;

/*function check(){
    // is div#c2m_html style display:none

}*/

//const CI_CSS_URL = "https://s3.amazonaws.com/filebucketdave/banner.js/com14_study.css";

const TABLE_CLASS = ["table", "stripe-row-odd"];

const ACCORDION_TEMPLATE = `
<details style="margin-bottom: 0.5rem; padding: .5rem 1rem; clear:both" class="w2c-h2">
  <summary style="padding: 0.5rem; margin: -0.5rem; background: #efefef; border-radius: 5px; cursor: pointer; font-size: 1.2em;">
    <strong>{TITLE}</strong>
  </summary>
  <div class="accordion-content" style="border-bottom-color: #efefef; border-bottom-style: solid; border-bottom-width: 2px; border-left-color: #efefef; border-left-style: solid; border-left-width: 2px; border-right-color: #efefef; border-right-style: solid; border-right-width: 2px;   padding: 1em; margin-left: -.5rem; margin-right: -0.5rem;">
  {CONTENT}
  </div>
</details>
`;

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

        console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR");
        console.log(this.mammothResult.value);
        console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR");

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

        // Canvas culls the base64 images, Canvas RCE doesn't use themm
        this.checkBase64Images(doc);

        // Canvas External URL module items can't have descriptive content
        this.checkExternalUrls(doc);

        this.checkBlackboardUrls(doc);

        this.checkCIBlackboardStyles(doc);

        // canvasImages may have filenames as URLs, i.e. broken images
        // offer an explanation
        this.checkCanvasImages(doc);

        // check for failed application of Word styles by CAR
        this.checkFailedStyles(doc);

        this.mammothResult.value = doc.documentElement.outerHTML;
    }

    /**
     * CAR word generation can sometimes not successfully apply styles.
     * For some styles they leave tell tell content that is unstyled
     * (e.g. Picture - (Start of picture)) Detect these and warn
     * @param {Object} doc 
     */
    checkFailedStyles(doc) {
        const possibleFailedStyles = {
            "activity": {
                "start": "(Start of Activity)",
                "end": "(End of Activity)"
            },
            "Note": {
                "start": "(Start of AEL Note)",
                "end": "(End of AEL Note)"
            },
            "Picture": {
                "start": "(Start of Picture)",
                "end": "(End of Picture)"
            }
        };


        let error = '<span {id} class="w2c-error">failedWordStyle</span>';
        let numErrors = 0;

        let failedStyles = [];

        // loop through all the <p> elements and check for the failed styles
        let pElements = doc.querySelectorAll("p");
        for (let i = 0; i < pElements.length; i++) {
            let p = pElements[i];
            let pText = p.innerHTML;
            // loop through all properties ofr possibleFailedStyles object

            for (const style in possibleFailedStyles) {
                // use regex to test that pText only contains start
                const checks = possibleFailedStyles[style];
                let regex = new RegExp(checks.start);
                if (pText.match(regex)) {
                    failedStyles.push(style);
                    const errorString = error.replace('{id}', `id="failed-style-${numErrors}"`);
                    p.insertAdjacentHTML('beforebegin', errorString);
                    numErrors++;
                } else {
                    // if didn't find start, check for end
                    regex = new RegExp(checks.end);
                    if (pText.match(regex)) {
                        failedStyles.push(style);
                        const errorString = error.replace('{id}', `id="failed-style-${numErrors}"`);
                        p.insertAdjacentHTML('beforebegin', errorString);
                        numErrors++;
                    }
                }
            }
        }

        error = `<a href="#failed-style-{id}" ${CHECK_HTML_ONCLICK}><span class="w2c-error">failedWordStyle</span></a>`;
        for (let i = 0; i < failedStyles.length; i++) {
            // only show error for external URL that has more than a URL, if it has a valid URL
            const errorString = error.replace('{id}', `${i}`);
            this.mammothResult.messages.push({
                "type": "error",
                "message": `${errorString} Appears Word style <em>${failedStyles[i]}</em> not successfully applied 
                                <small><strong><a target="_blank" 
                   href="https://djplaner.github.io/word-to-canvas-module/reference/warnings/failedWordStyles/">
                   For more <i class="icon-question"></i></a></strong></small>`,
            });
        }


    }


    /**
     * Identify all the Content Interface Blackboard specific styles and generate warnings
     * @param {Object} doc dom element
     */

    checkCIBlackboardStyles(doc) {
        const ciBlackboardStyles = [
            'h1.blackboard', 'h2.blackboard', 'span.blackboardLink',
            'span.blackboardContentLink', 'span.blackboardMenuLink'
        ];

        // hash of arrays of hashes recording all problematic finds
        // TODO add in heading
        // foundStyles[h1.blackboard] = [ { text: "", heading: ""}]
        let foundStyles = {};


        // for each of the ciBlackboardStyles check if any of the elements exist
        ciBlackboardStyles.forEach(style => {
            let elements = doc.querySelectorAll(style);
            // for each of the elements, save the text and the h1 they belong to
            for (let i = 0; i < elements.length; i++) {
                let element = elements[i];
                let text = element.innerText;
                // a h1 style is it's own heading
                let heading = "not found";
                if (style.startsWith('h1.')) {
                    heading = text;
                } else {
                    // get the h1 element before element
                    let previous = element.previousElementSibling || element.parentNode;
                    while (previous && previous.tagName !== 'H1') {
                        previous = previous.previousElementSibling || previous.parentNode;
                    }
                    if (previous) {
                        heading = previous.innerText;
                    }
                }
                if (text.length > 0) {
                    if (foundStyles[style]) {
                        foundStyles[style].push({ text: text, heading: heading });
                    } else {
                        foundStyles[style] = [{ text: text, heading: heading }];
                    }
                }
            }
        });

        // loop thru each key of foundStyles
        for (const style in foundStyles) {
            let message = `<p>Found Blackboard specific style - <em>${style}</em> - ${foundStyles[style].length} times:</p><ul>`;
            for (let i = 0; i < foundStyles[style].length; i++) {
                message += `<li> under heading <em>${foundStyles[style][i].heading}</em> with text <em>${foundStyles[style][i].text}</em></li>`;
            }
            message += '</ul>';
            this.mammothResult.messages.push({ "type": "error", "message": message });
        }

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
                empty += 1;
                // insert a <span class="w2c-error"> into the h1
                const error = '<span class="w2c-error">empty heading 1</span>';
                h1.insertAdjacentHTML('beforeend', error);
            }
        }

        if (empty > 0) {
            this.mammothResult.messages.push({
                "type": "error",
                "message": `Found ${empty} empty Heading 1s (see below). Remove and try again.`,
            });
        }
    }

    /**
     * Look for all the h1.canvasExternalUrl and check to see if their section only
     * contains a URL and it's a valid URL
     * @param {Object} doc - the html element/document with the converted module
     */
    checkExternalUrls(doc) {
        let extUrls = doc.querySelectorAll('h1.canvasExternalUrl');

        // track names of any external URLs with more than just a URL
        let problems = [];
        // true for each externalUrl heading that has a valid URL (and nothing else)
        let validUrls = {};
        let error = '<span {id} class="w2c-error">canvasExternalUrl</span>';
        for (let i = 0; i < extUrls.length; i++) {
            let extUrl = extUrls[i];
            let content = this.nextUntil(extUrl, 'h1');
            validUrls[extUrl.innerText] = false;

            if (content) {
                // get innerText for each element of content array
                let valid = false;
                let invalid = false;
                for (let j = 0; j < content.length; j++) {
                    if (!this.isValidHttpUrl(content[j].innerText)) {
                        // append the innerText of extUrl to the problems array
                        invalid = true;
                    } else {
                        valid = true;
                        //validUrls[extUrl.innerText] = true;
                    }
                }
                // we have a problem, if there is no valid URL or there is invalid data
                if (!valid || invalid) {
                    // add the exUrl to the problems array
                    problems.push(extUrl.innerText);
                    // insert the error span near the extUrl
                    const numProbs = problems.length - 1;
                    const errorString = error.replace('{id}', `id="canvas-external-url-${numProbs}"`);
                    extUrl.insertAdjacentHTML('beforebegin', errorString);
                }
            }
        }

        error = `<a href="#canvas-external-url-{id}" ${CHECK_HTML_ONCLICK}><span class="w2c-error">canvasExternalUrl</span></a>`;
        for (let i = 0; i < problems.length; i++) {
            // only show error for external URL that has more than a URL, if it has a valid URL
            const errorString = error.replace('{id}', `${i}`);
            this.mammothResult.messages.push({
                "type": "error",
                "message": `${errorString} The Canvas External URL heading - <em>${problems[i]}</em> - contained more than just a URL.
                                <small><strong><a target="_blank" 
                   href="https://djplaner.github.io/word-to-canvas-module/reference/warnings/externalUrls/">
                   For more <i class="icon-question"></i></a></strong></small>`,
            });
        }

        // loop thru keys of validUrls
        /*        for (let key in validUrls) {
                    this.mammothResult.messages.push({
                        "type": "error",
                        "message": `YYThe Canvas External URL heading - <em>${key}</em> - does not include a valid URL
                        <small><strong><a target="_blank" 
                           href="https://djplaner.github.io/word-to-canvas-module/docs/warnings/externalUrlsProblems.html">
                           For more <i class="icon-question"></i></a></strong></small>`,
                    });
                } */
    }

    /**
     * Check all the links to see if there are any Blackboard links
     * @param {DOM} doc 
     */

    checkBlackboardUrls(doc) {
        // get all the links from doc
        let links = doc.querySelectorAll('a');

        let error = '<span {id} class="w2c-error">Blackboard Link</span>';

        let blackboardLinks = {};
        // loop through the links and check for blackboard links
        let numError = 0;
        for (let i = 0; i < links.length; i++) {
            let link = links[i];
            // is link.href already a key for blackboardLinks
            if (blackboardLinks[link.href]) {
                blackboardLinks[link.href].push({
                    "text": link.innerText,
                    "count": numError
                }
                );
                const errorString = error.replace('{id}', `id="blackboard-link-${numError}"`);
                numError += 1;
                link.insertAdjacentHTML('beforebegin', errorString);
            }
            else if (this.isBlackboardLink(link.href)) {
                blackboardLinks[link.href] = [
                    { "text": link.innerText, "count": numError },
                ];
                const errorString = error.replace('{id}', `id="blackboard-link-${numError}"`);
                numError += 1;
                link.insertAdjacentHTML('beforebegin', errorString);
            }
        }

        // loop through keys of blackboardLinks
        // - for each link show the number of times and texts it was used with
        error = `<a href="#blackboard-link-{id}" ${CHECK_HTML_ONCLICK}><span class="w2c-error">Blackboard Link</span></a>`;
        for (let link in blackboardLinks) {
            let message = `Found Blackboard link - <em><small>${link}</small></em> - ${blackboardLinks[link].length} times, including:<ul>`;
            for (let i = 0; i < blackboardLinks[link].length; i++) {
                const errorString = error.replace('{id}', `${blackboardLinks[link][i].count}`);
                message += ` <li>${errorString} ${blackboardLinks[link][i].text}</li>`;
            }
            message += `</ul>`;

            this.mammothResult.messages.push({ "type": "error", "message": message });
        }

    }

    /**
     * Return true iff the link is a blackboard link
     * @param {String} link 
     */

    isBlackboardLink(link) {
        return (
            link.includes('https://bblearn.griffith.edu.au') ||
            link.includes('https://bblearn-blaed.griffith.edu.au') ||
            link.includes('/webapps/blackboard')
        );
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
                base64 += 1;
                // insert a <span class="w2c-error"> into the img
                const error = '<span class="w2c-error">base64 image</span>';
                img.insertAdjacentHTML('beforebegin', error);
            }
        }
        if (base64 > 0) {
            this.mammothResult.messages.push({
                "type": "error",
                "message": `Found ${base64} base64 images <small>(labeled in HTML)</small>. 
                           These will be replaced with placeholders.<br /> 
                           <small><strong>
                             <a target="_blank" href="https://djplaner.github.io/word-to-canvas-module/reference/warnings/htmlConversion/#base64-images">For more <i class="icon-question"></i></a></strong></small>`,
            });
        }

    }

    /**
     * Check for any span.canvasImage
     * @param {DOM} doc 
     */

    checkCanvasImages(doc) {
        // search doc for any span.canvasImage
        let canvasImages = doc.querySelectorAll('span.canvasImage');

        let message = `Found ${canvasImages.length} "Canvas Images" <small>(labeled in HTML)</small>. 
                       Broken images may be fixed in the final stage.<br /> 
                       <small><strong>
                         <a target="_blank" href="https://djplaner.github.io/word-to-canvas-module/reference/warnings/canvasImages/">For more <i class="icon-question"></i></a></strong></small>
                         <ul>`;
        let error = '<span {id} class="w2c-warning">canvasImage</span>';
        // insert a warning next to each canvasImage
        for (let i = 0; i < canvasImages.length; i++) {
            let imgSpan = canvasImages[i];
            const errorString = error.replace('{id}', `id="canvas-image-${i}"`);
            imgSpan.insertAdjacentHTML('beforebegin', errorString);
            // get the alt text of imgSpan > img
            let alt = "<em>no alt text</em>";
            let img = imgSpan.querySelector('img');
            if (img) {
                alt = img.getAttribute('alt');
            }
            // need to append something for this image to message
            let msgErrorString = `<a href="#canvas-image-${i}" ${CHECK_HTML_ONCLICK}><span class="w2c-warning">canvasImage</span></a>`;
            message += `<li>${msgErrorString} image with <em>alt</em> text ${alt}</li>`;
        }

        if (canvasImages.length > 0) {
            message += "</ul>";
            this.mammothResult.messages.push({
                "type": "error",
                "message": message
            });
        }
    }


    /**
     * Find all the span.blackboardImage
     * - group all the sequential span.blackboardImage into a single tag
     * - decode the entities into the content of the single span.canvasImage
     * - remove the span.blackboardImage
     * @param {DOMParser} doc 
     */
    handleBlackboardImage(doc) {

        // get the next span.blackboardImage
        let span = doc.querySelector('span.blackboardImage');
        while (span) {
            // set up the new span.canvasImage
            let tmpSpan = doc.createElement('span');
            // set tmpSpan class to "canvasImage"
            tmpSpan.classList.add('canvasImage');
            // insert tmpSpan before span
            span.parentNode.insertBefore(tmpSpan, span);

            // get all the sibling span.blackboardImage and add content to tmpSpan
            while (span && span.tagName === "SPAN" && span.className === "blackboardImage") {
                let content = span.innerHTML;
                tmpSpan.innerHTML += content;

                // get the next sibling element
                let oldSpan = span;
                span = span.nextElementSibling;
                // remove oldSpan
                oldSpan.parentNode.removeChild(oldSpan);
            }
            // translate the old content from encoded
            tmpSpan.innerHTML = this.decodeEntities(tmpSpan.innerHTML);

            // get the next span.blackboardImage (i.e. not a sibling)
            span = doc.querySelector('span.blackboardImage');
        }
    }

    /**
     * Find all the div.faqHeading
     * - get the content of div.faqHeading
     * - get the next div.faqBody and get content
     * - replace div.faqHeading and div.faqBody with a details/summary tag
     * @param {DOMParser} doc 
     */
    handleFAQs(doc) {

        // get the next div.faqHeading
        let heading = doc.querySelector('div.faqHeading');
        while (heading) {
            // get the next sibling of heading
            let nextSibling = heading.nextElementSibling;
            // check that it is a div.faqBody
            if (nextSibling.tagName === "DIV" && nextSibling.className === "faqBody") {
                // get content of nextSibling
                let bodyContent = nextSibling.innerHTML;
                // remove nextSibling
                nextSibling.parentNode.removeChild(nextSibling);
                // get content of heading
                let headingContent = heading.innerHTML;
                // create a details/summary tag
                let details = doc.createElement('details');
                details.style.backgroundColor = '#f8f4ec';
                details.style.color = '#7c2529';
                details.style.borderBottom = '1px solid #e4d589';
                details.style.marginLeft = '2em';
                details.style.marginRight = '4em';
                // set details font-size to 1.2em
                details.style.fontSize = '90%';

                let summary = doc.createElement('summary');
                summary.style.padding = '.5em';
                //summary.style.backgroundColor = '#c8102e';
                //summary.style.backgroundColor = 'var(--ic-brand-button--primary-bgd)';
                summary.style.backgroundColor = '#f0f0f0';
                summary.style.color = '#000000';
                // set summary content
                headingContent = headingContent.replace(/<p[^>]*>/g, '');
                headingContent = headingContent.replace(/<\/p>/g, '');

                summary.innerHTML = headingContent;
                // wrap summary inner html in a h4 tag
                summary.innerHTML = `<span style="font-size:80%"><strong>${summary.innerHTML}</strong></span>`;
                // remove any <p> tag from summary.innerHTML
                //                summary.innerHTML = summary.innerHTML.replace(/<p[^>]*>/g, '');
                //               summary.innerHTML = summary.innerHTML.replace(/<\/p>/g, '');

                // add summary to details
                details.appendChild(summary);
                // add bodyContent at end of details
                details.innerHTML += bodyContent;
                // replace heading with details
                heading.parentNode.replaceChild(details, heading);
            }
            heading = doc.querySelector('div.faqHeading');
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

        this.checkFatalErrors(doc);

        this.handleCanvasFileLinks(doc);

        // remove any links with empty innerText
        let links2 = doc.querySelectorAll('a');
        for (let i = 0; i < links2.length; i++) {
            let link = links2[i];
            // remove all whitespace from innerText
            let innerText = link.innerText.replace(/\s/g, '');
            if (innerText === "") {
                link.parentNode.removeChild(link);
            }
        }

        // span.embed
        let embeds = doc.querySelectorAll('span.embed');
        // iterate over the embeds and use this.decodeEntities to decode the innerHTML
        for (let i = 0; i < embeds.length; i++) {
            let embed = embeds[i];
            console.error(embed.innerHTML);
            embed.innerHTML = this.decodeEntities(embed.innerHTML);
            console.error(embed.innerHTML);
        }

        this.handleBlackboardImage(doc);

        this.handleCanvasMenuLinks(doc);

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


        // add class TABLE_CLASS to all of the tables
        doc.querySelectorAll('table').forEach((elem) => {
            // add class TABLE_CLASS to elem 
            TABLE_CLASS.forEach((tableClass) => {
                elem.classList.add(tableClass);

            });
        });

        // convert the div.faqHeading and div.faqBody
        this.handleFAQs(doc);

        // handle the content interface special styles
        this.handleContentInterfaceComplexStyles(doc);

        // Content Interface pre-pends - do this after previous tidy up
        // - experimenting to see if this works in combination with juiceit #46
        this.contentInterfacePreprends(doc);

        // insert the content interface CSS - located at CI_CSS_URL - into the document
        /*let css = document.createElement('link');
        css.rel = 'stylesheet';
        css.href = CI_CSS_URL;
        document.head.appendChild(css); */

        // "juiceit" is a way to convert external CSS into inline styles
        if (JUICE_IT) {
            // take the doc DomElement and make the changes
            doc = this.juiceit(doc);
        }


        // convert the doc back to a string
        this.mammothResult.value = doc.documentElement.outerHTML;
    }

    /**
     * Perform various checks on the converted HTML doc, including
     * Ensure there is 
     * - at least one div.moduleTitle (and preferably at the beginning of the document??)
     * - at least one h1
     * - no content before the first h1
     */

    checkFatalErrors(doc) {
        let message = "";
        // check for at least one div.moduleTitle
        let moduleTitles = doc.querySelectorAll('div.moduleTitle');
        if (moduleTitles.length === 0) {
            message = `<p><strong>Fatal error:</strong> No module title found in the document.
            <span class="w2c-forMore">
            <a target="_blank" href="https://djplaner.github.io/word-to-canvas-module/reference/warnings/fatalErrors/#no-title">
                         For more <i class="icon-question"></i></a></span></p>
           <p>This means that the original Word document did not use the <em>Title</em> style. The 
           "title" in the Word document is required as it becomes the name of the Canvas module to be created.
           Without a title the conversion cannot continue.
                         </p>`;

            this.mammothResult.messages.push({
                "type": "fatal-error",
                "message": message
            });
        }
        if (moduleTitles.length>1) {
            message = `<p>More than one module title found in the document. i.e. more than one separate use of the <em>Title</em> style.</p>
            <p>The Canvas module will be named using the first title.</p>`;
           /* Found ${problems} problems with Canvas Menu Links <small>(labeled in HTML)</small>. 
                       <small><strong>
                         <a target="_blank" href="https://djplaner.github.io/word-to-canvas-module/reference/warnings/canvasImages/">
                         For more <i class="icon-question"></i></a></strong></small>
                         <ul> ${message} </ul>`; */

            this.mammothResult.messages.push({
                "type": "error",
                "message": message
            });
        }

        // check for at least on h1
        let h1s = doc.querySelectorAll('h1');
        if (h1s.length === 0) {
            message = `<p><strong>Fatal error</strong> No h1 found in the document.  
            <span class="w2c-forMore">
            <a target="_blank" href="https://djplaner.github.io/word-to-canvas-module/reference/warnings/fatalErrors/#no-module-items">
                         For more <i class="icon-question"></i></a></span></p>
             <p>This suggests that the Word document did not include any use of the special 
             <a href="https://djplaner.github.io/word-to-canvas-module/reference/word-styles/#canvas-specific-styles">
             Canvas specific Word styles</a> used to define items to be added to the module. Such styles include:</p> 
             <em>Existing Canvas Page</em>, <em>Canvas Discussion</em>, <em>Canvas Assignment</em>, <em>Canvas Quiz</em>,
             <em>Canvas File</em>, <em>Canvas SubHeader</em>, <em>Canvas External Url</em>, or <em>Canvas External Tool</em>.</p>
             <p>With no items to add to the module, Word2Canvas will not continue.
            </p>`;
            this.mammothResult.messages.push({
                "type": "fatal-error",
                "message": message
            });
        }

        // check if there is any content (except div.title) before the first h1
        // make a copy of doc to do this check
        let docCopy = doc.cloneNode(true);

        // remove any div.Hide elements from docCopy
        let hiddenElems = docCopy.querySelectorAll('div.Hide');
        for (let i = 0; i < hiddenElems.length; i++) {
            let hiddenElem = hiddenElems[i];
            hiddenElem.parentNode.removeChild(hiddenElem);
        }
        // remove any div.moduleTitle elements from docCopy
        let moduleCopyTitles = docCopy.querySelectorAll('div.moduleTitle');
        for (let i = 0; i < moduleCopyTitles.length; i++) {
            let moduleTitle = moduleCopyTitles[i];
            moduleTitle.parentNode.removeChild(moduleTitle);
        }

        let firstH1 = docCopy.querySelector('h1');
        let firstH1Parent = firstH1.parentNode;
        let firstH1Index = Array.prototype.indexOf.call(firstH1Parent.children, firstH1);
        let firstH1Siblings = Array.prototype.slice.call(firstH1Parent.children, 0, firstH1Index);
        let firstH1SiblingsText = firstH1Siblings.map((elem) => {
            return elem.textContent;
        }
        ).join('');

        // if there is any text in firstH1SiblingsText, then generate a fatal error
        if (firstH1SiblingsText.trim() !== '') {
            message = `<p><strong>Fatal error</strong> Content found before the first h1.
            <span class="w2c-forMore">
            <a target="_blank" href="https://djplaner.github.io/word-to-canvas-module/reference/warnings/fatalErrors/#content-before-first-heading">
                            For more <i class="icon-question"></i></a></span></p>
            <p>Apparently meaningful content was found before a heading. i.e. not part of a module item.</p>`;
            this.mammothResult.messages.push({
                "type": "fatal-error",
                "message": message
            });
        }
    }

    /**
     * Need to tidy up the span.canvasFileLinks, currently two cases
     * 1. 
     * @param {*} doc 
     */
    handleCanvasFileLinks(doc) {

            // sanity check for canvasFileLinks
        // test
        let fileLinks = doc.querySelectorAll('.canvasFileLink');
        for (let i = 0; i < fileLinks.length; i++) {
            let link = fileLinks[i];
            if (link.tagName !== "A") {
                console.log("Found a canvasFileLink that is not an A tag");
            }
        }
    }


    /**
     * Look for any span.canvasMenuLink and attempt to convert the href for the link
     * to point to the URL contained in the canvas menu ul#section-tabs
     * @param {DomElement} doc - containing Mammoth HTML conversion
     */

    handleCanvasMenuLinks(doc) {
        let canvasMenuLinks = doc.querySelectorAll('span.canvasMenuLink');
        let message = "";
        let problems = 0;


        if (canvasMenuLinks.length == 0) {
            return;
        }

        // Problem here is that Mammoth/Word lead to strange
        // combinations of spans and links
        // - one link can be spread across multiple sequential words
        //   Join these into one
        // - the link for the canvasMenuLink can actually be the parent
        //   TODO need to move it inside

        let i = 0;
        while (i < canvasMenuLinks.length) {
            // get the parent link
            let link = canvasMenuLinks[i].parentNode;

            // join the contents of all the span.canvasMenuLink within the link
            let canvasMenuLinkContents = [];
            let internalLinks = link.querySelectorAll('span.canvasMenuLink');
            for (let j = 0; j < internalLinks.length; j++) {
                canvasMenuLinkContents.push(internalLinks[j].innerHTML);
            }
            // make copy of link 
            let newLink = link.cloneNode(true);
            // replace link.innerHTML with all the contents of canvasMenuLinkConents
            newLink.innerHTML = canvasMenuLinkContents.join('');
            // create new span.canvasMenuLink and add the link into it
            let canvasMenuLink = document.createElement('span');
            canvasMenuLink.classList.add('canvasMenuLink');
            canvasMenuLink.appendChild(newLink);
            // replace link with canvasMenuLink
            link.parentNode.replaceChild(canvasMenuLink, link);
            // skip over all the internal links found
            i += internalLinks.length;
        }

        let canvasMenu = document.querySelector('ul#section-tabs');
        // create a hash of the canvas menu links li.section > a
        let canvasMenuLinksHash = {};
        canvasMenu.querySelectorAll('li.section > a').forEach((elem) => {
            // if there is elem.href && elem.innerText
            if (elem.href && elem.innerText) {
                canvasMenuLinksHash[elem.innerText] = elem.href;
            }
        });

        // iterate over the modified list of canvasMenuLinks
        // replace the href with the hash value
        canvasMenuLinks = doc.querySelectorAll('span.canvasMenuLink');
        if (canvasMenuLinks.length == 0) {
            return;
        }
        // TODO add in error checks when can't find a courseMenuLink
        canvasMenuLinks.forEach((elem) => {
            let link = elem.querySelector('a');
            if (link && link.href) {
                // get the href of link
                let href = link.href;
                // get the last part of href i.e. the name of the menu
                let menuName = href.split('/').pop();
                if (canvasMenuLinksHash[menuName]) {
                    link.href = canvasMenuLinksHash[menuName];
                }
            } else {
                // we have a canvasMenuLink that doesn't actually have a link
                let msgErrorString = `
                <a href="#canvas-menulink-${problems}" ${CHECK_HTML_ONCLICK}>
                <span class="w2c-warning">MissingMenuLink</span></a>`;
                message += `<li>${msgErrorString} missing link </li>`;
                // insert msgErrorString before elem
                msgErrorString = `<span class="w2c-warning" id="#canvas-menulink-${problems}>MissingMenuLink</span></a>`;
                elem.insertAdjacentHTML('beforebegin', msgErrorString);
                problems += 1;
            }
        });

        if (problems > 1) {
            message = `Found ${problems} problems with Canvas Menu Links <small>(labeled in HTML)</small>. 
                       <small><strong>
                         <a target="_blank" href="https://djplaner.github.io/word-to-canvas-module/reference/warnings/canvasImages/">
                         For more <i class="icon-question"></i></a></strong></small>
                         <ul> ${message} </ul>`;

            this.mammothResult.messages.push({
                "type": "error",
                "message": message
            });
        }
    }

    /**
     * Content Interface div.flashback has been converted into a start and end Flashback style
     * in the Word document, in turn converted into two p.flashback earlier in the conversion.
     * This function removes each pair of p.flashback and wraps what's between them into
     * div.flashback.
     * @param {DomElement} doc - containing Mammoth html conversion
     */

    handleContentInterfaceComplexStyles(doc) {
        let firstDiv = null;
        let nextDiv = null;

        let message = "";
        let problems = 0;

        // get all the html for doc
        //        let html = doc.documentElement.outerHTML;
        //        console.log(html);

        // declar array styles with entries

        const ci_styles = [
            'p.flashback', 'p.canaryExercise', 'p.weeklyWorkout',
            'p.ael-note', 'p.guAddedAdvice', 'p.reading', 'p.activity',
            'p.comingSoon', 'p.picture', 'p.pictureRight', 'div.poem',
            'div.poemRight'
        ];

        // loop through styles array 
        for (const ci_style of ci_styles) {

            // keeping going until we run out of pairs of div.flashback
            // get all the p.flashback
            let ps = doc.querySelectorAll(ci_style);
            let count = 0;
            while ((ps.length > 1) && (count < ps.length)) {
                // check that we've got a pair of div.flashback
                firstDiv = ps[count];
                nextDiv = ps[count + 1];

                // TODO need to check if nextDiv is defined, if not, we're
                // if ! nextDiv generate errors and break out of loop
                if (!nextDiv) {
                    let msgErrorString = `
                    <a href="#ci-complex-${problems}" ${CHECK_HTML_ONCLICK}>
                    <span class="w2c-error">MissingComplexStyleEndStyle</span></a>`;
                    message += `<li>${msgErrorString} missing end style </li>`;
                    // insert msgErrorString before elem
                    msgErrorString = `<span class="w2c-error" id="#ci-complex-${problems}>MissingComplexStyleEndStyle</span></a>`;
                    firstDiv.insertAdjacentHTML('beforebegin', msgErrorString);
                    problems += 1;
                    break;
                }

                // missing a pair and need to insert an error
                count += 2;
                // put everything in between the two div.flashbacks
                // get everything until next div.flashback
                let content = this.nextUntil(firstDiv, ci_style);
                content = content.map(elem => elem.outerHTML);
                // join content array strings into single string 
                // - at this stage content includes the start/flashback
                content = content.join('');

                // remove all the elements between firstDiv and nextDiv
                let start = firstDiv;
                while (start.nextElementSibling && start.nextElementSibling !== nextDiv) {
                    start.nextElementSibling.remove();
                }
                // remove the nextDiv
                nextDiv.remove();
                //nextDiv.parentNode.removeChild(nextDiv);

                // replace firstDiv with content
                //firstDiv.innerHTML = content;
                // change firstDiv tag from p to div
                let newFirstDiv = document.createElement('div');

                if (ci_style.includes('div.poem')) {
                    // a poem style gets that class and straight content, no instructions
                    newFirstDiv.innerHTML = content;
                    const className = ci_style.substring(4);
                    newFirstDiv.classList.add(className);
                } else {
                    if (
                        (ci_style === "p.flashback") ||
                        (ci_style === "p.canaryExercise") ||
                        (ci_style === "p.weeklyWorkout") ||
                        (ci_style === "p.ael-note") ||
                        (ci_style === "p.reading") ||
                        (ci_style === "p.activity") ||
                        (ci_style === "p.comingSoon")
                    ) {
                        newFirstDiv.innerHTML = `<div class="instructions">${content}</div>`;
                    } else {
                        newFirstDiv.innerHTML = content;
                    }
                    // remove p. from from front of ci_style
                    const className = ci_style.substring(2);
                    newFirstDiv.classList.add(className);
                }
                // replace firstDiv with newFirstDiv
                firstDiv.parentNode.replaceChild(newFirstDiv, firstDiv);
            }
        }

        if (problems > 0) {
            message = `Found ${problems} problems with Content Interface Styles <small>(labeled in HTML)</small>. 
                       <small><strong>
                         <a target="_blank" href="https://djplaner.github.io/word-to-canvas-module/reference/warnings/canvasImages/">
                         For more <i class="icon-question"></i></a></strong></small>
                         <ul> ${message} </ul>`;

            this.mammothResult.messages.push({
                "type": "error",
                "message": message
            });
        }
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

        // console log details of line number etc for error
        let stack = error.stack.split('\n');
        let line = stack[1].split(':');
        let lineNumber = line[1];
        let file = line[0];
        console.log(`Error converting file ${file} at line ${lineNumber}`);
        console.log(stack);

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

    /**
     * check if a string is a valid URL
     * https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url 
     */
    isValidHttpUrl(string) {
        let url;
        try {
            url = new URL(string);
        } catch (_) {
            return false;
        }

        return url.protocol === "http:" || url.protocol === "https:";
    }

    /** 
     * 
     * Get all following siblings of each element up to but not including the element matched by the selector
     * (c) 2017 Chris Ferdinandi, MIT License, https://gomakethings.com
     * @param  {Node}   elem     The element
     * @param  {String} selector The selector to stop at
     * @param  {String} filter   The selector to match siblings against [optional]
     * @return {Array}           The siblings
     */
    nextUntil(elem, selector, filter) {

        // Setup siblings array
        var siblings = [];

        // Get the next sibling element
        elem = elem.nextElementSibling;

        // As long as a sibling exists
        while (elem) {

            // If we've reached our match, bail
            if (elem.matches(selector)) break;

            // If filtering by a selector, check if the sibling matches
            if (filter && !elem.matches(filter)) {
                elem = elem.nextElementSibling;
                continue;
            }

            // Otherwise, push it to the siblings array
            siblings.push(elem);

            // Get the next sibling element
            elem = elem.nextElementSibling;

        }

        return siblings;

    }


    /**
     * Use the Juice CSS liner on the HTML generated by Mammoth
     * https://automattic.github.io/juice/ Make changes to the html in the dom element
     * @param {*} doc  DomElement containing the html generated by Mammoth
     */

    juiceit(doc) {

        // add <style> to doc.body
        doc.body.insertAdjacentHTML("afterbegin", `<style>${CI_CSS}</style>`);

        let html = doc.documentElement.outerHTML;

        let juiceHTML = juice(html);

        let parser = new DOMParser();
        let doc2 = parser.parseFromString(juiceHTML, "text/html");
        return doc2;
    }

    /** 
     * User wants to add/remove class="inline_disabled" on all links for
     * youtube videos
     * TODO Challenge is that these links will likely be in span embeds
     * as well as other places
     * @param {Boolean} status - true to add class, false to remove class
     */

    disableInlineYoutube(status) {
        let html = document.querySelector('div#c2m_html').innerHTML;

        // parse the html
        let parser = new DOMParser();
        let doc = parser.parseFromString(html, "text/html");

        // get all anchors - normal html
        let anchors = doc.querySelectorAll('a');
        // loop through all the h2s
        for (let i = 0; i < anchors.length; i++) {
            // if the anchor has a youtube url
            if (anchors[i].href.includes('youtube.com')) {
                // if status is true, add class
                if (status) {
                    anchors[i].classList.add('inline_disabled');
                } else {
                    anchors[i].classList.remove('inline_disabled');
                }
            }
        }
        // handle the span.embeds which can include links
        // - find all span.embeds
        // - encode innerHTML to html
        // - modify the class list 
        // - re-encode html to entities and replace innerHTML
        /*        let spanEmbeds = doc.querySelectorAll('span.embed');
                for (let i = 0; i < spanEmbeds.length; i++) {
                    let html = spanEmbeds[i].innerHTML;
                    // decode the entities in html to html
                    html = this.decodeHtml(html);
                    let parser = new DOMParser();
                    let doc2 = parser.parseFromString(html, "text/html");
                    let anchors = doc2.querySelectorAll('a');
                    for (let j = 0; j < anchors.length; j++) {
                        if (anchors[j].href.includes('youtube.com')) {
                            if (status) {
                                anchors[j].classList.add('inline_disabled');
                            } else {
                                anchors[j].classList.remove('inline_disabled');
                            }
                        }
                    }
                    // re-encode the html to entities
                    html = this.encodeHtml(doc2.documentElement.outerHTML);
                    spanEmbeds[i].innerHTML = html;
                } */

        // get the html from the doc
        let html2 = doc.documentElement.outerHTML;
        // put the html in div#c2m_html
        document.querySelector('div#c2m_html').innerHTML = html2;
        this.mammothResult.value = html2;


    }

    /**
     * Called when the user has clicked on the h2 as accordion check box. Depending
     * on the state input#w2c-accordion will modify the html in mammothResult and also
     * in div#c2m_html
     */

    h2sAsAccordions() {
        // does input#w2c-accordion exist?
        let accordion = document.querySelector('input#w2c-accordion');
        if (!accordion) {
            console.log('input#w2c-accordion not found');
            return;
        }
        // what to do
        if (accordion.checked) {
            // accordion has been checked, time to convert h2s to accordions
            this.h2ToAccordion();
        } else {
            // accordion has been unchecked, time to convert accordions to h2s
            this.accordionToH2();
        }
    }

    /**
     * Get contents of div#c2m_html. Convert all the h2s to accordions
     */

    h2ToAccordion() {
        console.log('h2ToAccordion');

        // get the html from div#c2m_html
        let html = document.querySelector('div#c2m_html').innerHTML;

        // parse the html
        let parser = new DOMParser();
        let doc = parser.parseFromString(html, "text/html");

        // get all h2s
        let h2s = doc.querySelectorAll('h2');
        // loop through all the h2s
        for (let i = 0; i < h2s.length; i++) {
            // get the innerText of the h2
            let h2Text = h2s[i].innerText;
            // get all content from the h2 until the next h1/h2
            let h2Content = this.nextUntil(h2s[i], 'h1,h2');
            let content = h2Content.map(elem => elem.outerHTML);
            content = content.join('');

            let accordionHtml = ACCORDION_TEMPLATE;
            accordionHtml = accordionHtml.replace('{TITLE}', h2Text);
            accordionHtml = accordionHtml.replace('{CONTENT}', content);

            // insert the accordion html before the h2
            h2s[i].insertAdjacentHTML('beforebegin', accordionHtml);
            // remove the h2
            h2s[i].remove();
            // remove the content
            for (let j = 0; j < h2Content.length; j++) {
                h2Content[j].remove();
            }
        }
        // get the html from the doc
        let html2 = doc.documentElement.outerHTML;
        // put the html in div#c2m_html
        document.querySelector('div#c2m_html').innerHTML = html2;
        this.mammothResult.value = html2;
    }

    /**
     * Get contents of div#c2m_html. Convert all the accordions to h2s
     */

    accordionToH2() {
        console.log('accordionToH2');

        // get the html from div#c2m_html
        let html = document.querySelector('div#c2m_html').innerHTML;

        // parse the html
        let parser = new DOMParser();
        let doc = parser.parseFromString(html, "text/html");

        // get all the <details> elements in doc
        let details = doc.querySelectorAll('details.w2c-h2');
        // loop through all the <details> elements
        for (let i = 0; i < details.length; i++) {
            // get the innerHtml of details > summary 
            let summary = details[i].querySelector('summary').innerHTML;
            // remove the <strong> </strong> from summary
            summary = summary.replace('<strong>', '');
            summary = summary.replace('</strong>', '');
            // get the innerHtml of the details > .accordion-content
            let content = details[i].querySelector('.accordion-content').innerHTML;

            // create a new div containing both summary and content
            let newDiv = document.createElement('div');
            newDiv.innerHTML = `<h2>${summary}</h2>${content}`;

            // insert the new div before the details element
            details[i].insertAdjacentElement('beforebegin', newDiv);
            // remove the details element
            details[i].remove();
        }
        // get the html from the doc
        let html2 = doc.documentElement.outerHTML;
        // put the html in div#c2m_html
        document.querySelector('div#c2m_html').innerHTML = html2;
        this.mammothResult.value = html2;
    }

}

