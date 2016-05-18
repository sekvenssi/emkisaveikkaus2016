# emkisaveikkaus2016
Static website to present "know the score" results of UEFA Euro 2016

## Objectives
1. Users will be able to track their own progress in the competition
2. Users will be able to track overall score of the competition
3. Users can just fill google spreadsheet form to participate contest
4. Contributors can easily update match result via google spreadsheets

## Framework
- Github for hosting static resources
  - css
  - js
  - html --> [index.html] (https://sekvenssi.github.io/emkisaveikkaus2016/)
- libraries from external cdn OR using distributed build for E.G. webpack
  - [bootstrap 4] (https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/css/bootstrap.min.css)
  - react
    - [react] (https://fb.me/react-15.0.2.js)
    - [react-dom] (https://fb.me/react-dom-15.0.2.js)
  - [chart js] (https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.1.2/Chart.min.js)
- Google spreadsheet as a database (serves json)
  - [teams] (https://spreadsheets.google.com/feeds/list/12e4vUjpfsBNUH4mxZLZZW0XCwrUtyZiyiIPbn4BLUuo/od6/public/values?alt=json)
