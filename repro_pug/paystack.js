require('dotenv').config();
const paystack = (request) => {

    const MySecretKey = 'Bearer ' + process.env.MY_SECRET_KEY3   
   // const MySecretKey = 'Bearer ' + 'sk_live_6a3bc13c22c5d932119c73fe08a7faad8a881fff'
    //sk_test_xxxx to be replaced by your own secret key

    const initializePayment = (form, mycallback) => {

        const option = {
            url : 'https://api.paystack.co/transaction/initialize',
            headers : {
                authorization: MySecretKey,
                'content-type': 'application/json',
                'cache-control': 'no-cache'
           },
           form
        }
         var callback = (error, response, body)=>{    
            return mycallback(error, body);
        }
        request.post(option,callback);
    }


    

    const verifyPayment = (ref, mycallback) => {
        
        const option = {
            url : 'https://api.paystack.co/transaction/verify/' + encodeURIComponent(ref),
            headers : {
                authorization: MySecretKey,
                'content-type': 'application/json',
                'cache-control': 'no-cache'
           }
        }
        const callback = (error, response, body)=>{
            return mycallback(error, body);
        }
        request(option,callback);
    }

    return {initializePayment, verifyPayment};
}

module.exports = paystack