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

| name              | Description                                                                  | default      |
| ----------------- | ---------------------------------------------------------------------------- | ------------ |
| name: string      | What you want to use as a key in the browser's local localstorage            | localStorage |
| secretKey: string | The personal secret key for encrypting your data.<br />required.             | null         |
| expire: number    | How long you want the data saved before it is deleted. The unit is in hours. | 12           |

```javascript
import localstorageEncrypt from "localstorage-encrypt"
const ls = localstorageEncrypt.init("storage", "my-secret-key", 12)
```

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

It takes a single parameter: the key you used to store the data. The key is of type string.

```javascript
ls.remove("authToken")
// removes authToken from saved data. only userData is left.
// has no return value
```

## Delete all saved data

To delete every data that has been saved so far. This could be useful in a case where you want to completely reset your project state. For example, after a user has finished shopping and checked out but still remains logged in.

```javascript
ls.clear()
// clears every data from the storage. only an empty object {} remains.
// Has no return value
```

## Deactivate

Unlike the `clear` method that resets the saved data into an empty object, the `deactivate` method completely removes the saved data from the local storage and also removes the event listener that was implemented to check for the expiry of the saved data.

This could be very useful in the implementation of a logout feature for your project.

```javascript
ls.deactivate()
// Completely removes the encrypted string from the local storage
// Has no return value
```
