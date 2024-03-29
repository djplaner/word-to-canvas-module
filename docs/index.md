# Word to Canvas (```word2canvas```) Module

## What is ```word2canvas```?

A [userscript](https://en.wikipedia.org/wiki/User_script) that will create a new [Canvas LMS](https://www.instructure.com/en-au/canvas) module from a Word document (using some specific Word styles) - see [sample w2c.docx](https://github.com/djplaner/word-to-canvas-module/raw/main/sample%20w2c.docx) for an annotated example.

!!! Note "Your content stays in your environment"

    :exclamation: The contents of your Word documents always remain on your computer, your web browser, and eventually as a Module in the Canvas instance you are working with.

## Why use ```word2canvas```?

Manually creating a complex module using the Canvas web interface can be a touch tedious. Each item must be edited on its individual page. Multiple clicks... Especially if you already have the module content in a Word document and/or you are creating many modules. (e.g. migrating from one LMS to another)

[The limitations and issues page](./limitations/limitations.md) summarises the current status of ```word2canvas```.

## What does it look like?

The following animated image demonstrates the process of creating a new module from a Word document. It starts by showing a Blackboard course page. The subsequent Word document was generated from the Blackboard course page.

The Word document is then opened and edited using some established styles. Once the document is saved, word2canvas is opened on a Canvas modules page and used to create a module from the Word document.


![](./images/autoMigrate.gif)