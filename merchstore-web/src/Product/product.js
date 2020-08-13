import React from 'react';
import {Component} from 'react';
import '../Product/product.css';
import DataService from '../Services/dataservice';
import NotificationService from '../Services/notificationservice';
import NOTIF_WISHLIST_CHANGED from '../Services/notificationservice';

let ns = new NotificationService();
let ds = new DataService();

class Product extends Component{
    constructor(props){
        super(props);
        
        
        this.state = {onWishList: ds.itemOnWlist()};
        //bindfunc
        this.onButtonClicked = this.onButtonClicked.bind(this);
        this.onWishlistChanged = this.onWishlistChanged.bind(this);
    }
    
    componentDidMount(){
        ns.addObserver(NOTIF_WISHLIST_CHANGED, this, this.onWishlistChanged);
    }
    
    componentWillUnmount(){
        ns.removeObserver(this, NOTIF_WISHLIST_CHANGED);
    }
    
    onWishlistChanged(newWishList){
        this.setState({onWishList: ds.itemOnWlist(this.props.product)});
    }
    
    onButtonClicked = () =>{
        if(this.state.onWishList){
            ds.removeFromWlist(this.props.product);
        }
        else{
            ds.addToWlist(this.props.product);
        }
    }
    
    render(){
        
        var btnClass;
        
        if(this.state.onWishList){ btnClass = "btn btn-danger"; }
        else{ btnClass= "btn btn-primary"; }
        
        return(
            <div className="card product">
                <img className = "card-img-top" src={this.props.product.imgUrl} alt="Product"></img>
                <div className="card-block">
                    <h4 className="card-title">{this.props.product.title}</h4>
                    <p className="card-text:">Price: ${this.props.product.price}</p>
                    <a href="#" onClick={() => this.onButtonClicked()} className={btnClass}>
                    {this.state.onWishList ? "Remove from wishlist" : "Add to cart"}</a>
                </div>
            </div>
        );
    }
}

export default Product;