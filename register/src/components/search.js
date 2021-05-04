import "bootstrap/dist/css/bootstrap.css"
const SearchBar = () => (
    
    <form action="/" method="get">
        <label htmlFor="header-search">
            <span className="visually-hidden"> </span>
        </label>
        <div class="input-group-append">
        <input  
            //class="form-control" 
            aria-label="Default" 
            type="text"
            id="header-search"
            placeholder="Search article titles"
            name="s" 
        />
        <button class="btn btn-danger" type="submit">Search</button>
        </div>
    </form>
    
);

export default SearchBar;
