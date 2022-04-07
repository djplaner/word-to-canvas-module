# Problems with Canvas External URLs 

```word2canvas``` supports the creation of an [external URL as a module item](https://community.canvaslms.com/t5/Instructor-Guide/How-do-I-add-an-external-URL-as-a-module-item/ta-p/967) via the _Canvas External Url_ Word style (based on the _Heading 1_ Word style). The _Canvas External URL_ style defines the title of the item. The content of the section following the _Canvas External URL_ style is the URL it should link to. For example

![Excerpt from Word document of correct Canvas External URL usage](images/workingCanvasExternalUrlDoc.png)

There are two common problems when using this style

1. No valid URL is provided; and,
2. More than a valid URL is provided.

## No valid URL is provided


## More than a valid URL is provided

If the section after the _Canvas External URL_ style contains a valid URL AND additional content. For example

![Excerpt from Word document of Canvas External URL section with more than a URL](images/canvasExternalUrlMoreThanURL.png)

```word2canvas``` will generate a "Canvas External URL heading...contained more than just a URL" error (e.g. the following image) 

![word2canvas warning about external URL with extra content](images/externalUrlWarning.png)

### Two possible solutions

There are two possible solutions to this problem

1. Remove the additional content.

    e.g. return the section to the just the URL as shown in the image at the top of this page.
2. Use a new Canvas Page and include the link with the additional content. 

    The Canvas External URL item does not support additional content. A better fit is a Canvas Page with the link embeded into the content (not as the title). Change the style for the heading from _Canvas External URL_ to _Heading 1_ and then insert the link into the content appropriate (e.g. the following)

![Modified section to use Canvas Page and link in content](images/pageWithLink.png)
