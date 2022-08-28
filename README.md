# limecode
This is the web interface of the limecode test:

# Assumptions

Encrypt/decrypt algorithm
* Decryption: If a char is received and is not a letter [A-Z] then a * is returned for that specific char
* Encryption: If a char is not a number or is a 0 then a * is returned for that specific char


# Lambda

Two lambda functions have been created in AWS to implement the decode and encode logic. This lambda functions accept a field 'text' and throw an error if this field is not present in the request. If the request is correct then they return a 'text' field with the encoded or decoded text.
A single API Gateway has been configured to serve both routes: encode an decode (https://808de8cob5.execute-api.eu-west-3.amazonaws.com/default/encode and https://808de8cob5.execute-api.eu-west-3.amazonaws.com/default/decode).
Only the POST method for this routes has been enabled to be consumed ouside of their context (CORS), so the other REST methods (PUT, GET etc...) will result in an HTTP 400 code in the preflight call if they are invoked, this other methods will not reach the lambda functions.
The source code of the lambda functions can be found in src/AWS/decodeLambda.js and src/AWS/encodeLambda.js

# Error handling

The majority of errors related to wrong incoming characters are being handled by returning a '*' char for those positions. I took this decision because I think is the less annoying behaviour for the user, being able to receive the correct chars of a specific string and not failing all the process if a character is wrong in the incoming string.
If a field 'text' is not present in the PUT call to the endpoints, then a statusCode 400 and an error description is retrieved in the response.

![visual error handling](https://github.com/arturogalan/limecode/blob/master/screenshots/errorHandling.png)

The response is HTTP 200 but inside the statusCode is 400 and body contains the error description. This is the behaviour I found in the example code template for AWS lambda function (Configure blueprint microservice-http-endpoint template)

![AWS example lambda error handling](https://github.com/arturogalan/limecode/blob/master/screenshots/errorHandling2.png)


The other REST methods (GET PUT etc...) are protected under the CORS directive.
The web app encode and decode buttons ara disabled until a text is introduced in the proper inputs avoiding empty calls.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
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
Then the set of tests will be executed agains the real lambda cloud functions

![e2e visual execution](https://github.com/arturogalan/limecode/blob/master/screenshots/e2etests.png)

To execute the tests in command-line (ci) mode
```sh
npm install
npm run build
npm run test:e2e:ci
```

Then the set of tests will be executed and a result will be sent to the command line

![e2e ci execution](https://github.com/arturogalan/limecode/blob/master/screenshots/e2etests_ci.png)


## TODO
Add a cli function




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
