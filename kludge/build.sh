#!/usr/bin/env bash
cd release
grep -v '^\/\/ ' word2canvas.user.js > word2canvas.js
terser word2canvas.js --compress --output word2canvas.min.js

