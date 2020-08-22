import React from 'react';
import {Component} from 'react';
import '../ProdCondensed/prodcondensed.css';
import DataService from '../Services/dataservice';

let ds = new DataService();
class ProdCondensed extends Component{
    constructor(props){
        super(props);
        
        //bindfuncs
        this.removeProduct = this.removeProduct.bind(this);
    }
    
    //remove prod from wishlist
    removeProduct = () =>{
        ds.removeFromWlist(this.props.product);
    }
    
    render(){
        return(
            //stylize condensed card & implement button to remove from wishlist
            <li className="list-group-item pc-condensed">
                <div className="row">
                    <a href="#" className="btn btn-outline-danger" onClick={() => this.removeProduct()}>X</a>
                    <p>{this.props.product.title} | <b>${this.props.product.price}</b></p>
                </div>
            </li>
        );
    }
}

export default ProdCondensed;