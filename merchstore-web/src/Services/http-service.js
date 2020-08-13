import 'whatwg-fetch';

class HttpService{
    getProds = () => {
        var promise = new Promise((resolve, reject) => {
            fetch('http://localhost:3004/product').then(res => {
                resolve(res.json());       
            }); 
        });
        return promise;
    }
}

export default HttpService;