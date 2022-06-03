# Create a word-2-canvas Word document

A word-2-canvas Word document uses specific Word styles to achieve different types of changes to a Canvas module. The [sample w2c.docx](https://github.com/djplaner/word-to-canvas-module/raw/main/sample%20w2c.docx) includes those styles is an example of how to use them.

> :information_source: For more on Word styles see [this resource](https://shaunakelly.com/word/styles/tipsonstyles.html) or search out your own

## How it works

[Canvas Modules](https://community.canvaslms.com/t5/Canvas-Basics-Guide/What-are-Modules/ta-p/6) are collections of items of different types. word-2-canvas allows you to write a Canvas module as a single Word document. Your Word document consists of a sequence of different heading styles. Each heading style represents a single Canvas item. 

The following illustrate how word-2-canvas converts the [sample w2c.docx file](https://github.com/djplaner/word-to-canvas-module/raw/main/sample%20w2c.docx) into a Canvas module.

| Word document | Canvas module |
|--------------|---------------|
|  ![sample w2c.docx Word document](images/word-document.png)  | ![Equivalent Canvas Module](images/example-module.png)             |

## Summary: word-2-canvas styles and their purpose

### Canvas specific styles

The following Word styles direct `word-2-canvas` to perform Canvas specific actions. e.g. create a new Canvas module with a title matching text in the `Title` style.

| word-2-canvas style | Purpose |
| ------------------ | ------- |
| `Title` <sup>*</sup> | The title of the new [Canvas module](https://community.canvaslms.com/t5/Canvas-Basics-Guide/What-are-Modules/ta-p/6) |
| `Heading 1` <sup>*</sup>| Name of a new [Canvas page](https://community.canvaslms.com/t5/Canvas-Basics-Guide/What-are-Pages/ta-p/5) |
| `Existing Canvas Page` | Name of a Canvas page already available in the course |
| `Canvas Discussion` | Name of an existing [Canvas discussion](https://community.canvaslms.com/t5/Canvas-Basics-Guide/What-are-Discussions/ta-p/3) |
| `Canvas SubHeader` | Name for a new [Canvas text (sub) header](https://community.canvaslms.com/t5/Instructor-Guide/How-do-I-add-a-text-header-as-a-module-item/ta-p/1208) |
| `Canvas File` | The name (or part of the name) of a file already in the Canvas course's [Files](https://community.canvaslms.com/t5/Canvas-Basics-Guide/What-are-Files/ta-p/7) |
| `Canvas File Link` | Insert a link to a Canvas file within a page. Apply this style to some text and it assumes that the text is the name of the file that it should link to. Apply this style to a link, then it assumes the link is the name of the file. |
| `Canvas Assignment` | The name (or part of the name) of an assignment already in the Canvas course's [Assignments](https://community.canvaslms.com/t5/Canvas-Basics-Guide/What-are-Assignments/ta-p/9) | 
| `Canvas Quiz` | The name (or part of the name) of a quiz already in the Canvas course's [Quizzes](https://community.canvaslms.com/t5/Canvas-Basics-Guide/What-are-Quizzes/ta-p/68)  |
| `Canvas External Url` | Add an [external link as a module item](https://community.canvaslms.com/t5/Instructor-Guide/How-do-I-add-an-external-URL-as-a-module-item/ta-p/967) |
| `Canvas Extternal Tool` | Add an [external tool as a module item](https://community.canvaslms.com/t5/Instructor-Guide/How-do-I-add-an-external-tool-as-a-module-item/ta-p/1146) |
| `Canvas Image` | Define some HTML that contains an `<img` tag where the `img.src` is the name of a file already in the Canvas course's [Files area](https://community.canvaslms.com/t5/Canvas-Basics-Guide/What-are-Files/ta-p/7). Will attempt to identify a URL for the file and insert it into the `img.src` |


<sup>*</sup> - Standard Word styles.

> :warning: **Canvas Quiz** only works for _Classic Quizzes_, **not** _New Quizzes_ (classic vs. new quizzes](https://it.umn.edu/services-technologies/how-tos/canvas-understand-classic-quizzes-vs-new)) because Canvas does [not yet have an API for new Quizzes](https://community.canvaslms.com/t5/Canvas-Question-Forum/QUIZZES-NEXT-API/m-p/140850/highlight/true#M56387).

### General web specific styles

The following style(s) direct `word-2-canvas` to perform general web specific actions. e.g. embed into a Canvas item some specific HTML.

| word-2-canvas style | Purpose |
| ------------------ | ------- |
| embed | Identifies text that will be inserted into a Canvas page as HTML. e.g. use it to embed a YouTube video | 

### Blackboard migration specific styles

The following style(s) directly `word-2-canvas` to perform actions designed to help migrate content from the Blackboard Learning Management System to Canvas.

| word-2-canvas style | Purpose |
| ------------------ | ------- |
| `Blackboard image p` | Define HTML that includes an `<img` tag for an image residing in the content collection of a Blackboard course site. Assuming the image has been migrated to the Canvas course's files area, will create an `<img` tag in a Canvas page with a URL to the image in Canvas   |
| `Hide` | Define text that should not be imported into the Canvas module. Typically used to provide Blackboard specific references to aid migration |