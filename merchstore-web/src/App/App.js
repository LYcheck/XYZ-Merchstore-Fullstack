import React from 'react';
import { Component } from 'react';
import './App.css';

//components
import Product from '../Product/product.js';
import Wishlist from '../Wishlist/wishlist.js';

//services
import HttpService from '../Services/http-service.js';
const http = new HttpService();

class App extends Component {

    constructor(props){
        super(props);
        
        this.state = {products:[]};
        
        //Bind functions
        this.loadData = this.loadData.bind(this);
        this.prodList = this.prodList.bind(this);
        
        this.loadData();
    }
    
    loadData = () => {
        var self = this;
        http.getProds().then(data => {
            self.setState({products: data})
        }, err => {
            
        });
    }
    
    prodList = () => {
        const list = this.state.products.map((product) => 
            <div className="col-sm-4" key={product._id}>
                <Product product={product}/>
            </div>
        );
        return (list);
    }
    
    render(){
  return (
    <div className="App">
          <div className="container-fluid App-main">
              <div className="row">
                    <div className="col-sm-8">
                        <div className="row">
                            {this.prodList()}
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <Wishlist />
                    </div>
              </div>
      </div>
    </div>
  );
}
}

export default App;
