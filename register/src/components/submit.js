import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import Rlogo from "./form.png";

class SubmitForm extends Component {
  constructor() {
    super();
    this.state = {
      key: "",
      title: "",
      author: "",
      year: "",
      sePracticeFull: "",
      sePracticeShort: "",
      claim: "",
      evidenceStrength: "",
    };
    this.changeKey = this.changeKey.bind(this);
    this.changetitle = this.changetitle.bind(this);
    this.changeauthor = this.changeauthor.bind(this);
    this.changeYear = this.changeYear.bind(this);
    this.changesePracticeFull = this.changesePracticeFull.bind(this);
    this.changesePracticeShort = this.changesePracticeShort.bind(this);
    this.changeClaim = this.changeClaim.bind(this);
    this.changeES = this.changeES.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  //react function to change the value of name, username and password field
  changeKey(event) {
    this.setState({
      key: event.target.value,
    });
  }
  changetitle(event) {
    this.setState({
      title: event.target.value,
    });
  }
  changeauthor(event) {
    this.setState({
      author: event.target.value,
    });
  }
  changeYear(event){
      this.setState({
          year: event.target.value,
      });
  }
  changesePracticeFull(event) {
    this.setState({
      sePracticeFull: event.target.value,
    });
  }
  changesePracticeShort(event) {
      this.setState({
          sePracticeShort: event.target.value,
      });
  }
  changeClaim(event) {
      this.setState({
          claim: event.target.value,
      });
  }
  changeES(event){
      this.setState({
          evidenceStrength: event.target.value,
      });
  }

  onSubmit(event) {
    event.preventDefault();

    const submitted = {
      key:this.state.key,
      title: this.state.title,
      author: this.state.author,
      year: this.state.year,
      sePracticeFull: this.state.sePracticeFull,
      sePracticeShort: this.state.sePracticeShort,
      claim: this.state.claim,
      evidenceStrength: this.state.evidenceStrength
    };
    axios
      .post("/server/submit", submitted)
      .then((response) => console.log(response.data));

    this.setState({
      key: "",
      title: "",
      author: "",
      year: "",
      sePracticeFull: "",
      sePracticeShort: "",
      claim: "",
      evidenceStrength: ""
    });
  }
  render() {
    return (
      <div>
        <div className="container">
          <br></br>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h3>{"Submit an Article!"}</h3>
          </div>
          <br></br>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={Rlogo} alt={"logo"} width="230" height="250"></img>
          </div>
          <br></br>
          <div className="form-div">
            <form onSubmit={this.onSubmit}>
              <input
                type="text"
                placeholder="Key"
                onChange={this.changeKey}
                value={this.state.key}
                className="form-control form-group"
                />
              <input
                type="text"
                placeholder="Title"
                onChange={this.changetitle}
                value={this.state.title}
                className="form-control form-group"
              />
              <input
                type="text"
                placeholder="Author"
                onChange={this.changeauthor}
                value={this.state.author}
                className="form-control form-group"
              />
              <input
                type="text"
                placeholder="Year"
                onChange={this.changeYear}
                value={this.state.year}
                className="form-control form-group"
              />
              <input
                type="text"
                placeholder="SE Practice Full"
                onChange={this.changesePracticeFull}
                value={this.state.sePracticeFull}
                className="form-control form-group"
                />
                <input
                type="text"
                placeholder="SE Practice Short"
                onChange={this.changesePracticeShort}
                value={this.state.sePracticeShort}
                className="form-control form-group"
                />
                <input
                type="text"
                placeholder="Claim"
                onChange={this.changeClaim}
                value={this.state.claim}
                className="form-control form-group"
                />
                <input
                type="text"
                placeholder="Evidence Strength"
                onChange={this.changeES}
                value={this.state.evidenceStrength}
                className="form-control form-group"
                />

              <input
                type="submit"
                className="btn btn-success btn-block"
                value="submit"
              ></input>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default SubmitForm;
