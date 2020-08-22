import React from 'react';
import {Component} from 'react';
import '../Wishlist/wishlist.css';
import ProdCondensed from '../ProdCondensed/prodcondensed';
import DataService from '../Services/dataservice';
import NotificationService from '../Services/notificationservice';
import NOTIF_WISHLIST_CHANGED from '../Services/notificationservice';

let ns = new NotificationService();

//class to handle wishlist barebones stylizing & function
class Wishlist extends Component{
    
    constructor(props){
        super(props);
        
        this.state = {wishList:[]};
        //bindfuncs
        this.createList = this.createList.bind(this);
        this.onWishlistChanged = this.onWishlistChanged.bind(this);
    }
    
    //component being added to DOM
    componentDidMount(){
        ns.addObserver(NOTIF_WISHLIST_CHANGED, this, this.onWishlistChanged);
    }
    
    //component being removed from DOM
    componentWillUnmount(){
        ns.removeObserver(this, NOTIF_WISHLIST_CHANGED);
    }
    
    //detects and updates wishlist
    onWishlistChanged(newWishList){
        this.setState({wishList: newWishList});
    }
    
    //creates initial wishlist
    createList = () =>{
        const list = this.state.wishList.map((product) =>
            <ProdCondensed product={product} key={product._id} />   
        );
        return (list);
    }
    render(){
        return(
            //skeleton stylizing
            <div className="card">
                <div className="card-block">
                    <h4 className="card-title">Wishlist</h4>
                    <ul className="list-group">
                        {this.createList()}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Wishlist;