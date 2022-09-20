# Limitations and Issues

```word2canvas``` is actively being used but is still under development and has some known limitations.

> :material-chat-question: Feel free to use th [```word2canvas``` Issues forum](https://github.com/djplaner/word-to-canvas-module/issues) to ask questions and report any problems. 

## Known Limitations

1. Doesn't handle images embedded in Word documents.

    The Canvas editor [removes base64 encoded images from HTML](https://community.canvaslms.com/t5/Canvas-Question-Forum/base64-Images-Not-Displaying-in-Course-Pages/td-p/464739). The method ```word2canvas``` uses to convert the Word document to HTML converts images to base64 encoded images. The [current suggested "solution"](./docs/warnings/htmlConversion.md#base64-images) requires manual saving of these images and using them to replace placeholder images via the Canvas RCE. 

2. Required to use very specific Word styles.

    Your Word document must [use very specific styles](https://github.com/djplaner/word-to-canvas-module/blob/main/docs/create.md#summary-word-2-canvas-styles-and-their-purpose) to correctly create Canvas Modules and their items. There is a learning curve involved.

2. Doesn't work for [new Quizzes](https://community.canvaslms.com/t5/Canvas-Question-Forum/QUIZZES-NEXT-API/m-p/140850/highlight/true#M56387).

    Entirely because Canvas does [not yet have an API for new Quizzes](https://community.canvaslms.com/t5/Canvas-Question-Forum/QUIZZES-NEXT-API/m-p/140850/highlight/true#M56387).

## Known Issues

Currently, no known major issues.

Various bugs and improvements details in the [Issues forum](https://github.com/djplaner/word-to-canvas-module/issues)
