## Packages
`npm install mongoose`
`npm install express`
`npm install express-async-errors`
`npm install dotenv`
`npm install http-status-codes`
`npm install jsonwebtoken`
`npm install bcryptjs`
`npm install helmet`
`npm install cors`
`npm install xss-clean` // Warn! Not supported!
`npm install express-rate-limit`
`npm install validator`
`npm install cookie-parser`
`npm install nodemon -D`

## Engines
Add `"engines": { "node": "20.14.0" }` to package.json to specify the node version when deploying the app!

## .env
MONGO_URI
JWT_SECRET
JWT_LIFETIME

## Run the app
1. Without nodemon: `npm start`
2. With nodemon: `npm run dev`

## Client
- The `client` folder is the complete front end React app built with CRA, this is exactly the same as the Jobster app built in the React course, the only difference is that the `baseURL` in utils/axios.js is our current server!
- The `build` folder contains the optimized and production-ready app built with `npm run build`! This is what we will use for the front end!!! If we push all the codes to GitHub and use GitHub to deploy, remember to also push this build folder because normally gitignore will ignore this build folder!

## Test User
Make sure to create a test user in the MongoDB in advance: 
```js
{
  name: "test user",
  email: "testUser@test.com",
  password: "secret"
}
```
Note that email and password must be exactly the same as above (in order to match client/src/pages/Register.js), so that when we click the Demo App button, we login as test user!

## Populate
- Generate fake data: [Mockaroo](https://www.mockaroo.com/)
- For field that has enum, choose Custom List as type! For createdBy, choose Custom List as type with only one value: the ObjectID of test user! For createdAt (don't forget), choose Datetime as type and ISO 8601 as format!
![configuration](image.png)
- Run `node db/populate.js` to populate the mongoDB database with MOCK_DATA.json!