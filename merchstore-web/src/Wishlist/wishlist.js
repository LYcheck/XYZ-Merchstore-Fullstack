import React from 'react';
import {Component} from 'react';
import '../Wishlist/wishlist.css';
import ProdCondensed from '../ProdCondensed/prodcondensed';
import DataService from '../Services/dataservice';
import NotificationService from '../Services/notificationservice';
import NOTIF_WISHLIST_CHANGED from '../Services/notificationservice';

let ns = new NotificationService();
class Wishlist extends Component{
    
    constructor(props){
        super(props);
        
        this.state = {wishList:[]};
        //bindfuncs
        this.createList = this.createList.bind(this);
        this.onWishlistChanged = this.onWishlistChanged.bind(this);
        
    }
    
    componentDidMount(){
        ns.addObserver(NOTIF_WISHLIST_CHANGED, this, this.onWishlistChanged);
    }
    
    componentWillUnmount(){
        ns.removeObserver(this, NOTIF_WISHLIST_CHANGED);
    }
    
    onWishlistChanged(newWishList){
        this.setState({wishList: newWishList});
    }
    
    createList = () =>{
        const list = this.state.wishList.map((product) =>
            <ProdCondensed product={product} key={product._id} />   
        );
        
        return (list);
    }
    render(){
        return(
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