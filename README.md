blobload
========

HTML5 file uploader using node.js.

## Before you upload your blob

### Dependecies
Run `npm install` to install dependencies as defined in package.json.

### Directories
Create a temporary (default: temp/) and completed (default: uploads/) folder and set the folders in blobload.js file. The default folders are temp/ and uploads/ in the same directory as blobload.js.

## Checksum
Although there are proper javascript implementations of MD5 and other hashing algorithms, I think they are overkill for this use-case. You have to calculate the checksum server-side anyway, because you can't trust the client. I propose reading out the middle half-megabyte of the files as text (UTF-8) and concatenating it with the total file size in bytes. This will be easier to calculate on the client and will serve the purpose just fine.

