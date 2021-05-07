import React, { Component } from "react";
import axios from "axios";
import ReactTable from "react-table-6";
import Search from "./search";
import { Link } from "react-router-dom";
import "react-table-6/react-table.css";
import "../table.css";
import "bootstrap/dist/css/bootstrap.css";
import logo from "./SEEDSlogo.png";
let posts = [];
let filteredPosts = [];

const filterPosts = (articles, query) => {
  if (!query) {
    return articles;
  }

  return articles.filter((articles) => {
    const articleName = articles.title.toLowerCase();
    return articleName.includes(query);
  });
};

const filterStrengthPosts = (articles, index) => {
  if (index === "Evidence Strength") {
    return articles;
  }

  return articles.filter((articles) => {
    const articleStrength = articles.evidenceStrength;
    return articleStrength.includes(index);
  });
};

const filterYearPosts = (articles, index) => {
  var year = new Date().getFullYear();
  if (index === "Year") {
    return articles;
  } else if (index === "Last 5 Years") {
    return articles.filter((articles) => {
      const articleYear = articles.year;
      if (articleYear < year && articleYear >= year - 5) {
        return articleYear;
      }
      return articleYear.includes(index);
    });
  } else if (index === "Last 10 Years") {
    return articles.filter((articles) => {
      const articleYear = articles.year;
      if (articleYear < year && articleYear >= year - 10) {
        return articleYear;
      }
      return articleYear.includes(index);
    });
  } else if (index === "Last 15 Years") {
    return articles.filter((articles) => {
      const articleYear = articles.year;
      if (articleYear < year && articleYear >= year - 15) {
        return articleYear;
      }
      return articleYear.includes(index);
    });
  }
};

class SearchTable extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      strengthLevel: "Evidence Strength",
      yearLevel: "Year",
      titleSelected: true,
      authorSelected: true,
      yearSelected: true,
      sePracticeSelected: true,
      abbSelected: true,
      claimSelected: true,
      evidenceStrength: true,
    };
    this.optionSelect = this.optionSelect.bind(this);
    this.yearSelect = this.yearSelect.bind(this);
  }
  handleInputChange(value) {
    this.setState({ titleSelected: !this.state.titleSelected });
  }
  handleAuthorChange(value) {
    this.setState({ authorSelected: !this.state.authorSelected });
  }
  handleYearChange(value) {
    this.setState({ yearSelected: !this.state.yearSelected });
  }
  handlePracticeChange(value) {
    this.setState({ sePracticeSelected: !this.state.sePracticeSelected });
  }
  handleAbbChange(value) {
    this.setState({ abbSelected: !this.state.abbSelected });
  }
  handleClaimChange(value) {
    this.setState({ claimSelected: !this.state.claimSelected });
  }
  handleEvidenceChange(value) {
    this.setState({ evidenceStrength: !this.state.evidenceStrength });
  }
  async getArticles() {
    const res = await axios.get("http://localhost:3001/api/api");
    console.log(res.data);
    posts = res.data;
    this.setState({ loading: false, articles: res.data });
  }
  componentDidMount = () => {
    this.getArticles();
  };
  optionSelect(event) {
    var index = event.target.options[event.target.selectedIndex].text;
    this.setState({
      strengthLevel: index,
    });
  }
  yearSelect(event) {
    var index = event.target.options[event.target.selectedIndex].text;
    this.setState({
      yearLevel: index,
    });
  }
  render() {
    const {
      titleSelected,
      authorSelected,
      yearSelected,
      sePracticeSelected,
      abbSelected,
      claimSelected,
      evidenceStrength,
    } = this.state;
    const columns = [
      {
        Header: "Title",
        accessor: "title",
        show: titleSelected,
      },
      {
        Header: "Author(s)",
        accessor: "author",
        show: authorSelected,
      },

      {
        Header: "Year",
        accessor: "year",
        show: yearSelected,
      },
      {
        Header: "SE Practice",
        accessor: "sePracticeFull",
        show: sePracticeSelected,
      },
      {
        Header: "Abbreviation",
        accessor: "sePracticeShort",
        show: abbSelected,
      },
      {
        Header: "Claim",
        accessor: "claim",
        show: claimSelected,
      },
      {
        Header: "Evidence Strength",
        accessor: "evidenceStrength",
        show: evidenceStrength,
      },
    ];

    const { search } = window.location;
    const query = new URLSearchParams(search).get("search");
    filteredPosts = filterPosts(posts, query);
    filteredPosts = filterStrengthPosts(
      filteredPosts,
      this.state.strengthLevel
    );
    filteredPosts = filterYearPosts(filteredPosts, this.state.yearLevel);

    return (
      <div>
        <div>
          <div>
            <div style={{ float: "right" }}>
              <Link to={"/register"}>
                <input
                  type="submit"
                  className="btn btn-danger btn-block"
                  value="Register"
                ></input>
              </Link>
            </div>
            <img src={logo} alt={"logo"} width="250" height="230"></img>
          </div>
          <br></br>
          <Search />
          <select name="Year" id="Year" onChange={this.yearSelect}>
            <option value>Year</option>
            <option value>Last 5 Years</option>
            <option value>Last 10 Years</option>
            <option value>Last 15 Years</option>
          </select>
          <select name="Evidence" id="Evidence" onChange={this.optionSelect}>
            <option value>Evidence Strength</option>
            <option value>Strongly Support</option>
            <option value>Strongly Agree</option>
            <option value>Strongly Against</option>
          </select>
          <br></br>
        </div>
        <br></br>
        <div>
          <div>
            <div class="form-check form-check-inline">
              <label class="form-check-label" for="inlineRadio1">
                Title
              </label>
              <input
                class="form-check-input"
                name="inlineRadioOptions"
                id="inlineRadio1"
                value="option1"
                type="checkbox"
                checked={this.state.titleSelected}
                onChange={this.handleInputChange.bind(this)}
              />
            </div>
            <div class="form-check form-check-inline">
              <label class="form-check-label" for="inlineRadio1">
                Author
              </label>
              <input
                class="form-check-input"
                name="inlineRadioOptions"
                id="inlineRadio2"
                value="option2"
                type="checkbox"
                checked={this.state.authorSelected}
                onChange={this.handleAuthorChange.bind(this)}
              />
            </div>
            <div class="form-check form-check-inline">
              <label>Year</label>
              <input
                class="form-check-input"
                name="inlineRadioOptions"
                id="inlineRadio3"
                value="option3"
                type="checkbox"
                checked={this.state.yearSelected}
                onChange={this.handleYearChange.bind(this)}
              />
            </div>
            <div class="form-check form-check-inline">
              <label>SE Practice</label>
              <input
                class="form-check-input"
                name="inlineRadioOptions"
                id="inlineRadio4"
                value="option4"
                type="checkbox"
                checked={this.state.sePracticeSelected}
                onChange={this.handlePracticeChange.bind(this)}
              />
            </div>
            <div class="form-check form-check-inline" for="inlineRadio5">
              <label>Abbreviation</label>
              <input
                class="form-check-input"
                name="inlineRadioOptions"
                id="inlineRadio5"
                value="option5"
                type="checkbox"
                checked={this.state.abbSelected}
                onChange={this.handleAbbChange.bind(this)}
              />
            </div>
            <div class="form-check form-check-inline" for="inlineRadio6">
              <label>Claim</label>
              <input
                class="form-check-input"
                name="inlineRadioOptions"
                id="inlineRadio6"
                value="option6"
                type="checkbox"
                checked={this.state.claimSelected}
                onChange={this.handleClaimChange.bind(this)}
              />
            </div>
            <div class="form-check form-check-inline">
              <label>Evidence Strength</label>
              <input
                class="form-check-input"
                name="inlineRadioOptions"
                id="inlineRadio7"
                value="option7"
                type="checkbox"
                checked={this.state.evidenceStrength}
                onChange={this.handleEvidenceChange.bind(this)}
              />
            </div>
          </div>

          <h3>{"Table of Articles"}</h3>
          <p>
            {
              "Click column header to sort & drag column header to widen columns"
            }
          </p>
        </div>
        <ReactTable data={filteredPosts} columns={columns} />
      </div>
    );
  }
}

export default SearchTable;
