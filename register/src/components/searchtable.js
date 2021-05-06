import React, { Component } from 'react';
import axios from 'axios'
import ReactTable from "react-table-6";  
import Search from './search';
import { Link } from 'react-router-dom'
import "react-table-6/react-table.css"
import "../table.css"
import "bootstrap/dist/css/bootstrap.css"
import logo from './SEEDSlogo.png';
let posts = []
let filteredPosts = []

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
        const articleName = articles.evidenceStrength;
        return articleName.includes(index);
    });
};

class SearchTable extends Component {
    constructor(){
        super()
        this.state = {
            articles: [],
            loading: true,
            strengthLevel:"Evidence Strength"
        }
        this.optionSelect = this.optionSelect.bind(this)
}
async getArticles(){
    const res = await axios.get('http://localhost:3001/api/api')
    console.log(res.data)
    posts = res.data
    this.setState({loading:false, articles: res.data})
  }
componentDidMount = () =>{
    this.getArticles();
}
optionSelect(event) {
    var index = event.target.options[event.target.selectedIndex].text
    this.setState({
        strengthLevel: index})
}
render(){
    const columns = [{  
        Header: 'Title',  
        accessor: 'title',
       }
       ,{  
        Header: 'Author(s)',  
        accessor: 'author' ,
        }
       
       ,{  
       Header: 'Year',  
       accessor: 'year' ,
       }
       ,{  
       Header: 'SE Practice',  
       accessor: 'sePracticeFull',
       },
       {  
        Header: 'Abbreviation',  
        accessor: 'sePracticeShort',
        },
        {  
          Header: 'Claim',  
          accessor: 'claim',
        },
        {  
          Header: 'Evidence Strength',  
          accessor: 'evidenceStrength',
        }
    ]

    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    filteredPosts = []
    filteredPosts = filterPosts(posts, query)
    filteredPosts = filterStrengthPosts(filteredPosts, this.state.strengthLevel);

    return(
        <div>
           <div>
               <div >
               <div style={{ float: 'right' }}>
                <Link to={'/register'}>
                <input type='submit' className='btn btn-danger btn-block' value='Register'></input>
                </Link>
               </div>  
               <img src={logo} alt={"logo"} width="250" height="230"  ></img> 
               </div>
               <br></br>
                <Search/>
                <select name='Evidence' id='Evidence' onChange= {this.optionSelect} class="customer-select">
                    <option value>Evidence Strength</option>
                    <option value>Strongly Support</option>
                    <option value>Strongly Agree</option>
                    <option value>Strongly Against</option>
                </select>
          
               <br></br>
            </div>
            <div >
                <h3>{'Table of Articles'}</h3>
                <p>{'Click column header to sort & drag column header to widen columns'}</p>
            </div>
                <ReactTable  
                    data={filteredPosts}  
                    columns={columns}  
                />
            </div>
     );
}
}
export default SearchTable;
