# Canvas (and Blackboard) Images

"Canvas Images" are ```word2canvas'``` method for handling images from a Blackboard course that are hosted in the Blackboard content collection. It uses a two-step process:

1. Conversion to ```span.blackboadImage```

    The CAR process generates a Word document where such Blackboard images into a ```span.blackboardImage``` with the content collection URL converted into a filename.

2. Conversion to Canvas: ```span.canvasImage``` and link to Canvas' file area

    By step 2, ```word2canvas``` will convert the ```span.blackboardImage``` into a ```span.canvasImage```. At this stage, the image will likely be broken as it is using a bare filename. By step 4, ```word2canvas``` will find a matching filename in the course files area, generate a URL for the image, and update the ```span.canvasImage``` to use that URL

## Possible problems

1. The image filename does not match any file in the Canvas course' file area

    Suggesting that the filename has not been uploaded into the file area.

2. The image filename matches more than one file in the Canvas course' file area.

    ```word2canvas``` searches for just the filename. The file area may have more than one file matching that name spread across different folders.
