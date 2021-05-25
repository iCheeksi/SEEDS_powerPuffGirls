import React, { Component } from "react";
import axios from "axios";
import ReactTable from "react-table-6";
import Search from "./search";
import AdvancedSearch from "./advanceSearch";
import { Link } from "react-router-dom";
import "react-table-6/react-table.css";
import "../table.css";
import "bootstrap/dist/css/bootstrap.css";
import logo from "./SEEDSlogo.png";
import SubmitForm from "./submit";
let posts = [];
let filteredPosts = [];

const filterPosts = (articles, search, searchField) => {
  if (!search) {
    return articles;
  }

  return articles.filter((articles) => { 
    const searchTerm = search.toLowerCase()
    switch(searchField) {
      case "Title":
        const title = articles.title.toLowerCase()
        return title.includes(searchTerm)
      case "Author":
        const author = articles.author.toLowerCase()
        return author.includes(searchTerm)
      case "Year":
        const year = articles.year
        return year.includes(searchTerm)
      case "SEPrac": 
        const SEPrac = articles.sePracticeFull.toLowerCase()
        return SEPrac.includes(searchTerm)
      case "SEAbb": 
        const SEAbb = articles.sePracticeShort.toLowerCase()
        return SEAbb.includes(searchTerm)
      case "Claim":
        const claim = articles.claim.toLowerCase()
        return claim.includes(searchTerm)
      case "EvStr":
        const evStr = articles.evidenceStrength.toLowerCase()
        return evStr.includes(searchTerm)
      default: //Check all fields
        const full = articles.title.toLowerCase() +  articles.author.toLowerCase() + articles.year 
          + articles.sePracticeFull.toLowerCase() + articles.sePracticeShort.toLowerCase() + articles.claim.toLowerCase() 
          + articles.evidenceStrength.toLowerCase()
        return full.includes(searchTerm);
    }
  });
};

class SearchTable extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      titleSelected: true,
      authorSelected: true,
      yearSelected: true,
      sePracticeSelected: true,
      abbSelected: true,
      claimSelected: true,
      evidenceStrength: true,
      advancedSearchView: false,
    };
  }
  advancedSearchViewChange() {
    this.setState({advancedSearchView: !this.state.advancedSearchView})
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
    const res = await axios.get("/api");
    console.log(res.data);
    posts = res.data;
    this.setState({ loading: false, articles: res.data });
  }
  componentDidMount = () => {
    this.getArticles();
  };
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
    const searchTerm = new URLSearchParams(search).get("search");
    const searchField = new URLSearchParams(search).get("searchField");
    filteredPosts = filterPosts(posts, searchTerm, searchField);
    const searchTerm2 = new URLSearchParams(search).get("search2");
    const searchField2 = new URLSearchParams(search).get("searchField2");
    filteredPosts = filterPosts(filteredPosts, searchTerm2, searchField2);

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
              <Link to ={"/submit"}>
              <input
                type="submit"
                className="btn btn-success btn-block"
                value="Submit an article"
                ></input>
                </Link>
            </div>
            <img src={logo} alt={"logo"} width="250" height="230"></img>
          </div>
          <br />
          {!this.state.advancedSearchView && <Search />}
          {this.state.advancedSearchView && <AdvancedSearch />}
          <button class="btn btn-default" type="submit" onClick={this.advancedSearchViewChange.bind(this)}>Advanced Search</button>
          <br />
        </div>
        <br />
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
