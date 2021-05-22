/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/sort-comp */
/* eslint-disable no-use-before-define */
/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import Rlogo from './register.png';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      userName: '',
      password: '',
    };
    this.changename = this.changename.bind(this);
    this.changeUserName = this.changeUserName.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // react function to change the value of name, username and password field
  changename(event) {
    this.setState({
      name: event.target.value,
    });
  }

  changeUserName(event) {
    this.setState({
      userName: event.target.value,
    });
  }

  changePassword(event) {
    this.setState({
      password: event.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();

    const registered = {
      name: this.state.name,
      userName: this.state.userName,
      password: this.state.password,
    };
    axios
      .post('/server/register', registered)
      .then((response) => console.log(response.data));

    this.setState({
      name: '',
      userName: '',
      password: '',
    });
  }

  render() {
    return (
      <div>
        <div className="container">
          <br />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <h3>Register!</h3>
          </div>
          <br />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img src={Rlogo} alt="logo" width="230" height="250" />
          </div>
          <br />
          <div className="form-div">
            <form onSubmit={this.onSubmit}>
              <input
                type="text"
                placeholder="Name"
                onChange={this.changename}
                value={this.state.name}
                className="form-control form-group"
              />
              <input
                type="text"
                placeholder="User Name"
                onChange={this.changeUserName}
                value={this.state.userName}
                className="form-control form-group"
              />
              <input
                type="password"
                placeholder="Password"
                onChange={this.changePassword}
                value={this.state.password}
                className="form-control form-group"
              />

              <input
                type="submit"
                className="btn btn-danger btn-block"
                value="submit"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Register;
