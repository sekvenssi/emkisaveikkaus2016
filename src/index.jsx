require('normalize.css/normalize.css');
require('styles/App.css');
//require('../bower_components/startbootstrap-sb-admin-2/dist/css/sb-admin-2.css');

import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';

// Render the main component into the dom
ReactDOM.render(<div>{Router}</div>, document.getElementById('app'));
