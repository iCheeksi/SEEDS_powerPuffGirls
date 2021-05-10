import "bootstrap/dist/css/bootstrap.css";
const SearchBar = () => (
  <form action="/" method="get">
    <label htmlFor="header-search">
      <span className="visually-hidden"> </span>
    </label>
    <div class="input-group-append">
      <select name="searchField" id="searchField">
        <option value="All">All</option>
        <option value="Title">Article Title</option>
        <option value="Author">Author</option>
        <option value="Year">Year</option>
        <option value="SEPrac">SE Practice</option>
        <option value="SEAbb">SE Practice Abbreviation</option>
        <option value="Claim">Claim</option>
        <option value="EvStr">Evidence Strength</option>
      </select>
      <input
        //class="form-control"
        aria-label="Default"
        type="text"
        id="header-search"
        placeholder="Search..."
        name="search"
      />
      <button class="btn btn-danger" type="submit">
        Search
      </button>
    </div>
  </form>
);

export default SearchBar;
