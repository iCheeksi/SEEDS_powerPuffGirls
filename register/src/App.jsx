import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./components/register";
import SearchTable from "./components/searchtable";
import SubmitForm from "./components/submit";

function App() {
  return (
    <Router>
      <div className="container">
        <br />
        <Route path="/" exact component={SearchTable} />
        <Route path="/register" exact component={Register} />
        <Route path="/submit" exact component={SubmitForm} />
      </div>
    </Router>
  );
}
export default App;
