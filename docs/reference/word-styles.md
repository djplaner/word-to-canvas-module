# ```word2canvas``` Word styles

A ```word2canvas``` Word document uses specific Word styles to achieve different types of changes to a Canvas module. The [sample w2c.docx document](https://github.com/djplaner/word-to-canvas-module/raw/main/sample%20w2c.docx) includes those styles and is written to demonstrate their use. The [sample document walk-through](../walk-throughs/using-the-sample.md) shows how to use the sample document to create a Canvas module.

!!! Note "Word styles"

    For more on Word styles see [this resource](https://shaunakelly.com/word/styles/tipsonstyles.html) or search out your own

## How it works

[Canvas Modules](https://community.canvaslms.com/t5/Canvas-Basics-Guide/What-are-Modules/ta-p/6) are collections of items of different types. ```word2canvas``` allows you to write a Canvas module as a single Word document. Your Word document consists of a sequence of different heading styles. Each heading style represents a single Canvas item. 

The following illustrate how ```word2canvas``` converts the [sample w2c.docx file](https://github.com/djplaner/word-to-canvas-module/raw/main/sample%20w2c.docx) into a Canvas module. Note how each of the headings in the Word document (e.g. "Create a new page", "Welcome to the Course",..."Last page of this module") are the names given to items in the Canvas module.

| Word document | Canvas module |
|--------------|---------------|
|  ![sample w2c.docx Word document](../images/word-document.png)  | ![Equivalent Canvas Module](../images/example-module.png)             |

## Summary: ```word2canvas``` styles and their purpose

```word2canvas``` styles are divided into categories as to primary purpose, as summarised in the following table. The rest of the page describes each category's styles and their purpose.

| Category | Purpose |
|----------|---------|
| [Canvas specific](#canvas-specific-styles) | Create/access Canvas resource |
| [General web](#general-web-styles) | Create/access general web content |
| [Blackboard migration](#blackboard-migration-styles) | Aid in the migration of Blackboard specific content to Canvas |
| [Content Interface](#content-interface-styles) | Migrate and emulate [Content Interface](https://djplaner.github.io/Content-Interface-Tweak/) functionality |
| [Miscellaneous](#miscellaneous-styles) | Uncategorised purposes |

### Canvas specific styles

The following Word styles direct ````word2canvas```` to perform Canvas specific actions. e.g. create a new Canvas module with a title matching text in the `Title` style.

| ```word2canvas``` style | Purpose |
| ------------------ | ------- |
| `Title` [^*] | The title of the new [Canvas module](https://community.canvaslms.com/t5/Canvas-Basics-Guide/What-are-Modules/ta-p/6) |
| `Heading 1` [^*] | Name of a new [Canvas page](https://community.canvaslms.com/t5/Canvas-Basics-Guide/What-are-Pages/ta-p/5) |
| `Existing Canvas Page` | Name of a Canvas page already available in the course |
| `Canvas Discussion` | Name of an **existing** [Canvas discussion](https://community.canvaslms.com/t5/Canvas-Basics-Guide/What-are-Discussions/ta-p/3) |
| `Canvas SubHeader` | Name for a new [Canvas text (sub) header](https://community.canvaslms.com/t5/Instructor-Guide/How-do-I-add-a-text-header-as-a-module-item/ta-p/1208) |
| `Canvas File` | The name (or part of the name) of a file already in the Canvas course's [Files](https://community.canvaslms.com/t5/Canvas-Basics-Guide/What-are-Files/ta-p/7) |
| `Canvas File Link` | Insert a link to a Canvas file within a page. Apply this style to some text and it assumes that the text is the name of the file that it should link to. Apply this style to a link, then it assumes the link is the name of the file. |
| `Canvas Assignment` | The name (or part of the name) of an assignment already in the Canvas course's [Assignments](https://community.canvaslms.com/t5/Canvas-Basics-Guide/What-are-Assignments/ta-p/9) | 
| `Canvas Quiz` | The name (or part of the name) of a quiz already in the Canvas course's [Quizzes](https://community.canvaslms.com/t5/Canvas-Basics-Guide/What-are-Quizzes/ta-p/68)  |
| `Canvas External Url` | Add an [external link as a module item](https://community.canvaslms.com/t5/Instructor-Guide/How-do-I-add-an-external-URL-as-a-module-item/ta-p/967) |
| `Canvas External Tool` | Add an [external tool as a module item](https://community.canvaslms.com/t5/Instructor-Guide/How-do-I-add-an-external-tool-as-a-module-item/ta-p/1146) |
| `Canvas Image` | Define some HTML that contains an `<img` tag where the `img.src` is the name of a file already in the Canvas course's [Files area](https://community.canvaslms.com/t5/Canvas-Basics-Guide/What-are-Files/ta-p/7). Will attempt to identify a URL for the file and insert it into the `img.src` |
| `Canvas Menu Link` | Create a link where the "address" is the name of an item in the Canvas left hand menu. Will get replaced with the correct URL for the course site |


[^*]: These are standard Word styles which you will find in most Word documents.

!!! Note "Canvas Quiz Limitations"

    :warning: **Canvas Quiz** only works for _Classic Quizzes_, **not** _New Quizzes_ (classic vs. new quizzes](https://it.umn.edu/services-technologies/how-tos/canvas-understand-classic-quizzes-vs-new)) because Canvas does [not yet have an API for new Quizzes](https://community.canvaslms.com/t5/Canvas-Question-Forum/QUIZZES-NEXT-API/m-p/140850/highlight/true#M56387).

### General web specific styles

The following style(s) direct ````word2canvas```` to perform general web specific actions. e.g. embed into a Canvas item some specific HTML.

| ```word2canvas``` style | Purpose |
| ------------------ | ------- |
| ```embed``` | Identifies text that will be inserted into a Canvas page as HTML. e.g. use it to embed a YouTube video | 

### Blackboard migration specific styles

The following style(s) directly ````word2canvas```` to perform actions designed to help migrate content from the Blackboard Learning Management System to Canvas.

| ```word2canvas``` style | Purpose |
| ------------------ | ------- |
| `Blackboard image p` | Define HTML that includes an `<img` tag for an image residing in the content collection of a Blackboard course site. Assuming the image has been migrated to the Canvas course's files area, will create an `<img` tag in a Canvas page with a URL to the image in Canvas   |
| `Hide` | Define text that should not be imported into the Canvas module. Typically used to provide Blackboard specific references to aid migration |

### Miscellaneous styles

Styles which don't quite fit into their own category (yet).

| ```word2canvas``` style | Purpose |
| ------------------ | ------- |
| ```placeholder``` | Translates into the HTML [<mark> tag](https://www.w3schools.com/tags/tag_mark.asp). Used in QA as a placeholder that needs replacing |

### Content Interface specific styles

The [Content Interface](https://djplaner.github.io/Content-Interface-Tweak/) was used to create content for Blackboard. It included numerous specific styles representing different types of content. ````word2canvas```` can emulate (but not exactly) the Content Interface styles to aid in the migration of content from Blackboard to Canvas.  Typically not for use beyond migrating Content Interface content (yet).

| ```word2canvas``` style | Purpose |
| ------------------ | ------- |
| ```Poem``` | Format a block of text as a poem |
| ```Weekly Workout``` | Describe details of a "weekly workout" activity  |
| ```Activity``` | Describe activity for student to complete |
| ```Canary Exercise``` | Type of activity called canary exercise |
| ```Picture``` | Format an image with grey background with rounded corners |
| ```PicturRight``` | Picture format but it floats right (text wraps to the left) |
| ```Coming Soon``` | Call out labelled coming soon |
| ```Example``` | Used to visually distinguish example text |
| ```Note``` | A call our or note text |
| ```Reading``` | Specify readings |



