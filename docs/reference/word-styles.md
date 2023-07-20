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

[^*]: These are standard Word styles which you will find in most Word documents.

| Category | Purpose |
|----------|---------|
| [Canvas specific](#canvas-specific-styles) | Create/access Canvas resource |
| [General web](#general-web-styles) | Create/access general web content |
| [Blackboard migration](#blackboard-migration-styles) | Aid in the migration of Blackboard specific content to Canvas |
| [Content Interface](#content-interface-styles) | Migrate and emulate [Content Interface](https://djplaner.github.io/Content-Interface-Tweak/) functionality |
| [Miscellaneous](#miscellaneous-styles) | Uncategorised purposes |

### Canvas specific styles

The following Word styles direct ````word2canvas```` to perform Canvas specific actions. Actions that can be split into the following broad categories

1. Specify the name of the module to create;
2. Create a new module items; 
3. Add an existing item to the module; and,
3. Modify content within a Canvas page.

### Specify the name of the module

```word2canvas``` will look for the Word style _Title_ at the top of the Word document. It will used the text in the _Title_ style as the name of the new Canvas module. 

| ```word2canvas``` style | Purpose |
| ------------------ | ------- |
| `Title` [^*] | The title of the new [Canvas module](https://community.canvaslms.com/t5/Canvas-Basics-Guide/What-are-Modules/ta-p/6) |

#### Create a new module item

```word2canvas``` creates a Canvas module from a Word document. Canvas modules [contain items](https://community.canvaslms.com/t5/Instructor-Guide/How-do-I-add-course-content-as-module-items/ta-p/1157). In your Word document, specify new items to create by using one of these styles. All based on the standard Word _Heading 1_ style.


| ```word2canvas``` style | Purpose |
| ------------------ | ------- |
| `Heading 1` [^*] | Name of a new [Canvas page](https://community.canvaslms.com/t5/Canvas-Basics-Guide/What-are-Pages/ta-p/5) |
| `Canvas SubHeader` | Name for a new [Canvas text (sub) header](https://community.canvaslms.com/t5/Instructor-Guide/How-do-I-add-a-text-header-as-a-module-item/ta-p/1208) |
| `Canvas External Url` | Add an [external link as a module item](https://community.canvaslms.com/t5/Instructor-Guide/How-do-I-add-an-external-URL-as-a-module-item/ta-p/967) |

#### Add an existing item to the module

Your module can also contain items (e.g. pages, discussions, assignments) that already exist in the Canvas course. Use one of the following styles to add one of these existing item to the module.

| ```word2canvas``` style | Purpose |
| ------------------ | ------- |
| `Existing Canvas Page` | Name of a Canvas page already available in the course |
| `Canvas Discussion` | Name of an **existing** [Canvas discussion](https://community.canvaslms.com/t5/Canvas-Basics-Guide/What-are-Discussions/ta-p/3) |
| `Canvas File` | The name of a file already in the Canvas course's [Files](https://community.canvaslms.com/t5/Canvas-Basics-Guide/What-are-Files/ta-p/7) |
| `Canvas Assignment` | The name (or part of the name) of an assignment already in the Canvas course's [Assignments](https://community.canvaslms.com/t5/Canvas-Basics-Guide/What-are-Assignments/ta-p/9) | 
| `Canvas Quiz` | The name (or part of the name) of a quiz already in the Canvas course's [Quizzes](https://community.canvaslms.com/t5/Canvas-Basics-Guide/What-are-Quizzes/ta-p/68)  |
| `Canvas External Tool` | Add an [external tool as a module item](https://community.canvaslms.com/t5/Instructor-Guide/How-do-I-add-an-external-tool-as-a-module-item/ta-p/1146) |

!!! Note "Canvas Quiz Limitations"

    :warning: **Canvas Quiz** only works for _Classic Quizzes_, **not** _New Quizzes_ (classic vs. new quizzes](https://it.umn.edu/services-technologies/how-tos/canvas-understand-classic-quizzes-vs-new)) because Canvas does [not yet have an API for new Quizzes](https://community.canvaslms.com/t5/Canvas-Question-Forum/QUIZZES-NEXT-API/m-p/140850/highlight/true#M56387).

#### Modify content within a Canvas page

A [Canvas page](https://community.canvaslms.com/t5/Canvas-Basics-Guide/What-are-Pages/ta-p/5) contains a collection of HTML. When using the _Heading 1_ or _Existing Canvas Page_ styles ```word2canvas``` will convert the content following the heading into HTML content in the page. The following styles direct ```word2canvas``` to modify the content from the Word document before placing it in the page.

| ```word2canvas``` style | Purpose |
| ------------------ | ------- |
| `Canvas File Link` | Text with this style is assumed to be the name of a file in the Canvas files areaa. ```word2canvas``` will replace the name of the file with a link to the file. |
| `Canvas Image` | Define some HTML that contains an `<img` tag where the `img.src` is the name of a file already in the Canvas course's [Files area](https://community.canvaslms.com/t5/Canvas-Basics-Guide/What-are-Files/ta-p/7). Will attempt to identify a URL for the file and insert it into the `img.src` |
| `Canvas Menu Link` | Specifies the name of an item in the [course navigation menu](https://community.canvaslms.com/t5/Instructor-Guide/How-do-I-use-the-Course-Navigation-Menu-as-an-instructor/ta-p/941). ```word2canvas``` will make the name a link matching the navigation menu link. |

### Indentation styles

Canvas provides the ability to [indent items](https://teacherscollege.screenstepslive.com/a/790009-indent-a-module-item-in-canvas). Canvas provides a maxiumu of 5 levels of indentation. Often useful for structuring a long list of items into a hierarchy.

In ```word2canvas```, module items are specified with one of the [create new](#create-a-new-module-item) or [add existing](#add-an-existing-item-to-the-module) styles above. Each of these styles have related indentation styles that can be used to indent the item.

An indentation style has the same name as the original style but with the additional of ``` - indent X``` to the end of the name. Where ```X``` is a number from 1 through 5 (inclusive) that specifies the level of indentation. For example,

- ```Heading 1 - indent 3``` will create a new Canvas page and add it to the module and indent it 3 levels.
- ```Canvas SubHeader - indent 5``` will add a new Canvas subheader to the module and indent it 5 levels.

The following image is an example of Word document using indentation styles.

![](images/wordIndentStyles.png)  

And here is the resulting Canvas module that is created using that Word document.

![](images/moduleIndentStyles.png)  

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



