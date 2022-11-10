# HTML Conversion Problems and Remedies

Various issues can arise when converting Word documents to HTML. The first step in the ```word2canvas``` process. The following explains known issues and suggests possible remiedies.

## base64 Images

### Problem: Canvas doesn't support base64 encoded images in HTML

When convering a Word document to HTML any images are currently converted to [base64 encoded images](https://www.w3docs.com/snippets/html/how-to-display-base64-images-in-html.html#:~:text=Images%20encoded%20with%20Base64%20can,from%20making%20additional%20HTTP%20requests.)

The problem is that the Canvas Rich Content Editor will remove base64 encoded strings. Breaking the images.

```word2canvas``` will identify any base64 encoded images after conversion to HTML and insert placeholder images in the newly created module.

### Solution

The solution is to manually save the base64 images to your computer and use the Canvas RCE to replace the ```word2canvas``` placeholder images with the saved images.

Two steps:

1. Save the images to your computer.

   One _Check HTML_ tab of ```word2canvas``` you can view the base 64 encoded images. Right click on the image and select **Save Image As** to download a copy of the image. 

2. Replace the placeholder images.

    Once ```word2canvas``` has created the module, edit the pages with placeholder images and replace them with the appropriate saved image.

