/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Register from './components/register';
import SearchTable from './components/searchtable';

function App() {
  return (
    <Router>
      <div className="container">
        <br />
        <Route path="/" exact component={SearchTable} />
        <Route path="/register" exact component={Register} />
      </div>
    </Router>
  );
}
export default App;
