# How to convert HTML to a Canvas module

The task here is design how HTML would be converted into a Canvas module. The requirement is that there be two modes:

1. Test conversion - which is able to describe what the resulting module would look like, without creating it.
2. Creation - actually creating the converted module.

## Basic Premise

Initial conversion

- a module consists of multiple items
- h1 elements break HTML into matching items
- the class associated with the h1 element suggests the type of item in Canvas
- the content of the h1 element becomes the title of the item 
- all the HTML until the next h1 becomes the content for the item


Questions

- If and how to do anything about indented items


## Rough design

Module object
- some config info
- title
- items

Items object
- title
- content
- type

- select all h1s to identify items
- use [nextUntil](https://vanillajstoolkit.com/helpers/nextuntil/) to identify the content


## Process


1. Break HTML into items and identify - this is the structure the view will represent
    - Use the module/module item structure from canvas-collections??
2. Use that structure

## Canvas API

Looks like the API requires you create the item first and then provide the id when you add an item to a module

### [Modules](https://canvas.instructure.com/doc/api/modules.html)

- List modules 
- Create a module
- Create a module item
- Update a module

- defines the module object - object with defined fields

### Examples

- [E-learning](https://github.com/gqmaguirejr/E-learning) long list of ruby code including apparently create module -- Not useful
- [moduley.py](https://github.com/ucfopen/canvasapi/blob/develop/canvasapi/module.py) Python code for module class, including create_module_item





## Data structures

module_item[type] = File, Page, Discussion, Assignment, Quiz, SubHeader, ExternalUrl, ExternalTool

