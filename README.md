# limecode
This is the web interface of the limecode test:

## Project Setup

```sh
npm install
```
## Deploy lambda functions on AWS

by executing

```sh
npm run build:lambda
```
Two steps will happen:
  1- Serverless framework will install the two lambda functions, so you must have AWS cli properly configured in your machine. Functions will be deployed in region: eu-west-3 and with limecode-lambdas names.
  2- Once this task executes properly a second task will take the generated URL of the new lambda functions and replace the environment variable VITE_BACKEND_URL inside .env file with this new URL.

Once executed, you can deploy the webapp to test against your lambda functions created


### WEBAPP Compile, Hot-Reload for Development and deploy in localhost

```sh
npm run dev
```
Then you should see the app deployed in the url specified in console by run dev command. Click on the examples to directly execute them, or write a text and click encode/decode to see the result

![Limecode Webapp](/screenshots/webapp.png)



### CLI Execute limecode command line tool

A cli utility has been done, using an environment variable called BACKEND_URL to retrieve the created lambdas

So first you have to run 

```sh
npm run build:lambda
```

Via npm script:

```sh
npm run limecode -- -h
npm run limecode encode "HELLO"
npm run limecode decode "8 5 324 8748 295245 730 23 405 13122 12 108"
```

![Limecode CLI via npm](/screenshots/limecode_cli2.png)


Via node direct command:

```sh
node src/cli/limecode.mjs encode -h
node src/cli/limecode.mjs encode "HELLO" 
node src/cli/limecode.mjs decode "8 5 324 8748 295245 730 23 405 13122 12 108"
```

![Limecode CLI](/screenshots/limecode_cli.png)


# Assumptions

Encrypt/decrypt algorithm
* Decryption: If a char is received and is not a letter [A-Z] then a * is returned for that specific char
* Encryption: If a char is not a number or is a 0 then a * is returned for that specific char


# Lambda

Two lambda functions have been created in AWS to implement the decode and encode logic. These lambda functions accept a field 'text' and throw an error if this field is not present in the request. If the request is correct then they return a 'text' field with the encoded or decoded text.
A single API Gateway has been configured to serve both routes: encode and decode (https://808de8cob5.execute-api.eu-west-3.amazonaws.com/default/encode and https://808de8cob5.execute-api.eu-west-3.amazonaws.com/default/decode).  


Only the POST method for this routes has been enabled to be consumed outside of their context (CORS), so the other REST methods (PUT, GET etc...) will result in an HTTP 400 code in the preflight call if they are invoked, this other methods will not reach the lambda functions.  

* The source code of the lambda functions can be found in src/AWS/decodeLambda.js and src/AWS/encodeLambda.js

# Error handling

Most of the errors related to wrong incoming characters are being handled by returning a '*' char for those positions. I took this decision because I think is the less annoying behaviour for the user, being able to receive the correct chars of a specific string and not failing all the process if a character is wrong in the incoming string.  

If a field 'text' is not present in the POST to the endpoints, then a statusCode 400 and an error description is retrieved in the response.

![visual error handling](/screenshots/errorHandling.png)

The response is HTTP 200 but inside the statusCode is 400 and body contains the error description. This is the behaviour I found in the example code template for AWS lambda function (Configure blueprint microservice-http-endpoint template)

![AWS example lambda error handling](/screenshots/errorHandling2.png)


The other REST methods (GET PUT etc...) are protected under the CORS directive.
The web app encode and decode buttons are disabled until a text is introduced in the proper inputs avoiding empty calls.


### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)
A set of test have been made in vitest to cover encode and decode functions
```sh
npm install
npm run build
npm run test:unit
```


### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

A set of test have been made in cypress to cover the test cases defined in the instructions, see cypress/e2e/limecode.cy.js with the tests definitions:

To execute the tests in visual mode
```sh
npm install
npm run build
npm run test:e2e
```
An instance of cypress will be opened and the user can select 'Start E2E testing in Chrome' and click in the limecode spec file
Then the set of tests will be executed against the real lambda cloud functions

![e2e visual execution](/screenshots/e2etests.png)

To execute the tests in command-line (ci) mode
```sh
npm install
npm run build
npm run test:e2e:ci
```

Then the set of tests will be executed and a result will be sent to the command line

![e2e ci execution](/screenshots/e2etests_ci.png)


## TODO


## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).



### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```


### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
