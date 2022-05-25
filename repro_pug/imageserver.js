require('dotenv').config();
const uploadPicture = (request) => {

    const MySecretKey = 'Bearer ' + process.env.MY_SECRET_KEY
    //sk_test_xxxx to be replaced by your own secret key

    const upload = (form, mycallback) => {

        const option = {
            url : 'https://api.imgbb.com/1/upload?expiration=&key=f8fc58df6c2b5f0227713d11fde237ff',
            headers : {
                
           },
           form
        }
         var callback = (error, response, body)=>{    
            return mycallback(error, body);
        }
        request(option,callback);          
    }

    return {upload};
}

module.exports = uploadPicture