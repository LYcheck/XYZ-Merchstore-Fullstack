import NotificationService from './notificationservice';
import NOTIF_WISHLIST_CHANGED from './notificationservice';

let ns = new NotificationService();

let instance = null;
var wishList = [];

class DataService{
    constructor(){
        if(!instance){
            instance = this;
        }
        return instance;
    }
    
    itemOnWlist = item =>{
        for(var x=0; x<wishList.length; x++){
            if(wishList[x]._id === item._id){
                return true;
            }
        }
        return false;
    }
    
    addToWlist = item =>{
        wishList.push(item);
        ns.postNotification(NOTIF_WISHLIST_CHANGED, wishList);
    }
    
    removeFromWlist = item =>{
        for(var x=0; x<wishList.length; x++){
            if(wishList[x]._id === item._id){
                wishList.splice(x,1);
                ns.postNotification(NOTIF_WISHLIST_CHANGED, wishList);
                break;
            }
        }
    }
}

export default DataService;