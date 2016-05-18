require('normalize.css/normalize.css');
require('styles/App.css');
require('styles/bootstrap.min.css')

import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';

// Render the main component into the dom
ReactDOM.render(<div>{Router}</div>, document.getElementById('app'));
