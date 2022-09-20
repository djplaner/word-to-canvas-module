# Development

## Standing on the shoulders of giants

```word2canvas``` uses a range of open source tools, including:

- [mammoth.js](https://github.com/mwilliamson/mammoth.js/) for Word to HTML conversion
- [userscript-builder](https://github.com/va4ok/userscript-builder) for local development of the ```word2canvas``` userscript
- ...many more to add

## Local development and testing

Development of ```word2canvas``` currently uses

1. Chrome, with TamperMonkey installed and configured [to allow local file acess](https://www.tampermonkey.net/faq.php#Q204).
2. The [dev userscript](https://github.com/djplaner/word-to-canvas-module/blob/main/dist/devWord2Canvas.user.js) version of the userscript.
3. [userscript-builder](https://github.com/va4ok/userscript-builder) configured to generate the dev userscript.
