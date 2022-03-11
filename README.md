# Word to Canvas Module

A [userscript](https://en.wikipedia.org/wiki/User_script) that will create a new [Canvas LMS](https://canvas.instructure.com/) module from a Word document (using some specific Word styles) - see [sample w2c.docx](./https://github.com/djplaner/word-to-canvas-module/raw/main/sample%20w2c.docx) for an annotated example.

> :exclamation: The contents of your Word documents always remain on your computer, your web browser, and eventually as a Module in the Canvas instance you are working with.

## How to use

1. [Install the userscript](./docs/install.md)
   Install a userscript manager (e.g. [TamperMonkey](https://www.tampermonkey.net/)) on your browser of choice and then install the [word-2-canvas userscript](https://github.com/djplaner/word-to-canvas-module/raw/main/release/word2canvas.live.user.js).
2. [Test the userscript](./docs/test.md)
   Use the [test userscript](./docs/test.md) to test the userscript.
2. [Create a Word document](./docs/create.md) containing content for your new Canvas module.
   Use the [sample w2.docx](https://github.com/djplaner/word-to-canvas-module/raw/main/sample%20w2c.docx) Word document as a template and example.
3. Visit the modules page of a Canvas course and [use word-2-canvas](./docs/use.md) to create a new module.
   If all is working, use the ```.docx 2 + Module``` button that appears to create a new module from the Word document (see following image).

> :grey_question: Feel free to use this [repo's Issues](https://github.com/djplaner/word-to-canvas-module/issues) to ask questions. Especially in these early development stages.

![Canvas modules page with the word-2-canvas button added](docs/images/w2c-btn-modules-page.png)

## Current Status

> **Note:** :warning: word-2-canvas appears to be working and is being used. But there remain rough edges and missing features.

Currently creates Canvas modules including
- Creating new: pages, sub-headers, and external urls.
- Links to existing: pages, assignments, files, discussions, quizzes (only old quizzes), and external tools.

## To be done

1. Better error checking and messaging
2. Support for a _Canvas File Link_ style
3. Figure out a better, more consistent way to handle images

## :warning: Known issues

1. The word-2-canvas button may not always appear on the Modules page.
   **Solution:** Reload the modules page. **Apparent cause:** Navigation between pages in a Canvas course doesn't always invoke word2Canvas to check if it's on the module page. A reload of the modules page forces the issue

## :warning: Known limitations

1. Use specific Word styles for full functionality.

   Each Canvas module item type is identified by a specific Word style (based on the _Heading 1_ style). The [sample w2c.docx](https://github.com/djplaner/word-to-canvas-module/raw/main/sample%20w2c.docx) has defined these styles: Canvas Assignment; Canvas Discussion; Canvas Quiz; Canvas File; Exiting Canvas Page; Canvas SubHeader, Canvas External Url.

2. Doesn't work for new Quizzes[](https://community.canvaslms.com/t5/Canvas-Question-Forum/QUIZZES-NEXT-API/m-p/140850/highlight/true#M56387).

   Entirely because Canvas does [not yet have an API for new Quizzes](https://community.canvaslms.com/t5/Canvas-Question-Forum/QUIZZES-NEXT-API/m-p/140850/highlight/true#M56387).
  

## Development

- Uses [mammoth.js](https://github.com/mwilliamson/mammoth.js/) for Word to HTML conversion

### Userscript

For local development it is suggested to

1. Use Chrome, with TamperMonkey installed and configured [to allow local file acess](https://www.tampermonkey.net/faq.php#Q204).
2. Install the [dev userscript](./dist/devWord2Canvas.user.js) version of the userscript.
3. Modify the dev script updating the local file: require to match the path on your computer.
