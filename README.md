# website
The [skhokhlov.ru](https://skhokhlov.ru) website.

Low-level CMS with the templating and good search engine optimization using [BEM methodology](https://en.bem.info/method/).

* Templating: [Yate](https://github.com/pasaran/yate)
* CSS pre-processor: [Stylus](https://github.com/stylus/stylus)
* Building: [Gulp](https://github.com/gulpjs/gulp)

## Build and run the app
1. Build assets
    ```
    gulp
    ```
2. Run app
    ```
    npm start
    ```

After you can check running the app by hitting the following URL: [http://localhost:3000/](http://localhost:3000/)
# Tests [![Build Status](https://travis-ci.org/skhokhlov/website.svg?branch=dev)](https://travis-ci.org/skhokhlov/website)

Testing using [mocha](https://github.com/mochajs/mocha)

Tests should validate the correctness of status codes and returns compiled pages on the server.

For testing:
```
npm test
```
