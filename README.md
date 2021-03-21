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

| name           | Description                                                                                                                             | default      |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| name: string   | What you want to use as a key in the browser's local localstorage                                                                       | localStorage |
| expire: number | How long you want the data saved before it is deleted. The unit is in hours.<br />**Note**: The functionality is still being worked on. | 12           |
| window: object | The browser's window object                                                                                                             | null         |

```javascript
import localstorageEncrypt from "localstorage-encrypt"
const ls = localstorageEncrypt.init("storage", 12, window)
```

**Note**: when using the library in a React project, it is advisable to initialize it in a `useEffect` hook and in a Vue project, do it in the `created` lifecycle method. This way, the `window` object is not undefined.

## Saving data

To save your data in the localStorage object you created when initializing the library.

It takes 2 parameters: the key and the value. The key has to be of string type and the data you're storing can be any data type.

```javascript
const userData = { name: "Dotun", occupation: "developer" }
const authToken = eyghghfyheuehuhuoheouihih

ls.save("user", userData)
ls.save("token", authToken)
// has no return value
```

## Get saved data

To get the saved data.

It takes a single parameter: the key you used to store the data. The key has to be of string type.

If you pass in a key that doesn't exist, it returns undefined.

```javascript
ls.get("user")
// returns { name: "Dotun", occupation: "developer" }
```

## Get all saved data

To get all data that has been saved.

It takes no parameters and returns an object containing everything you have saved so far in key-value pairs.

```javascript
ls.getAll()
// returns { userData: { name: "Dotun", occupation: "developer" }, authToken: eyghghfyheuehuhuoheouihih }
```

## Delete saved data

To delete a particular saved data.

It takes a single parameter: the key you used to store the data. The key has to be of string type.

```javascript
ls.remove("authToken")
// removes authToken from saved data. only userData is left.
// has no return value
```

## Delete all saved data

To delete every data that has been saved so far. This could be useful in a case where a user clicks logout and you want to remove all it's data.

```javascript
ls.clear()
// clears every data from the storage. only an empty object {} remains.
// Has no return value
```
