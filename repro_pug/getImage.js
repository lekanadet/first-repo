const express=require('express');
const app=express();
const PORT=3200;
const AWS = require('aws-sdk');
// Our default route

app.get('/test', function (req, res) {
    var client;
    client.getFile('realprobucket/agent3.jpg', function(err, imageStream) {
        imageStream.pipe(res);
    });
});





app.get('/',(req,res)=>{
AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      });
let s3 = new AWS.S3();
async function getImage(){
        const data =  s3.getObject(
          {
              Bucket: 'realprobucket',
              Key: 'house1.jpg'
            }
          
        ).promise();
        return data;
      }
getImage()
      .then((img)=>{
          let image="<img src='data:image/jpeg;base64," + encode(img.Body) + "'" + "/>";
          let startHTML="<html><body></body>";
          let endHTML="</body></html>";
          let html=startHTML + image + endHTML;
        res.send(html)
      }).catch((e)=>{
        res.send(e)
      })
function encode(data){
          let buf = Buffer.from(data);
          let base64 = buf.toString('base64');
          return base64
      }
})
app.listen(PORT,()=>{
    console.log(`Web Server running on port ${PORT}`);
});