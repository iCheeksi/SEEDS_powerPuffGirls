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

const filterPosts = (articles, query) => {
    if (!query) {
        return articles;
    }
   
    return articles.filter((articles) => {
        const articleName = articles.title.toLowerCase();
        return articleName.includes(query);
    });
};

class SearchTable extends Component {
    constructor(){
        super()
        this.state = {
            articles: [],
            loading: true
        }
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
    const filteredPosts = filterPosts(posts, query);
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
               <br></br>
            </div>
            <div >
                <h3>{'Table of Articles'}</h3>
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
