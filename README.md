# localstorage-encrypt

Make your web application more secure by encrypting your client-side data before storing it in the local storage.

## Installation

Using npm:

```bash
npm i localstorage-encrypt
```

Using yarn:

```bash
yarn add localstorage-encrypt
```

## Getting started

The library is initialized with 3 parameters:

| name           | description                                                                                                                             | default      |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| name: string   | What you want to use as a key in the browser's local localstorage                                                                       | localStorage |
| expire: number | How long you want the data saved before it is deleted. The unit is in hours.<br />**Note**: The functionality is still being worked on. | 12           |

| window: object | the windows object | nul

```javascript
import localstorageEncrypt from "localstorage-encrypt"
const ls = localstorageEncrypt.init("storage", 12, window)
```

**Note**: when using the library in a React project, it is advisable to initialize it in a `useEffect` hook so the windows object doesn't return undefined.

## Saving data

To save your data in the localStorage object you created when initializing the library.

It takes 2 parameters: the key and the value. The key has to be of string type and the data you're storing can be any data type.

```javascript
const userData = { name: "Dotun", occupation: "developer" }

ls.save("user", userData)
// has no return value
```

## Getting saved data

To get the saved data.

It takes a single parameter: the key you used to store the data. The key has to be of string type.

If you pass in a key that doesn't exist, it returns undefined.

```javascript
ls.get("user")
// returns { name: "Dotun", occupation: "developer" }
```
