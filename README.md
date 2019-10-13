Sudoku solver [![Build Status](https://travis-ci.org/vanphuong12a2/sudoku26.svg?branch=master)](https://travis-ci.org/vanphuong12a2/sudoku26)
---
https://sudoku26.herokuapp.com/


### Running the app locally

The `build` step makes sure frontend artifact is moved to java build folder.
```
gradle build bootRun
```
or
```
docker build -t sudoku26
docker run -p 8080:8080 sudoku26
```

To run a react embedded server for frontend development: 
```$xslt
cd frontend
yarn start
```
New game and solve game buttons will not work as they call the backend for data.

### Testing
To run all tests: 
```
gradle test
```

To watch on frontend tests: 
```
cd frontend
yarn test-watch
```

#### Cypress e2e test
```
cd e2eTest
yarn run cypress open
```
or
```
cd e2eTest
docker-compose up --exit-code-from cypress
```

### Sudoku samples
The samples was downloaded from http://magictour.free.fr/top1465
