export const NOTIF_WISHLIST_CHANGED = "notif_wishlist_changed";

let observers = {};
let instance = null;

//service to handle changes to wishlist & product dataset
class NotificationService{
    constructor(){
        if(!instance){
            instance = this;
        }
        
        return instance;
    }
    
    //pushes a notification that data has changed
    postNotification = (notifName, data) =>{
        let obs = observers[notifName];
        for(var x=0; x<obs.length; x++){
            var obj = obs[x];
            obj.callBack(data);
        }
    }
    
    //removes watcher
    removeObserver = (observer, notifName) =>{
        var obs = observers[notifName];
        
        if(obs){
            for (var x=0; x<obs.length; x++){
                if(observer === obs[x].observer){
                    obs.splice(x,1);
                    observers[notifName] = obs;
                    break;
                }
            }
        }
    }
    
    //adds watcher
    addObserver = (notifName, observer, callBack) =>{
        let obs = observers[notifName];
        
        if(!obs){
            observers[notifName] = [];
        }
        
        let obj = {observer: observer, callBack: callBack};
        observers[notifName].push(obj);
        
    }
}

export default NotificationService;