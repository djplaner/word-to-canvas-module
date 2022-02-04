# Word to Canvas Module

Exploration to write a [userscript](https://en.wikipedia.org/wiki/User_script) to create a new [Canvas LMS](https://canvas.instructure.com/) module from a Word document (using some specific Word styles).

> :secret: The contents of the Word document always remain on your computer, your web browser, or eventually as a Module in the Canvas instance you are working with.

## Current Status

> **Note:** :warning: This project is in the early stages of :construction: development.

Rough user interface supports:

1. Addition of _.docx 2 + Module_ button on Canvas modules pages
2. Clicking it to choose and upload a Word document to the browser
3. Converting that Word document to HTML and visualising the conversion
4. Early start on splitting the HTML into a module data structure

To be done

1. Visualise the module data structure for checking
2. Using the Canvas API to add a new module with that structure

## Development

- Uses [mammoth.js](https://github.com/mwilliamson/mammoth.js/) for Word to HTML conversion

### Userscript

For local development it is suggested to

1. Use Chrome, with TamperMonkey installed and configured [to allow local file acess](https://www.tampermonkey.net/faq.php#Q204).
2. Install the [dev userscript](./dist/devWord2Canvas.user.js) version of the userscript.
3. Modify the dev script updating the local file: require to match the path on your computer.