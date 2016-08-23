# Contentjet.js

SDK for contentjet.io

# Installing

```
npm install --save contentjet
```

# IMPORTANT

This library depends on a native ES6 Promise implementation to be [supported](http://caniuse.com/promises). If your environment doesn't support ES6 Promises, you can [polyfill](https://github.com/jakearchibald/es6-promise).

# Example

```javascript
const contentjet = require('contentjet');

// Create the contentjet client
var client = contentjet.getClient({ projectUUID: '...', apiKey: '...' });

// Fetch entries filtered by entry type
let filters = { entry_type: '97ada977-20c7-472d-b48e-9ccbc712672b' };
client.entry.list(filters).then((data) => {
  // Your code
});
```

# API

## Project

##### client.project.get()

## Entry

##### client.entry.get(entryUUID)
##### client.entry.list([options])

## Entry Type

##### client.entryType.get(entryTypeUUID)
##### client.entryType.list()

## Media

##### client.media.get(mediaUUID)
##### client.media.list([options])
