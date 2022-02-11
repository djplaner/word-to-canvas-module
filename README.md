# Word to Canvas Module

Exploration to write a [userscript](https://en.wikipedia.org/wiki/User_script) to create a new [Canvas LMS](https://canvas.instructure.com/) module from a Word document (using some specific Word styles) - see [sample w2c.docx](./sample w2c.docx) for an annotated example.

> :secret: The contents of the Word document always remain on your computer, your web browser, or eventually as a Module in the Canvas instance you are working with.

## Current Status

> **Note:** :warning: This project is in the early stages of :construction: development.

Rough user interface supports:

1. Addition of _.docx 2 + Module_ button on Canvas modules pages
2. Clicking it to choose and upload a Word document to the browser 
3. Converting that Word document to HTML and visualising the conversion
    Recognising specific Word styles to be converted to HTML classess for creating Canvas items.
4. HTML split and converted into collection of Javascript objects largely matching the Canvas API JSON
5. Module being created, pages being created, and not quite adding those pages as items

To be done

1. Be able to create items for each new item and then add them to the module.
2. Tidy up the user interface.

## Development

- Uses [mammoth.js](https://github.com/mwilliamson/mammoth.js/) for Word to HTML conversion

### Userscript

For local development it is suggested to

1. Use Chrome, with TamperMonkey installed and configured [to allow local file acess](https://www.tampermonkey.net/faq.php#Q204).
2. Install the [dev userscript](./dist/devWord2Canvas.user.js) version of the userscript.
3. Modify the dev script updating the local file: require to match the path on your computer.
