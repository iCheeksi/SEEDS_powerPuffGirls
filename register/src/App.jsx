import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css"
import axios from 'axios'
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css" 


class App extends Component {
    constructor(){
        super()
        this.state = {
            name:'',
            userName:'',
            password:'',
            articles: [],
            loading: true
        }
        this.changename = this.changename.bind(this)
        this.changeUserName = this.changeUserName.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    async getArticles(){
        const res = await axios.get('http://localhost:3001/api/api')
        console.log(res.data)
        this.setState({loading:false, articles: res.data})
      }
    componentDidMount = () =>{
        this.getArticles();
    }
    
    
    //react function to change the value of name, username and password field
    changename(event){
        this.setState({
            name:event.target.value
        })
    }
    changeUserName(event){
        this.setState({
            userName:event.target.value
        })
    }
    changePassword(event){
        this.setState({
            password:event.target.value
        })
    }

    onSubmit(event){
        event.preventDefault()

        const registered = {
            name: this.state.name,
            userName: this.state.userName,
            password: this.state.password
        }
        axios.post('http://localhost:3001/server/register', registered)
        .then(response => console.log(response.data))
        
        this.setState({
            name:'',
            userName:'',
            password:''
        })

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

        return(
            <div>
                <div className='container'>
                    <div className='form-div'>
                    <h3>{'Register'}</h3>
                        <form onSubmit={this.onSubmit}>
                            <input type = 'text'
                            placeholder='Name'
                            onChange={this.changename}
                            value={this.state.name}
                            className='form-control form-group'
                            />
                            <input type = 'text'
                            placeholder='User Name'
                            onChange={this.changeUserName}
                            value={this.state.userName}
                            className='form-control form-group'
                            />
                            <input type = 'password'
                            placeholder='Password'
                            onChange={this.changePassword}
                            value={this.state.password}
                            className='form-control form-group'
                            />

                            <input type='submit' className='btn btn-danger btn-block' value='submit'>
                            </input>
                        </form>

                        <div >
                        <h3>{'Table of Articles'}</h3>
                        </div>

                        <ReactTable  
                            data={this.state.articles}  
                            columns={columns}  
                        />
                    </div>
                </div>
            </div>
         );
    }
}

export default App;