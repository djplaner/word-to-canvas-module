# Word to Canvas Module

Exploration to write a [userscript](https://en.wikipedia.org/wiki/User_script) to create a new [Canvas LMS](https://canvas.instructure.com/) module from a Word document (using some specific Word styles) - see [sample w2c.docx](./https://github.com/djplaner/word-to-canvas-module/raw/main/sample%20w2c.docx) for an annotated example.

> :secret: The contents of the Word document always remain on your computer, your web browser, or eventually as a Module in the Canvas instance you are working with.

## How to use

1. [Install the userscript](./docs/install.md)
   Install a userscript manager (e.g. [TamperMonkey](https://www.tampermonkey.net/)) on your browser of choice and then install the [word-2-canvas userscript](https://github.com/djplaner/word-to-canvas-module/raw/main/release/word2canvas.user.js).
2. [Create a Word document](./docs/create.md) containing content for your new Canvas module.
   Use the [sample w2.docx](https://github.com/djplaner/word-to-canvas-module/raw/main/sample%20w2c.docx) Word document as a template and example.
3. Visit the modules page of a Canvas course and [use word-2-canvas](./docs/use.md) to create a new module.
   If all is working, use the ```.docx 2 + Module``` button that appears to create a new module from the Word document.

![Canvas modules page with the word-2-canvas button added](docs/images/w2c-btn-modules-page.png)

## Current Status

> **Note:** :warning: This project is just about ready for use.

1. Addition of _.docx 2 + Module_ button on Canvas modules pages
2. Clicking it to choose and upload a Word document to the browser 
3. Converting that Word document to HTML and visualising the conversion
    Recognising specific Word styles to be converted to HTML classess for creating Canvas items.
4. HTML split and converted into collection of Javascript objects largely matching the Canvas API JSON
5. Module being created and items being added
  - Items supported include: creating new pages, sub-headers and external URLs; and, add existing: assignments, files, discussions, (old) quizzes, external tool, and pages.

To be done

1. Better error checking

## :warning: Known limitations

1. Use specific Word styles for full functionality.

   Each Canvas module item type is identified by a specific Word style (based on the _Heading 1_ style). The [sample w2c.docx](./https://github.com/djplaner/word-to-canvas-module/raw/main/sample%20w2c.docx) has defined these styles: Canvas Assignment; Canvas Discussion; Canvas Quiz; Canvas File; Exiting Canvas Page; Canvas SubHeader, Canvas External Url.

2. Doesn't work for new Quizzes[](https://community.canvaslms.com/t5/Canvas-Question-Forum/QUIZZES-NEXT-API/m-p/140850/highlight/true#M56387).

   Entirely because Canvas does [not yet have an API for new Quizzes](https://community.canvaslms.com/t5/Canvas-Question-Forum/QUIZZES-NEXT-API/m-p/140850/highlight/true#M56387).
  

## Development

- Uses [mammoth.js](https://github.com/mwilliamson/mammoth.js/) for Word to HTML conversion

### Userscript

For local development it is suggested to

1. Use Chrome, with TamperMonkey installed and configured [to allow local file acess](https://www.tampermonkey.net/faq.php#Q204).
2. Install the [dev userscript](./dist/devWord2Canvas.user.js) version of the userscript.
3. Modify the dev script updating the local file: require to match the path on your computer.
